describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "name",
      username: "username",
      password: "password",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);

    const anotherUser = {
      name: "another name",
      username: "anotheruser",
      password: "anotherpassword",
    };
    cy.request("POST", "http://localhost:3001/api/users/", anotherUser);

    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("login");
    cy.get("#username").should("exist");
    cy.get("#password").should("exist");
    cy.get("#login-button").should("exist");
  });

  describe("login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("username");
      cy.get("#password").type("password");
      cy.get("#login-button").click();

      cy.contains("name logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("wrong");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.contains("wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "username", password: "password" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("test blog");
      cy.get("#author").type("test author");
      cy.get("#url").type("http://testblog.com");
      cy.get("#submit").click();
      cy.contains("test blog");
    });

    it("A blog can be liked", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("test blog");
      cy.get("#author").type("test author");
      cy.get("#url").type("http://testblog.com");
      cy.get("#submit").click();

      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("1 likes");
    });

    it("A blog can be deleted by the user who created it", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("test blog");
      cy.get("#author").type("test author");
      cy.get("#url").type("http://testblog.com");
      cy.get("#submit").click();

      cy.contains("view").click();
      cy.contains("delete").click();
      cy.get("html").should("not.contain", "test blog - test author");
    });

    it("Only the creator can see the delete button of a blog", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("test blog");
      cy.get("#author").type("test author");
      cy.get("#url").type("http://testblog.com");
      cy.get("#submit").click();

      cy.contains("view").click();
      cy.contains("delete").should("exist");

      cy.contains("logout").click();
      cy.login({ username: "anotheruser", password: "anotherpassword" });

      cy.contains("view").click();
      cy.contains("delete").should("not.exist");
    });

    it('Blogs are ordered according to likes', function() {
      cy.createBlog({ title: 'first', author: '1', url: 'http://one.com', likes: 0 });
      cy.createBlog({ title: 'second', author: '2', url: 'http://two.com', likes: 0 });
      cy.createBlog({ title: 'third', author: '3', url: 'http://three.com', likes: 0 });

      cy.contains('first').parent().as('firstBlog');
      cy.get('@firstBlog').contains('view').click();
      cy.get('@firstBlog').contains('like').click();

      cy.contains('second').parent().as('secondBlog');
      cy.get('@secondBlog').contains('view').click();
      cy.get('@secondBlog').contains('like').click();
      cy.get('@secondBlog').contains('like').click();

      cy.contains('third').parent().as('thirdBlog');
      cy.get('@thirdBlog').contains('view').click();
      cy.get('@thirdBlog').contains('like').click();
      cy.get('@thirdBlog').contains('like').click();
      cy.get('@thirdBlog').contains('like').click();

      cy.get('.blog').then(blogs => {
        let likes = [...blogs].map(blog => Number(blog.querySelector('.likes').textContent));
        let sorted = [...likes].sort((a, b) => b - a);
        expect(likes).to.deep.equal(sorted);
      });
    });
  });
});

