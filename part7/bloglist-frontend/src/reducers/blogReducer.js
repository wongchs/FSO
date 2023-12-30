import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    appendBlogs(state, action) {
      state.push(action.payload);
    },
    likeBlog(state, action) {
      const id = action.payload.id;
      const blogToChange = state.find((n) => n.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
    deleteBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, appendBlogs, likeBlog, deleteBlog } =
  blogSlice.actions;

export const initializedBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content, user) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    const newBlogWithUser = { ...newBlog, user };
    dispatch(appendBlogs(newBlogWithUser));
    return newBlogWithUser;
  };
};

export const addLikes = (blog, user) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog };
    const changedBlog = await blogService.update(blog.id, updatedBlog);
    const changedBlogWithUser = { ...changedBlog, user };
    console.log(updatedBlog);
    dispatch(likeBlog(changedBlogWithUser));
    return changedBlogWithUser;
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteObject(id);
    dispatch(deleteBlog(id));
  };
};

export default blogSlice.reducer;
