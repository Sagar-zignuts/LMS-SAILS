module.exports = {
  tableName: "users",
  migrate: "alter",
  models: false,

  attributes: {
    id: {
      type: "string",
      columnType: "uuid",
      unique: true,
      required: true,
      defaultsTo: () => require("uuid").v4(),
    },
    username: {
      type: "string",
      require: true,
      unique: true,
      maxLength: 20,
    },
    email: {
      type: "string",
      require: true,
      unique: true,
    },
    password: {
      type: "string",
      require: true,
    },
    role: { 
        type: "string", 
        defaultsTo: "user" 
    },
    created_at: {
      type: "ref",
      columnType: "timestamp",
      defaultsTo: () => new Date(),
    },
  },

  primaryKey: "id",

  beforeCreate: async function (values, proceed) {
    const bcrypt = require("bcrypt");
    values.password = await bcrypt.hash(values.proceed, 10);
    return proceed();
  },
};
