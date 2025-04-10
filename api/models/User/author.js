module.exports = {
    models: false, // Turn off global models (like Todo, User)
    migrate : 'alter',
    tableName: 'authors',
    
  
    attributes: {
      id: {
        type: "string",
        required: true,
        columnType: "uuid",
        unique: true,
        defaultsTo: () => require("uuid").v4(),
        autoCreatedAt: false,
        autoUpdatedAt: false,
      },
      name: {
        type: "string",
        required: true,
        maxLength: 100,
      },
      gender: {
        type: "string",
        allowNull: true,
        maxLength: 20,
      },
      profile: {
        type: "string",
        allowNull: true,
      },
      createdAt: {
        type: "ref",
        columnType: "timestamp",
        defaultsTo: () => new Date(),
      },
    },
  
    primaryKey: "id",
  };
  
  
  