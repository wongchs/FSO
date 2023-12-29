import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "hello",
    author: "bob",
    url: "www.blogspott.com",
    likes: 1234,
  };

  const { container } = render(<Blog blog={blog} />);
  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("hello");
});

describe("<Blog />", () => {
  let component;
  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();

  beforeEach(() => {
    const blog = {
      title: "Test Blog",
      author: "Test Author",
      url: "http://testblog.com",
      likes: 5,
      user: {
        username: "testuser",
      },
    };

    component = render(
      <Blog blog={blog} updateBlog={mockUpdate} deleteBlog={mockDelete} />
    ).container;
  });

  test("renders the blog's title and author, but does not render its URL or number of likes by default", () => {
    expect(component).toHaveTextContent("Test Blog");
    expect(component).toHaveTextContent("Test Author");
    expect(component).not.toHaveTextContent("http://testblog.com");
    expect(component).not.toHaveTextContent("5 likes");
  });

  test("URL and number of likes are shown when button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    expect(component).toHaveTextContent("http://testblog.com");
    expect(component).toHaveTextContent("5 likes");
  });

  test("calls the event handler twice if the like button is clicked twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockUpdate).toHaveBeenCalledTimes(2);
  });
});
