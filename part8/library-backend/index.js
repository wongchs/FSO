require("dotenv").config();

const jwt = require("jsonwebtoken");
const { ApolloServer, UserInputError } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const HARDCODED_PASSWORD = process.env.HARDCODED_PASSWORD;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
type Author {
  name: String!
  id: ID!
  born: Int
}

type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks: [Book!]!
  allAuthors: [Author!]!
  me: User
}

type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ): Book!
  editAuthor(name: String!, setBornTo: Int!): Author
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async () => {
      const books = await Book.find().populate("author");
      return books;
    },
    allAuthors: () => Author.find(),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authorized");
      }

      const author = await Author.findOne({ name: args.author });

      if (!author) {
        try {
          const newAuthor = new Author({ name: args.author });
          await newAuthor.save();
          args.author = newAuthor;
        } catch (error) {
          throw new GraphQLError(error.message);
        }
      } else {
        args.author = author;
      }

      try {
        const book = new Book({ ...args });
        await book.save();
        return book;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authorized");
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      try {
        author.born = args.setBornTo;
        await author.save();
        return author;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        await user.save();
        return user;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== HARDCODED_PASSWORD) {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Author: {
    id: (root) => root._id,
  },
  Book: {
    id: (root) => root._id,
  },
  User: {
    id: (root) => root._id,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
