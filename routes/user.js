const mongoose = require("mongoose");
const express = require('express');
const { User, Note } = require("../db");
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware")
const { authenticateJwt } = require("../middleware");

const router = express.Router();
router.post('/addnote', authenticateJwt , async (req,res) => {
    const userid = req.user.id;

    const newnote = new Note({
        userid : req.user.id,
        title : req.body.title,
        link : req.body.link,
        description : req.body.description,
        color : req.body.selectedColor,
    });
    await newnote.save();
    res.json({
        message : 'Success',
        newnote
    })
});

router.get('/allnote', authenticateJwt, async (req, res) => {
    try {
        const sortOrder = req.query.sortOrder;
        let sortDirection = -1; // Default to descending order (most recent)

        if (sortOrder === 'oldest') {
            sortDirection = 1; // Change to ascending order (oldest)
        }

        const allnotes = await Note.find({ userid: req.user.id }).sort({ createdAt: sortDirection }).exec();

        res.status(200).json({ 
            message: 'All notes retrieved successfully',
            allnotes
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving notes.' });
    }
});

router.delete('/deletenote/:noteId', authenticateJwt, async (req,res) => {
    const noteId = req.params.noteId;
    const userId = req.user.id;

    const note = await Note.findOne({ _id: noteId, userid: userId });

    if(!note) {
        return res.status(404).json({
            message : 'Note not found'
        });
    }

    await Note.findByIdAndDelete(noteId);
    res.json({
        message: 'Note deleted successfully',
    });

});


router.put('/notes/:noteId', async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const updatedData = req.body; 

      const updatedNote = await Note.findByIdAndUpdate(noteId, updatedData, { new: true });
  
      if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json(updatedNote);
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/getnotedata/:noteId', async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const notedata = await Note.findOne({ _id: noteId });

        if (!notedata) {
            return res.json({
                message: "Note not found for this noteID",
            });
        }

        res.json({
            message: "success",
            notedata,
        });
    } catch (error) {
        console.error('An error occurred:', error);
        res.json({
            message: "An error occurred",
        });
    }
});

module.exports = router;