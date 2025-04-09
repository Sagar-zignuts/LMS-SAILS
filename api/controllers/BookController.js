const book = require('../models/User/book')
const book = require('../models/User/book')
const upload =  require('../policies/FileUpload')

module.exports = {
    create : async function(req,res){
        try {
            const {title, description, author, publication} = req.body
            const profile = req.file ? req.file.path : null
            const book = await book.create({title , description , author , publication , profile}).fetch()

            return res.status(200).json({satus : 200 , message : "book is created" , book})
        } catch (error) {
            return res.status(500).json({ message: 'Error creating book', error: error.message });
        }
    },

    find : async function(req,res){
        try {
            const book = await book.find()
            if (!book) {
                return res.status(400).json({status : 400 , message : "Book is not there"})
            }

            return res.status(200).json({status : 200 , message : "Book is there" , book})
        } catch (error) {
            return res.status(500).json({ message: 'Error find book', error: error.message });
        }
    },
    update : async function(req,res){
        try {
            const {id} = req.query
            if (!id) {
                return res.status(400).json({status : 400 , message : "Id is required"})
            }
            const updatedBook = await book.updateOne({id : id}).set(req.body)
    
            return res.status(400).json({status : 400 , message : "Book is updated" , updatedBook})
        } catch (error) {
            return res.status(500).json({ message: 'Error updating book', error: error.message });
        }
    },

    delete : async function(req,res){
        try {
            const {id} = req.query
            if (!id) {
                return res.status(400).json({status : 400 , message : "Id is required"})
            } 
            const deletedBook = await book.destroyOne({id : id})
            return res.status(400).json({status : 400 , message : "Book is deleted" , deletedBook})
        } catch (error) {
            return res.status(500).json({ message: 'Error updating book', error: error.message });
        }
    }
}