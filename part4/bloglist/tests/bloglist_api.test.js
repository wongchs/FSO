const mongoose = require("mongoose");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("get all blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;
  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test("add valid blog", async () => {
  const newBlog = {
    title: "new title",
    author: "new author",
    url: "www.newblog.com",
    likes: 4,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((blog) => blog.title);
  expect(contents).toContain("new title");
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("if the likes property is missing, default to 0", async () => {
  const newBlog = {
    title: "new title",
    author: "new author",
    url: "www.newblog.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const likes = blogsAtEnd[blogsAtEnd.length - 1].likes;
  expect(likes).toBe(0);
});

test("blogs without title or url will not be added", async () => {
  const newBlog = {
    author: "new author",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});
