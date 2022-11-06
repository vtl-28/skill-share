const mongoose = require('mongoose');

const talkSchema = mongoose.Schema({
    title: {
        type: "String", required: true, trim: true, unique: true
    },
    hostedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    body: { type: "String", required: true, trim: true },
    comments: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Comments"
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model("Talk", talkSchema);

