const {v4 : uuidV4} = require('uuid')

module.exports = {
  migrate: "alter",
  // migrate : 'drop',
  tableName: "books",

  attributes: {
    id: {
      type: "string",
      columnType: "uuid",
      unique: true,
      required : true
    },
    title: {
      type: "string",
      required: true,
      unique: true,
      maxLength: 100,
    },
    description: {
      type: "string",
      required: true,
      maxLength: 250,
    },
    publication: {
      type: "ref",
      columnType: "date",
      required: true,
    },
    coverImage: {
      type: "string",
      maxLength: 255,
      allowNull: true,
    },
    author_id: {
      model: "Author",
      required: true,
    }
  },

  beforeCreate : async function(values , proceed){
    values.id = uuidV4()
    return proceed()
  },

  primaryKey: "id",
};
