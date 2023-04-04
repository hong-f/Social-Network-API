const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
    // thoughts
    getThoughts: async function getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            !thoughts ? res.status(404).json('can not find thoughts') : res.status(200).json(thoughts)
        } catch (err) {
            res.status(500).json(err)
        }

    },

    //thought by ID
    getSingleThought: async function getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.id)
            !thought ? res.status(404).json('thought does not exist') : res.status(200).json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //create 
    createThought: async function createThought(req, res) {
        try {
            
            const newThought = await Thought.create(req.body)
            
            const user = await User.findById(req.body.userId)
            
            user.thoughts.push(newThought._id)
            await user.save();
            res.status(200).json(newThought);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    updateThought: async function updateThought(req, res) {
        try {
            const updateThought = await Thought.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { runValidators: true, new: true }
            )
            !updateThought ? res.status(404).json('Cannot find thought with this id') : res.json(updateThought)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    deleteThought: async function deleteThought(req, res) {
        try {
            const deleteThought = await Thought.findByIdAndDelete(req.params.id);
            !deleteThought ? res.status(404).json('thought not found') : res.status(200).json('thought has been successfully deleted')

        } catch (err) {
            res.status(500).json(err)
        }
    },

    addReaction: async function addReaction(req, res) {
        try {
            const newReaction = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $addToSet: { reactions: req.body } },
                { new: true }
            )
            !newReaction ? res.status(404).json('Cannot find thought') : res.status(200).json(newReaction)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    deleteReaction: async function deleteReaction(req, res) {
        try {
            const deleteReaction = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { runValidators: true, new: true }
            )
            !deleteReaction
                ? res.status(404).json('reaction not found')
                : res.status(200).json(deleteReaction)
        } catch (err) {
            res.status(500).json(err)
        }
    }

}