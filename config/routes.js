module.exports.routes = {
  //Auth Routes

  "POST /api/auth/login": "AuthController.login",
  "POST /api/auth/register": "AuthController.register",

  //Author routes
  "POST /api/author/": {
    controller: "AuthorController",
    action: "createAuthor",
  },
  "GET /api/author/": {
    controller: "AuthorController",
    action: "findAuthor",
  },
  "PUT /api/author/": {
    controller: "AuthorController",
    action: "updateAuthor",
  },
  "DELETE /api/author/": {
    controller: "AuthorController",
    action: "deleteAuthor",
  },

  //Book routes
  "POST /api/book/": {
    controller: "BookController",
    action: "createBook",
  },
  "GET /api/book/": {
    controller: "BookController",
    action: "findBook",
  },
  "PUT /api/book/": {
    controller: "BookController",
    action: "updateBook",
  },
  "DELETE /api/book/": {
    controller: "BookController",
    action: "deleteBook",
  },
};
