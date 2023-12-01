import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

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
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility} className="togglableContent">{visible ? "hide" : "view"}</button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes <button onClick={handleLike}>like</button>
          </p>
          <p> {username}</p>
          <button onClick={() => deleteBlog(blog.id)}>delete</button>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
