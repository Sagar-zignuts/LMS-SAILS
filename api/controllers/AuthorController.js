const author = require("../models/User/author");

module.exports = {
  createAuthor: async function (req, res) {
    try {
      const { name, gender } = req.body;
      const profileImage = req.file ? req.file.path : null;
      if (!name) {
        return res
          .status(400)
          .json({ success: false, message: "Name is required" });
      }
      const author = await author
        .create({ name, gender, profileImage })
        .fetch();
      return res
        .status(200)
        .json({ status: 200, message: "created author", author });
    } catch (error) {
      return res
        .status(500)
        .json({
          status: 500,
          message: "Error at server side",
          error: error.message,
        });
    }
  },

  findAuthor: async function (req, res) {
    try {
      const authors = await author.find();
      if (authors.length === 0) {
        return res
          .status(400)
          .json({ stauts: 400, message: "No authores found" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Fetched authors", authors });
    } catch (error) {
      return res
        .status(500)
        .json({
          status: 500,
          message: "Error at server side",
          error: error.message,
        });
    }
  },

  updateAuthor: async function (req, res) {
    try {
      const { id } = req.query;
      const { name, gender, profile } = req.body;
      const profileImage = req.file ? req.file.path : null;
      if (!id) {
        return res.status(400).json({ status: 400, message: "Id is required" });
      }
      const updatedAuthor = await updateOne({ id: id }).set({ id }, { name, gender, profile, profileImage });
      return res
        .status(200)
        .json({ status: 200, message: "Data updated", updatedAuthor });
    } catch (error) {
      return res
        .status(500)
        .json({
          status: 500,
          message: "Error at server side",
          error: error.message,
        });
    }
  },

  deleteAuthor: async function (req, res) {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ status: 400, message: "Id is required" });
      }

      const deletedAuthor = await author.destroyOne({ id: id });
      return res
        .status(400)
        .json({ status: 400, message: "Author is deleted", deletedAuthor });
    } catch (error) {
      return res
        .status(500)
        .json({
          status: 500,
          message: "Error at server side",
          error: error.message,
        });
    }
  },
};
