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
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import {
  addLikes,
  createBlog,
  initializedBlogs,
  removeBlog,
} from "./reducers/blogReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(initializedBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      dispatch(
        setNotification({ message: `welcome ${user.name}`, type: "success" })
      );
    } catch (exception) {
      dispatch(
        setNotification({
          message: "wrong username or password",
          type: "error",
        })
      );
    }
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
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
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
    </div>
  );
};

export default App;
