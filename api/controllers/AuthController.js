const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {sendWelcomeMessage} = require('../../config/sendMail');

module.exports = {
  login: async function (req, res) {
    try {

      const { email, password } = req.body;   
      if (!email || !password) {
        return res
          .status(400)
          .json({ status: 400, message: "field is required" });
      }
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ status : 400 , message: "User not found" });

      const validPassword =await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(400).json({status : 400 ,  message: "Invalid password" });

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role || 'user'},
        process.env.JWT_SECRET_KEY,
        {expiresIn : '1h'}
      );

      return res.status(200).json({status : 200 , message : 'Login' , data : {user,token}})

    } catch (error) {
        return res.status(500).json({status : 500 ,  message: 'Error logging in', error: error.message });
    }
  },
  register : async function(req,res){
    try {
      const {username ,email, password } = req.body

      if (!username || !email || !password) {
        return res.status(400).json({status : 400 ,  message: "All fields are required" });
      }
      const user = await User.create({id: 'placeholder', username , email , password}).fetch()
      await sendWelcomeMessage(email , username)
      return res.status(200).json({status : 200 ,  message: 'User registered successfully' , user});

    } catch (error) {
      return res.status(500).json({status : 500 ,  message: 'Error registering user', error: error.message });
    }
  }
};  