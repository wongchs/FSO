import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const username = blog.user?.username;

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlog(updatedBlog);
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>
          {blog.likes} likes <button onClick={handleLike}>like</button>
        </p>
        <p> {username}</p>
        <button onClick={() => deleteBlog(blog.id)}>delete</button>
      </div>
    </div>
  );
};

export default Blog;
