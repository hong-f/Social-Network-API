const { Schema } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp),
    },
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

const dateFormat = timestamp => {
    return new Date(timestamp).toLocaleString();
};

module.exports = reactionSchema;