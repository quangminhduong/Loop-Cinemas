const { buildSchema } = require("graphql");
const db = require("../database");

const users = {};

users.schema = buildSchema(`
  type User {
    id: Int
    username: String
    email: String
    password: String
    type: String
    enabled: Boolean
    createdAt: String
    updatedAt: String
  }
  type Query {
    all_users : [User],
    user(id: Int) : User,
    login(email: String, password: String) : Boolean,
    username(id: Int): String
  }
  type Mutation {
    enable_disable_user(id: Int, enabled: Boolean) : User
  }
`);

users.root = {
  // Queries
  all_users: async () => {
    return await db.user.findAll({ where: { type: "user" } });
  },
  user: async (args) => {
    return await db.user.findByPk(args.id);
  },
  login: async (args) => {
    const user = await db.user.findOne({
      where: { email: args.email, password: args.password, type: "admin" },
    });
    if (user === null) return false;
    return true;
  },
  username: async (args) => {
    const user = await db.user.findByPk(args.id);
    return user ? user.username : null;
  },
  // Mutations
  enable_disable_user: async (args) => {
    const user = await db.user.findByPk(args.id);
    user.enabled = args.enabled;
    await user.save();
    return user;
  },
};

module.exports = users;
