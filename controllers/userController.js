const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');
const Talk = require('../models/Talk');

const registerUser = asyncHandler( async(req, res, next) => {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const { name, email, password, pic } = req.body;

    if(!name || !email || !password){
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

    try {
      const user = await User.create({
        name,
        email,
        password,
        pic,
      });
    
      if(user){
        res.status(201).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id),
        });
      }else{
        res.status(400).send('Could not register user');
      }
    } catch (error) {
      res.status(400).send(error);
    }

});

const authUser = asyncHandler( async(req, res, next) => {
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
            res.status(201).send({
              _id: user._id,
              name: user.name,
              email: user.email,
              pic: user.pic,
              token: generateToken(user._id),
            });
          } else {
            res.status(401).send('Invalid Email or Password');
          }
        } catch (error) {
          res.status(401).send(error);
        }
})

const getUser = asyncHandler( async(req, res, next) => {
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

       
})

const getTalks = asyncHandler( async(req, res) => {
     
      try {
        const talks = await Talk.find({hostedBy: req.user._id})
        res.status(200).send(talks);
      } catch (error) {
        res.status(400).send(error);
      }
})

module.exports = { registerUser, authUser, getUser, getTalks}