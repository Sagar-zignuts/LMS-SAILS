module.exports.bodyParser = {
    json: true, // Enable JSON parsing
    form: true, // Enable parsing of form-data (non-file fields)
    multipart: {
      // Enable file uploads
      maxBytes: 100 * 1024 * 1024 // Optional: Set max file size (e.g., 100MB)
    }
  };