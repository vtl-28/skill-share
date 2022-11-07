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
        const talkId = req.params.id;

        const { title, body, pic } = req.body;

        const talkParams = {
            title,
            body,
            pic
        }

        try {
            const updatedTalk = await Talk.findByIdAndUpdate(talkId,{
                $set: talkParams
            }, {new: true})
            res.status(200).send(updatedTalk)    
        } catch (error) {
            res.status(404).send(error)
        }
})

const deleteTalk = asyncHandler( async(req, res) => {
        const userId = req.params.id;

       try {
        const talk = await Talk.findByIdAndDelete({_id: userId});
        res.status(200).send(talk)
       } catch (error) {
            res.status(400).send(error);
       }
})

const getTalks = asyncHandler( async(rew, res) => {
        try {
            const talks = await Talk.find().populate('hostedBy', '_id name email pic');
            res.status(200).send(talks);
        } catch (error) {
            res.status(400).send(error);
        }
})

const searchTalk = asyncHandler( async(req, res) => {
    const query = req.query.search;

    if(!query){
        res.status(400).send('Please enter field');
    }

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
})
module.exports = { createTalk, updateTalk, deleteTalk, getTalks, searchTalk};