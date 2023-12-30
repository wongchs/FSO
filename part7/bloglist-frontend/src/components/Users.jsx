import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link> has{" "}
          {user.blogs.length} blogs
        </div>
      ))}
    </div>
  );
};

export default Users;
