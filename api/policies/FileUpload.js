const path = require('path')

module.exports = function (req, res, next) {
  // Check if file upload is required based on the HTTP method
  const requiresFile = (req.method === 'POST' || req.method === 'PUT');
  if (requiresFile && !req.file('coverImage')) {
    return res.status(400).json({ status: 400, message: 'File upload is required' });
  }

  // If a file is present, perform basic validation (before upload)
  if (req.file('coverImage')) {
    const file = req.file('coverImage');
    if (file._files && file._files.length > 0) {
      const originalName = file._files[0].stream.filename || '';
      const filetypes = /jpeg|jpg|png|gif/;
      const extname = filetypes.test(path.extname(originalName).toLowerCase());

      if (!extname) {
        return res.status(400).json({ status: 400, message: 'Error: Only image files (jpeg, jpg, png, gif) are allowed!' });
      }
    }
  }

  // Proceed to the next policy or controller action
  return next();
};