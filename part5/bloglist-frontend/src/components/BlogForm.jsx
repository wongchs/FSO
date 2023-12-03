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
          title: <input id="title" value={title} onChange={handleTitleChange} placeholder="input title" />
        </p>
        <p>
          author: <input id="author" value={author} onChange={handleAuthorChange} placeholder="input author" />
        </p>
        <p>
          url: <input id="url" value={url} onChange={handleUrlChange} placeholder="input url" />
        </p>
        <button id="submit" type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
