const User = require('../models/User');
const Talk = require('../models/Talk');

const createTalk = async(req, res, next) => {
    
    const { title, body, pic, city, location, date } = req.body;

    if(!title || !body || !pic, !city || !location || !date){
        res.status(400).send('Please enter all the fields');
        return;
    }
    const talkExist = await Talk.findOne({title: title})

    if(talkExist){
        res.status(400).send('Talk exists');
        return;
    }

    let newTalk = {
        hostedBy: req.user._id,
        title,
        body,
        pic,
        city,
        location,
        date
    };
    try {
        const talk = await (await Talk.create(newTalk)).populate('hostedBy', '_id name email pic');
        res.status(200).send(talk);
    } catch (error) {
        res.status(404).send(error);
    }
}

const updateTalk = (req, res) => {
        const talkId = req.params.id;
        console.log(talkId)

        //const { title, body, pic, city } = req.body;

        let talkParams = {
            title: req.body.title,
            body: req.body.body,
            pic: req.body.pic,
            city: req.body.city
        }
        console.log(talkParams)
            Talk.findByIdAndUpdate(talkId,{
                $set: talkParams,
            }).then(talk => {
                console.log(talk)
                res.status(200).send(talk)  
            }).catch(error => {
                console.log(error)
                res.status(404).send(error)
            })
}

const deleteTalk = async(req, res) => {
        const userId = req.params.id;

       try {
        const talk = await Talk.findByIdAndDelete({_id: userId});
        res.status(200).send(talk)
       } catch (error) {
            res.status(400).send(error);
       }
}

const getTalks = (req, res) => {
    Talk.find({}).then(talks => {
        res.status(200).send(talks);
    }).catch(error => {
        res.status(400).send(error);
    })
      
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
  


module.exports = { createTalk, updateTalk, deleteTalk, getTalks, searchTalk};