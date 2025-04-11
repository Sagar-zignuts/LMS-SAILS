const bcrypt = require("bcrypt");
const {v4 : uuidV4} = require('uuid')

module.exports = {
  tableName: "users",
  migrate: "alter",
  // migrate : 'drop',

  attributes: {
    id: {
      type: "string",
      columnType: "uuid",
      unique: true,
      required : true
    },
    username: {
      type: "string",
      required: true,
      unique: true,
      maxLength: 20,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
    role: { 
        type: "string", 
        defaultsTo: "user" 
    }
  },

  primaryKey: "id",

  beforeCreate: async function (values, proceed) {

    values.id = uuidV4();
    values.password = await bcrypt.hash(values.password, 10);
    return proceed();
  },
};
