const {v4 : uuidV4} = require('uuid')


module.exports = {
    migrate : 'alter',
    // migrate : 'drop',
    tableName: 'authors',
    
  
    attributes: {
      id: {
        type: "string",
        columnType: "uuid",
        unique: true,
        required : true
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
      profileImage: {
        type: "string",
        allowNull: true,
      }
    },
  
    primaryKey: "id",

  beforeCreate : async function(values , proceed){
    values.id = uuidV4()
    return proceed()
  },

  };
  
  
  