module.exports = {


  datastores: {
    default: {
      adapter: "sails-postgresql",
        url: `postgresql://postgres:password@localhost:5432/LMS_SAILS`,
    },
  },

  port : process.env.PORT || 3000,
  custom: {
    jwtSecret: process.env.JWT_SECRET || 'fnaostNOAsiohOIHRONO31M32Sn3mxuyokm235m',
    emailUser: process.env.EMAIL_USER || 'sagarbh@zignuts.com',
    emailPass: process.env.EMAIL_PASS || 'ojffaaxwjysgzijc',
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379'
  }
}