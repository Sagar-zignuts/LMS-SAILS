module.exports.policies = {

    AuthController : {
        'login' : true,
        'register' : true,
    },
    //anyone can use this route
    
    BookController : {
        'createBook' : ['IsAuthenticated', 'IsAdmin' , 'FileUpload'],
        'findBook' : ['IsAuthenticated'],
        'updateBook' : ['IsAuthenticated', 'IsAdmin' , 'FileUpload'],
        'deleteBook' : ['IsAuthenticated', 'IsAdmin'],
    },
    //Only given users only asscess

    AuthorController : {
        'createAuthor' : ['IsAuthenticated', 'IsAdmin' , 'FileUpload'],
        'findAuthor' : ['IsAuthenticated'],
        'updateAuthor' : ['IsAuthenticated', 'IsAdmin' , 'FileUpload'],
        'deleteAuthor' : ['IsAuthenticated', 'IsAdmin'],

    }
};
