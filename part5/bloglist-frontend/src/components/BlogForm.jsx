import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addBlog}>
        <p>
          title: <input value={title} onChange={handleTitleChange} />
        </p>
        <p>
          author: <input value={author} onChange={handleAuthorChange} />
        </p>
        <p>
          url: <input value={url} onChange={handleUrlChange} />
        </p>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
