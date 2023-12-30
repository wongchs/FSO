const User = ({ user }) => {
  if (!user) {
    return <div>loading</div>;
  }

  console.log(user);

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Blogs</h3>
      {user.blogs.map((blog) => (
        <p key={blog.id}>{blog.title}</p>
      ))}
    </div>
  );
};

export default User;
