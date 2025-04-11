const path = require('path')

module.exports = {
  createBook: async function (req, res) {
    try {
      const { title, description, publication, author_id } = req.body;

      // Validate required fields
      if (!title) {
        return res
          .status(400)
          .json({ status: 400, message: "Title is required" });
      }
      if (!author_id) {
        return res
          .status(400)
          .json({ status: 400, message: "Author ID is required" });
      }

      // Validate author
      const existingAuthor = await Author.findOne({ id: author_id });
      if (!existingAuthor) {
        return res
          .status(400)
          .json({ status: 400, message: "Author not found" });
      }

      // Handle file upload
      let coverImage = null;
      if (req.file("coverImage")) {
        req.file("coverImage").upload(
          {
            dirname: require("path").resolve(
              sails.config.appPath,
              "assets/uploads/"
            ), // Save to assets/uploads/
            maxBytes: 5 * 1024 * 1024, // 5MB limit
            saveAs: function (__newFileStream, next) {
              const filename =
                Date.now() + path.extname(__newFileStream.filename); // Unique filename
              next(null, filename);
            },
          },
          function (err, uploadedFiles) {
            if (err) {
              console.error("Upload error:", err);
              return res
                .status(400)
                .json({
                  status: 400,
                  message: "Error uploading file: " + err.message,
                });
            }
            if (uploadedFiles.length === 0) {
              return res
                .status(400)
                .json({ status: 400, message: "No file uploaded" });
            }
            coverImage = `/uploads/${uploadedFiles[0].fd.split("/").pop()}`; // Store relative path

            // Create book after successful upload
            Book.create({
              id: "placeholder",
              title,
              description,
              publication,
              coverImage,
              author_id,
            })
              .fetch()
              .then((book) => {
                return res
                  .status(200)
                  .json({ status: 200, message: "Book created", book });
              })
              .catch((error) => {
                console.error("Create Book error:", error);
                return res
                  .status(500)
                  .json({
                    status: 500,
                    message: "Error creating book",
                    error: error.message,
                  });
              });
          }
        );
      } else {
        // Create book without file
        const book = await Book.create({
          id: "placeholder",
          title,
          description,
          publication,
          coverImage,
          author_id,
        }).fetch();
        return res
          .status(200)
          .json({ status: 200, message: "Book created", book });
      }
    } catch (error) {
      console.error("Create Book error:", error);
      return res.status(500).json({
        status: 500,
        message: "Error creating book",
        error: error.message,
      });
    }
  },

  findBook: async function (req, res) {
    try {
      const book = await Book.find();
      if (book.length === 0) {
        return res
          .status(400)
          .json({ status: 400, message: "Book is not there" });
      }

      return res
        .status(200)
        .json({ status: 200, message: "Book is there", book });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error find book",
        error: error.message,
      });
    }
  },

  //Update the books
  updateBook: async function (req, res) {
    try {
      const { id } = req.query;
      const { title, description, publication } = req.body;
      const coverImage = req.file ? req.file.path : null;
      if (!id) {
        return res.status(200).json({ status: 200, message: "Id is required" });
      }
      const updatedBook = await Book.updateOne({ id: id }).set({
        title,
        description,
        publication,
        coverImage,
      });

      return res
        .status(400)
        .json({ status: 400, message: "Book is updated", updatedBook });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error updating book",
        error: error.message,
      });
    }
  },

  deleteBook: async function (req, res) {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ status: 400, message: "Id is required" });
      }
      const deletedBook = await Book.destroyOne({ id: id });
      return res
        .status(200)
        .json({ status: 200, message: "Book is deleted", deletedBook });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error updating book",
        error: error.message,
      });
    }
  },
};
