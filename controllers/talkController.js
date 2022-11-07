const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const Talk = require('../models/Talk');

const createTalk = asyncHandler( async(req, res, next) => {
    const { title, body, pic } = req.body;

    if(!title || !body || !pic){
        res.status(400).send('Please enter all the fields');
        return;
    }
    const talkExist = await Talk.findOne({title: title})

    if(talkExist){
        res.status(400).send('Talk exists');
        return;
    }

    let newTalk = {
        title,
        body,
        pic,
        hostedBy: req.user._id
    };
    try {
        const talk = await (await Talk.create(newTalk)).populate('hostedBy', '_id name email pic');
        res.json(talk);
    } catch (error) {
        res.status(404).send(error);
    }
})

const updateTalk = asyncHandler( async(req, res, next) => {

})

module.exports = { createTalk, updateTalk};