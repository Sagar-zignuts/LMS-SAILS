const book = require('../models/User/book')

module.exports = {
    createBook : async function(req,res){
        try {
            const {title, description, author, publication} = req.body
            const coverImage = req.file ? req.file.path : null
            const book = await book.create({title , description , author , publication , coverImage}).fetch()

            return res.status(200).json({satus : 200 , message : "book is created" , book})
        } catch (error) {
            return res.status(500).json({status : 500 ,  message: 'Error creating book', error: error.message });
        }
    },

    findBook : async function(req,res){
        try {
            const book = await book.find()
            if (!book) {
                return res.status(400).json({status : 400 , message : "Book is not there"})
            }

            return res.status(200).json({status : 200 , message : "Book is there" , book})
        } catch (error) {
            return res.status(500).json({ status : 500 , message: 'Error find book', error: error.message });
        }
    },
    updateBook : async function(req,res){
        try {
            const {id} = req.query
            const { title, description, author, publication } = req.body;
            const coverImage = req.file ? req.file.path : null;
            if (!id) {
                return res.status(400).json({status : 400 , message : "Id is required"})
            }
            const updatedBook = await book.updateOne({id : id}).set({ title, description, author, publication, coverImage })
    
            return res.status(400).json({status : 400 , message : "Book is updated" , updatedBook})
        } catch (error) {
            return res.status(500).json({status : 500 ,  message: 'Error updating book', error: error.message });
        }
    },

    deleteBook : async function(req,res){
        try {
            const {id} = req.query
            if (!id) {
                return res.status(400).json({status : 400 , message : "Id is required"})
            } 
            const deletedBook = await book.destroyOne({id : id})
            return res.status(400).json({status : 400 , message : "Book is deleted" , deletedBook})
        } catch (error) {
            return res.status(500).json({ status : 500 , message: 'Error updating book', error: error.message });
        }
    }
}