module.exports = {
  "POST /api/author/": {
    controller: "AuthorController",
    action: "createAuthor",
    policies: [
      "isAuthenticated.AuthMiddleware",
      "isAuthenticated.isAdmin",
      "FileUpload",
    ],
  },
  "GET /api/author/": {
    controller: "AuthorController",
    action: "findAuthor",
    policies: ["isAuthenticated.AuthMiddleware"],
  },
  "PUT /api/author/:id": {
    controller: "AuthorController",
    action: "updateAuthor",
    policies: [
      "isAuthenticated.AuthMiddleware",
      "isAuthenticated.isAdmin",
      "FileUpload",
    ],
  },
  "DELETE /api/author/:id": {
    controller: "AuthorController",
    action: "deleteAuthor",
    policies: ["isAuthenticated.AuthMiddleware", "isAuthenticated.isAdmin"],
  },
};
