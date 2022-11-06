const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    message: {
        type: "String", required: true, trim: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("Comments", commentsSchema);

