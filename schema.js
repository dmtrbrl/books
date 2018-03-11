const keys = require('./keys');

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
    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: data => data.book_details[0].title
        },
        isbn: {
            type: GraphQLString,
            resolve: data => {
                let val;
                data.isbns.some(isbn => {
                    if(isbn.isbn10) {
                        val = isbn.isbn10;
                        return;
                    }
                });
                return val;
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLInt,
            resolve: data => data.id[0]._
        },
        title: {
            type: GraphQLString,
            resolve: data => data.title[0]
        },
        isbn: {
            type: GraphQLString,
            resolve: data => data.isbn[0]
        },
        cover: {
            type: GraphQLString,
            resolve: data => {
                return data.image_url[0].indexOf('nophoto') == -1 ? data.image_url[0] : null;
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLInt,
            resolve: data => data.id[0]
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
            resolve: data => data.books[0].book
        }
    })
});

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            bestsellers: {
                type: new GraphQLList(BestsellerType),
                args: {
                    list: { type: GraphQLString }
                },
                resolve: (root, args) => fetch(
                    `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${keys.NYTimes}&list=${args.list}`
                )
                .then(res => res.json())
                .then(data => data.results)
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
            }
        })
    })
});