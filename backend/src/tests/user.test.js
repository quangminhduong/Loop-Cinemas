const request = require("supertest");
const startServer = require("../../server.js");

describe("Users API Tests", () => {
  let app, server;

  // Start the server before the tests.
  beforeAll(async () => {
    ({ app, server } = await startServer());
  });

  // Check to see if the API can get a single user by id
  it("should get all users from the database", async () => {
    const res = await request(app).get("/users/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(1);
  });

  // Check to see if the API can login a user
  it("should login a user", async () => {
    const res = await request(app).post("/users/login").send({
      email: "chrismsanta@gmail.com",
      password:
        "42a9798b99d4afcec9995e47a1d246b98ebc96be7a732323eee39d924006ee1d",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
  });

  // Check to see that the api fails on new user creation with existing username
  it("should fail to create a new user with existing username", async () => {
    const res = await request(app).post("/users").send({
      username: "chrismsanta",
      email: "test@gmail.com",
      password:
        "42a9798b99d4afcec9995e47a1d246b98ebc96be7a732323eee39d924006ee1d",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
      `A user with the username: chrismsanta already exists`
    );
  });

  // Check to see that the api fails on new user creation with existing email
  it("should fail to create a new user with existing email", async () => {
    const res = await request(app).post("/users").send({
      username: "test",
      email: "chrismsanta@gmail.com",
      password:
        "42a9798b99d4afcec9995e47a1d246b98ebc96be7a732323eee39d924006ee1d",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
      `A user with the email: chrismsanta@gmail.com already exists`
    );
  });

  // Check to see that api fails on user update with existing username
  it("should fail to update a user with existing username", async () => {
    const res = await request(app).put("/users/100").send({
      username: "chrismsanta",
      email: "test@gmail.com",
      password:
        "42a9798b99d4afcec9995e47a1d246b98ebc96be7a732323eee39d924006ee1d",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
      `A user with this username already exists`
    );
  });

  // Check to see that api fails on user update with existing email
  it("should fail to update a user with existing username", async () => {
    const res = await request(app).put("/users/100").send({
      username: "test",
      email: "chrismsanta@gmail.com",
      password:
        "42a9798b99d4afcec9995e47a1d246b98ebc96be7a732323eee39d924006ee1d",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(`A user with this email already exists`);
  });

  // Close the server after the tests.
  afterAll((done) => {
    server.close(done);
  });
});
