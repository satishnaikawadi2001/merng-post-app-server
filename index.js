const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGO_URI } = require('./config.js');
const Post = require('./models/Post');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context   : ({ req }) => ({ req })
});

mongoose
	.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('MongoDB connected');
		return server.listen({ port: PORT });
	})
	.then((res) => {
		console.log(`server running at ${res.url}`);
	})
	.catch((err) => {
		console.error(err);
	});
