const keys = require('./keys');
const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);
const DataLoader = require('dataloader');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require('graphql');

const fetchListsOverview = () => {
    return fetch(
        `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${keys.NYTimes}`
    )
    .then(res => res.json())
    .then(data => data.results.lists.slice(0,5))
    .catch(error => console.log(error))
}
const listsOverviewLoader = new DataLoader(keys => Promise.all(keys.map(fetchListsOverview)));

const fetchList = list => {
    return fetch(
        `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${keys.NYTimes}&list=${list}`
    )
    .then(res => res.json())
    .then(data => data.results.length ? data.results : null)
    .catch(error => console.log(error))
}
const listLoader = new DataLoader(keys => Promise.all(keys.map(fetchList)));

const fetchAuthor = id => {
    return fetch(
        `https://www.goodreads.com/author/show/${id}?format=xml&key=${keys.goodReads}`
    )
    .then(res => res.text())
    .then(parseXML)
    .then(data => data.GoodreadsResponse ? data.GoodreadsResponse.author[0] : null)
    .catch(error => console.log(error))
}
const authorLoader = new DataLoader(keys => Promise.all(keys.map(fetchAuthor)));

const fetchBookById = id => {
    return fetch(
        `https://www.goodreads.com/book/show/${id}.xml?key=${keys.goodReads}`
    )
    .then(res => res.text())
    .then(parseXML)
    .then(data => data.GoodreadsResponse ? data.GoodreadsResponse.book[0] : null)
    .catch(error => console.log(error))
}
const bookLoader = new DataLoader(keys => Promise.all(keys.map(fetchBookById)));

const fetchBookByIsbn = isbn => {
    return fetch(
        `https://www.goodreads.com/book/isbn/${isbn}?key=${keys.goodReads}`
    )
    .then(res => res.text())
    .then(parseXML)
    .then(
        data => Promise.resolve(data.GoodreadsResponse ? data.GoodreadsResponse.book[0] : null),
        error => Promise.reject(error)
    )
    .catch(error => console.log(error))
}
const booksListLoader = new DataLoader(keys => Promise.all(keys.map(fetchBookByIsbn)));

const ListOverviewType = new GraphQLObjectType({
    name: 'BestsellersListOverview',
    fields: () => ({
        listName: {
            type: GraphQLString,
            resolve: data => data.list_name
        },
        listNameEncoded: {
            type: GraphQLString,
            resolve: data => data.list_name_encoded
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: data => {
                let isbns = data.books.map(book => book.primary_isbn13);
                return booksListLoader.loadMany(isbns);
            }
        }
    })
});

const ListsOverviewType = new GraphQLObjectType({
    name: 'BestsellersListsOverview',
    fields: () => ({
        lists: {
            type: new GraphQLList(ListOverviewType),
            resolve: data => data
        },
    })
});

const ListType = new GraphQLObjectType({
    name: 'BestsellersList',
    fields: () => ({
        listName: {
            type: GraphQLString,
            resolve: data => data[0].list_name
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: data => {
                let isbns = data.map(book => book.isbns[0].isbn13 && book.isbns[0].isbn13 !== "None" ? book.isbns[0].isbn13 : book.isbns[1].isbn13);
                return booksListLoader.loadMany(isbns);
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID,
            resolve: data => data.id[0]._ || data.id[0]
        },
        title: {
            type: GraphQLString,
            resolve: data => data.title[0]
        },
        isbn: {
            type: GraphQLString,
            resolve: data => typeof data.isbn[0] === 'string' ? data.isbn[0] : null
        },
        cover: {
            type: GraphQLString,
            resolve: data => {
                if(data.image_url[0].indexOf('nophoto') != -1)  return null;
                // Get a large cover instead of medium
                let img = data.image_url[0];
                let n = img.lastIndexOf('m/');
                return img.slice(0, n) + img.slice(n).replace('m/', 'l/');
            }
        },
        description: {
            type: GraphQLString,
            resolve: data => data.description[0]
        },
        authors: {
            type: new GraphQLList(new GraphQLObjectType({
                name: 'BookAuthor',
                fields: () => ({
                    id: {
                        type: GraphQLID,
                        resolve: data => data.id[0]._ || data.id[0]
                    },
                    name: {
                        type: GraphQLString,
                        resolve: data => data.name[0]
                    },
                    role: {
                        type: GraphQLString,
                        resolve: data => data.role[0]
                    }
                })
            })),
            resolve: data => data.authors[0].author
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID,
            resolve: data => data.id[0]._ || data.id[0]
        },
        name: {
            type: GraphQLString,
            resolve: data => data.name[0]
        },
        about: {
            type: GraphQLString,
            resolve: data => data.about[0]
        },
        photo: {
            type: GraphQLString,
            resolve: data => {
                return data.image_url[0].indexOf('nophoto') == -1 ? data.image_url[0] : null;
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: data => data.books ? data.books[0].book : null
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        bestsellersListsOverview: {
            type: ListsOverviewType,
            args: {
                limit: { type: GraphQLInt }
            },
            resolve: () => listsOverviewLoader.load(0)
        },
        bestsellersList: {
            type: ListType,
            args: {
                list: { type: GraphQLString }
            },
            resolve: (root, args) => listLoader.load(args.list)
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (root, args) => authorLoader.load(args.id)
        },
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (root, args) => bookLoader.load(args.id)
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery
});