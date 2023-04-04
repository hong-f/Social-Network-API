const { Schema, model } = require('mongoose');
const Reaction = require('./reaction.js');


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true, 
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp),
    },
    username: {
        type: String,
        required: true
    },
    reactions: [Reaction]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
}
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length;
})

const dateFormat = timestamp => {
    return new Date(timestamp).toLocaleString();
};

const Thoughts = model('thought', thoughtSchema);

module.exports = Thoughts;