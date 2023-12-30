import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../reducers/blogReducer";

const BlogDetail = ({ blog, updateBlog }) => {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();

  if (!blog) {
    return <div>loading</div>;
  }

  console.log(blog);

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlog(updatedBlog);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(newComment),
    };
    dispatch(createComment(updatedBlog.id, newComment));
    setNewComment("");
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.url}</p>
      <p className="likes">
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.author}</p>
      <br />
      <h2>comments</h2>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments &&
          blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
    </div>
  );
};

export default BlogDetail;
