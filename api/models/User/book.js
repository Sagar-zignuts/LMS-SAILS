// CREATE TABLE IF NOT EXISTS books (
    // id SERIAL PRIMARY KEY,
    // title VARCHAR(100) NOT NULL,
    // description TEXT,
    // author_id INTEGER NOT NULL,
    // publication DATE,
    // cover_image VARCHAR(255),
    // FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE

module.exports = {

  models: false,
  migrate : 'alter',
  tableName : 'books',

  attributes : {
    id : {
        type : 'string',
        columnType : 'uuid',
        unique : true,
        required : true,
        defaultsTo : ()=>require('uuid').v4(),
    },
    title : {
        type : 'string',
        require : true,
        unique : true,
        maxLength: 100,
    },
    description : {
        type : {
            type : 'string',
            require : true,
            maxLength : 250
        }
    },
    publication : {
        type : 'ref',
        columnType : 'date',
        require : true
    },
    cover_image: {
        type: 'string',
        maxLength: 255,
        allowNull: true,
      },
    author_id : {
        model : 'author',
        require : true
    },
    created_at : {
        type : 'ref',
        columnType : 'timestamp',
        defaultsTo : ()=>new Date()
    }
  },
  
  primaryKey : 'id'
}