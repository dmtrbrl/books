const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const app = express();

// Allow cross-origin requests
app.use(cors());

const schema = require('./schema');

app.use('/api', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(4000);

console.log('Listening on port 4000');
