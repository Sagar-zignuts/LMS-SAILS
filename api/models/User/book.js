module.exports = {
  models: false,
  migrate: "alter",
  tableName: "books",

  attributes: {
    id: {
      type: "string",
      columnType: "uuid",
      unique: true,
      required: true,
      defaultsTo: () => require("uuid").v4(),
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
    cover_image: {
      type: "string",
      maxLength: 255,
      allowNull: true,
    },
    author_id: {
      model: "author",
      required: true,
    },
    created_at: {
      type: "ref",
      columnType: "timestamp",
      defaultsTo: () => new Date(),
    },
  },

  primaryKey: "id",
};
