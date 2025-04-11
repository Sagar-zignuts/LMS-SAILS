const path = require('path')

module.exports = {
  createAuthor: async function (req, res) {
    try {
      const { name, gender } = req.body;

      // Validate required fields
      if (!name) {
        return res
          .status(400)
          .json({ success: false, message: 'Name is required' });
      }

      // Handle file upload
      let profileImage = null;
      if (req.file('profileImage')) {
        req.file('profileImage').upload({
          dirname: require('path').resolve(sails.config.appPath, 'assets/uploads/'), // Save to assets/uploads/
          maxBytes: 5 * 1024 * 1024, // 5MB limit
          saveAs: function (__newFileStream, next) {
            const filename = Date.now() + path.extname(__newFileStream.filename); // Unique filename
            next(null, filename);
          },
        }, function (err, uploadedFiles) {
          if (err) {
            console.error('Upload error:', err);
            return res.status(400).json({ status: 400, message: 'Error uploading profile image: ' + err.message });
          }
          if (uploadedFiles.length === 0) {
            return res.status(400).json({ status: 400, message: 'No profile image uploaded' });
          }
          profileImage = `/uploads/${uploadedFiles[0].fd.split('/').pop()}`; // Store relative path

          // Create author after successful upload
          Author.create({
            id: 'placeholder',
            name,
            gender,
            profileImage,
          }).fetch().then((author) => {
            return res
              .status(200)
              .json({ status: 200, message: 'Created author', author });
          }).catch((error) => {
            console.error('Create Author error:', error);
            return res.status(500).json({
              status: 500,
              message: 'Error creating author',
              error: error.message,
            });
          });
        });
      } else {
        // Create author without profile image
        const author = await Author.create({
          id: 'placeholder',
          name,
          gender,
          profileImage,
        }).fetch();
        return res
          .status(200)
          .json({ status: 200, message: 'Created author', author });
      }
    } catch (error) {
      console.error('Create Author error:', error);
      return res
        .status(500)
        .json({
          status: 500,
          message: 'Error at server side',
          error: error.message,
        });
      }
    },

  findAuthor: async function (req, res) {
    try {
      const authors = await Author.find();
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
      const updatedAuthor = await Author.updateOne({ id: id }).set({ id }, { name, gender, profile, profileImage });
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

      const deletedAuthor = await Author.destroyOne({ id: id });
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
