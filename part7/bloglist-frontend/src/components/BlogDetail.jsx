const BlogDetail = ({ blog, updateBlog }) => {
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
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogDetail;
