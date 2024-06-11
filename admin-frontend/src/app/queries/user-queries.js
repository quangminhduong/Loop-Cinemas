import { request, gql } from "graphql-request";

const GRAPH_QL_URL = "http://localhost:4000/users";

// Get all users
const getAllUsers = async () => {
  const query = gql`
    {
      all_users {
        id
        username
        email
        type
        enabled
        createdAt
        updatedAt
      }
    }
  `;
  const data = await request(GRAPH_QL_URL, query);
  return data.all_users;
};

// Get a single user by ID
const getUser = async (id) => {
  const query = gql`
    query ($id: Int) {
      user(id: $id) {
        id
        username
        email
        type
        disabled
        createdAt
        updatedAt
      }
    }
  `;
  const variables = { id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.user;
};

// Attempt to login the admin
const login = async (email, password) => {
  const query = gql`
    query ($email: String, $password: String) {
      login(email: $email, password: $password)
    }
  `;
  const variables = { email, password };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.login;
};

// Enable or disable a single user by ID
const enableDisableUser = async (id, enabled) => {
  const query = gql`
    mutation ($id: Int, $enabled: Boolean) {
      enable_disable_user(id: $id, enabled: $enabled) {
        id
        username
      }
    }
  `;
  const variables = { id, enabled };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.enable_disable_user;
};

// Get username by user ID
const getUsername = async (id) => {
  const query = gql`
    query ($id: Int) {
      username(id: $id)
    }
  `;
  const variables = { id };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.username;
};

export { getAllUsers, getUser, login, enableDisableUser, getUsername };
