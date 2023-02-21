const mongoose = require('mongoose');

const talkSchema = mongoose.Schema({
    title: {
        type: "String", required: true, trim: true, unique: true
    },
    hostedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    body: { type: "String", required: true, trim: true },
    pic: {
        type: "String",
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
      city: {
        type: "String", required: true, trim: true
      },
      location: {
        type: "String", required: true
      },
      date: {
        type: Date, required: true
      },
    likes:[{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
    comments:[{
        text: {type: "String", required: true, trim: true},
        postedBy:{type: mongoose.Schema.Types.ObjectId, ref:"User"}
    }],
    attendants: [{
      type: mongoose.Schema.Types.ObjectId, ref:"User"
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model("Talk", talkSchema);

