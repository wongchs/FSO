import { useEffect, useState } from "react";
import userService from "../services/users";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name} has {user.blogs.length} blogs</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
