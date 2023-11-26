const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  });
};

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1;
    return count;
  }, {});
  let mostBlogsAuthor = null;
  let mostBlogs = 0;

  for (const [author, blogs] of Object.entries(authors)) {
    if (blogs > mostBlogs) {
      mostBlogs = blogs;
      mostBlogsAuthor = author;
    }
  }

  return {
    author: mostBlogsAuthor,
    blogs: mostBlogs,
  };
};

const mostLikes = (blogs) => {
  const authors = blogs.reduce((count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + blog.likes;
    return count;
  }, {});
  let mostLikesAuthor = null;
  let mostLikes = 0;

  for (const [author, likes] of Object.entries(authors)) {
    if (likes > mostLikes) {
      mostLikes = likes;
      mostLikesAuthor = author;
    }
  }

  return {
    author: mostLikesAuthor,
    likes: mostLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
