// app.js
const sails = require("sails");
const fs = require("fs");
const path = require("path");
require('dotenv').config();

const { authRoute, authorRoute, bookRoute } = require("./api/routes/index");

const route = {
  ...authRoute,
  ...authorRoute,
  ...bookRoute,
};

// Debug: Log all routes and their policies
console.log('Loaded routes and policies:');
Object.entries(route).forEach(([path, config]) => {
  const policies = config.policies || 'No policies';
  console.log(`${path}: ${JSON.stringify(policies)}`);
});

const uploadsDir = path.resolve(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
 
  fs.mkdirSync(uploadsDir);
}


sails.lift({
  routes: route,
  hooks: { grunt: false },
  port: process.env.PORT || 3000,
  loadHooks: ['moduleloader'], // Load only necessary hooks
  globals: { routes: false },
  log: { level: 'debug' }
}, (err) => {
  if (err) {
    console.error("Error lifting Sails:", err.message);
    return;
  }
  console.log('Sails has lifted successfully on port', process.env.PORT);
});


sails.on('hook:policies:loaded', () => {
  console.log('All policies loaded by Sails:', Object.keys(sails.hooks.policies.middleware));
});