const keys = require('../keys');

const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = require('graphql');

const BestsellerType = new GraphQLObjectType({
    name: 'Bestsellers',
    description: 'Possible list values: combined-print-and-e-book-fiction, hardcover-fiction, trade-fiction-paperback, audio-fiction, combined-print-and-e-book-nonfiction, hardcover-nonfiction, paperback-nonfiction, advice-how-to-and-miscellaneous, childrens-middle-grade-hardcover... more on https://www.nytimes.com/books/best-sellers/',
    fields: () => ({
        listName: {
            type: GraphQLString,
            resolve: data => data[0].list_name
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: data => {
                let isbns = data.map(book => book.isbns[0].isbn13 && book.isbns[0].isbn13 !== "None" ? book.isbns[0].isbn13 : book.isbns[1].isbn13);
                
                return Promise.all(isbns.map(isbn => {
                    return fetch(
                            `https://www.goodreads.com/book/isbn/${isbn}?key=${keys.goodReads}`
                        )
                        .then(res => res.text())
                        .then(parseXML)
                        .then(
                            data => Promise.resolve(data.GoodreadsResponse.book[0]),
                            error => Promise.reject(error)
                        )
                        .catch(error => console.log(error))
                }))
                .then(data => data)
                .catch(error => console.log(error));
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLInt,
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
                        type: GraphQLInt,
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
            type: GraphQLInt,
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

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            bestsellers: {
                type: BestsellerType,
                args: {
                    list: { type: GraphQLString }
                },
                resolve: (root, args) => fetch(
                    `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${keys.NYTimes}&list=${args.list}`
                )
                .then(res => res.json())
                .then(data => data.results.length ? data.results.slice(0,10) : null)
                .catch(error => console.log(error))
            },
            author: {
                type: AuthorType,
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: (root, args) => fetch(
                    `https://www.goodreads.com/author/show/${args.id}?format=xml&key=${keys.goodReads}`
                )
                .then(res => res.text())
                .then(parseXML)
                .then(data => data.GoodreadsResponse.author[0])
                .catch(error => console.log(error))
            },
            book: {
                type: BookType,
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: (root, args) => fetch(
                    `https://www.goodreads.com/book/show/${args.id}.xml?key=${keys.goodReads}`
                )
                .then(res => res.text())
                .then(parseXML)
                .then(data => data.GoodreadsResponse.book[0])
                .catch(error => console.log(error))
            }
        })
    })
});