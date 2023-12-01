import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const title = screen.getByPlaceholderText("input title");
  const author = screen.getByPlaceholderText("input author");
  const url = screen.getByPlaceholderText("input url");
  const sendButton = screen.getByText("create");

  await user.type(title, "title name");
  await user.type(author, "author name");
  await user.type(url, "url.com");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("title name");
  expect(createBlog.mock.calls[0][0].author).toBe("author name");
  expect(createBlog.mock.calls[0][0].url).toBe("url.com");
});
