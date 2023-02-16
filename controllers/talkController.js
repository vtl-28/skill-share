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

const updateTalk = async(req, res) => {
        const talkId = req.params.id;
        console.log(talkId)

        const { title, body, pic, city, location, date } = req.body;

        const talk = await Talk.findOne({title: title});
        if(talk !== null){
          res.status(404).send('Talk with this title already exists')
          return;
        }

        let talkParams = {
            title, body, 
            pic, city, 
            location, date
        }

        Object.keys(talkParams).forEach(detail => {
            if(talkParams[detail] === ''){
              delete talkParams[detail]
            }
          })

          try {
            const updatedTalk = await Talk.findByIdAndUpdate(talkId,{
                $set: talkParams
            })
            res.status(200).send(updatedTalk)    
        } catch (error) {
            res.status(404).send(error)
        }
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
    Talk.find({}).sort({'createdAt': -1}).then(talks => {
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

  const getTalk = async(req, res) => {
    const talkId = req.params.id;

    try {
        let talk = await Talk.findById({_id: talkId})
        let hostedByConverted = talk.hostedBy.toString()
         let host = await User.findById({_id: hostedByConverted})
         talk.hostedBy = host;
       
        res.status(200).send(talk);
    } catch (error) {
        res.status(400).send(error);
    }
  }

  const like = async(req, res) => {
    //const talkId = req.params.id;
    const talkId = req.body.talkId;
    Talk.findByIdAndUpdate(talkId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
  }

  const unlike = async(req, res) => {
    //const talkId = req.params.id;
    const talkId = req.body.talkId;
    Talk.findByIdAndUpdate(talkId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
  }

  const comment = async(req, res) => {
    const talkId = req.params.id;
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Talk.findByIdAndUpdate(talkId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("hostedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })


  }
  


module.exports = { createTalk, updateTalk, deleteTalk, getTalks, searchTalk, getTalk, like, unlike, comment};