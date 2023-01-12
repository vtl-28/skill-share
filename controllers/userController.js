const User = require('../models/User');
const generateToken = require('../config/generateToken');
const Talk = require('../models/Talk');
const { default: mongoose } = require('mongoose');

const registerUser = async(req, res) => {
    const { name, email, password, confirmpassword, pic, about, city, profession } = req.body;
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if(!name || !email || !password || !about || !profession || !city || !confirmpassword){
      res.status(400).send('Please enter all the fields');
      return;
    }

    const userExists = await User.findOne({ email });

    if(userExists){
      res.status(400).send('User already exists');
      return;
    }

    if(!emailRegex.test(email)){
        res.status(400).send('Invalid email');
        return
    }

    if(password !== confirmpassword){
      res.status(400).send('Passwords do not match');
      return
    }

    try {
      const user = await User.create({
        name,
        email,
        password,
        pic,
        about,
        profession,
        city
      });
    
      if(user){
        const token = generateToken(user._id);
        user.token = token
        res.status(201).send(user);
      }else{
        res.status(400).send('Could not register user');
      }
    } catch (error) {
      res.status(400).send(error);
    }

};

const authUser = async(req, res) => {
        const { email, password } = req.body

        if(!email || !password){
          res.status(400).send('Please enter all the fields');
          return;
        }

        const user = await User.findOne({ email });

        if(!user){
          res.status(400).send('User does not exist');
          return;
        }

        try {
          if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);
            user.token = token
            res.status(201).send(user);
          } else {
            res.status(401).send('Invalid Email or Password');
          }
        } catch (error) {
          res.status(401).send(error);
        } 
};

const getUser = async(req, res) => {
        const userId = req.params.id;

        const user = await User.findById({_id: userId});

        try {
          if(user){
            res.status(201).send({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic
            })
          }else{
              res.status(400).send('Could not retrieve user');
          }
        } catch (error) {
          res.status(400).send(error);
        }

       
}

const getTalks = async(req, res) => {
  debugger
  // const params = req.params.id;
  const { _id } = req.user._id
  //console.log(req.user)
      try {
        const talks = await Talk.find({hostedBy: mongoose.Types.ObjectId(_id)}).populate('hostedBy', '_id name email pic city body profession')
        res.status(200).send(talks);
      } catch (error) {
        res.status(400).send(error);
      }
}

const updateUser = async(req, res) => {
  const userId = req.params.id;

  const { name, email, pic } = req.body;

  const userParams = {
      name, 
      email, 
      pic
  }

  try {
      const updatedUser = await User.findByIdAndUpdate(userId,{
          $set: userParams
      }, {new: true})
      res.status(200).send(updatedUser)    
  } catch (error) {
      res.status(404).send(error)
  }
}

const searchTalk = async(req, res) => {
  const query = req.query.search;

  if(!query){
      res.status(400).send('Please enter field');
  }
  //console.log(query)

  try {
      const keyword = query
          ? {
              title: { $regex: req.query.search, $options: "i" }  
          }
          : {};

          const talk = await Talk.find(keyword).populate('hostedBy', '_id name email pic');
          res.status(200).send(talk);
  } catch (error) {
      res.status(400).send(error);
  }
}

module.exports = { registerUser, authUser, getUser, getTalks, updateUser, searchTalk}