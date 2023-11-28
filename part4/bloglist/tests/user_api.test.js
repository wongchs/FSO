const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});
});

test("invalid users are not created", async () => {
  const newUser = {
    username: "ab",
    name: "Test User",
    password: "12",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/users");
  expect(response.body).toHaveLength(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
