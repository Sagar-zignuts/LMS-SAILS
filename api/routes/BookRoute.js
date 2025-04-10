module.exports = {
  "POST /api/book/": {
    controller: "BookController",
    action: "createBook",
    policies: [
      "isAuthenticated.AuthMiddleware",
      "isAuthenticated.isAdmin",
      "FileUpload",
    ],
  },
  "GET /api/book/": {
    controller: "BookController",
    action: "findBook",
    policies: ["isAuthenticated.AuthMiddleware"],
  },
  "PUT /api/book/:id": {
    controller: "BookController",
    action: "updateBook",
    policies: [
      "isAuthenticated.AuthMiddleware",
      "isAuthenticated.isAdmin",
      "FileUpload",
    ],
  },
  "DELETE /api/book/:id": {
    controller: "BookController",
    action: "deleteBook",
    policies: ["isAuthenticated.AuthMiddleware", "isAuthenticated.isAdmin"],
  },
};
