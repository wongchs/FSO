import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotification,
  clearNotification,
} from "./reducers/notificationReducer";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import {
  addLikes,
  createBlog,
  initializedBlogs,
  removeBlog,
} from "./reducers/blogReducer";
import { userLogin, userLogout, login } from "./reducers/userReducer";
import { Route, Routes, Link, useMatch } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import userService from "./services/users";
import BlogDetail from "./components/BlogDetail";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializedBlogs());
  }, [dispatch]);

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(login(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      dispatch(userLogin(username, password));
      setUsername("");
      setPassword("");
      console.log("good");
    } catch (exception) {
      dispatch(
        setNotification({
          message: "wrong username or password",
          type: "error",
        })
      );
      console.log("bad");
    }
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(userLogout()).then(() => {
      dispatch(
        setNotification({ message: `logout successful`, type: "success" })
      );
    });
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject, user)).then(() => {
      dispatch(
        setNotification({
          message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
          type: "success",
        })
      );
    });
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  const updateBlog = (blogObject) => {
    console.log(blogObject);
    dispatch(addLikes(blogObject, user));
  };

  const deleteBlog = (id) => {
    const blog = blogs.find((blog) => blog.id === id);

    if (window.confirm(`Delete ${blog.title}?`)) {
      dispatch(removeBlog(id));
    }
  };

  const match = useMatch("/users/:id");
  const matchedUser = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  const blogMatch = useMatch("/blogs/:id");
  const matchedBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  if (user === null) {
    return (
      <div>
        <Notification
          notification={notification.message}
          type={notification.type}
        />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification
        notification={notification.message}
        type={notification.type}
      />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Routes>
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={matchedUser} />} />
        <Route
          path="/blogs/:id"
          element={<BlogDetail blog={matchedBlog} updateBlog={updateBlog} />}
        />
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
              </Togglable>
              {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                  />
                ))}
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
