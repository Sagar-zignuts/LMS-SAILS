// const bcrypt = require('bcrypt');
// const {v4 : uuidV4} = require('uuid')

// module.exports.bootstrap = async function(done) {
//   try {
//     const adminEmail = process.env.ADMIN_EMAIL || 'admin123@example.com';
//     const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
//     const adminUsername = process.env.ADMIN_USERNAME || 'admin';
//     const adminRole = 'admin';

//     const existingAdmin = await sails.models.user.findOne({ email: adminEmail });
//     if (!existingAdmin) {
//       await User.create({
//         id : uuidV4(),
//         username: adminUsername,
//         email: adminEmail,
//         password: adminPassword,
//         role: adminRole
//       }).fetch();

//       sails.log.info('Admin user created successfully:', adminEmail);
//     } else {
//       sails.log.info('Admin user already exists:', adminEmail);
//     }

//     return done();
//   } catch (error) {
//     sails.log.error('Error during bootstrap:', error.message);
//     return done(error);
//   }
// };