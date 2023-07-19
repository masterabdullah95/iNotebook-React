const express = require('express');
const authenticateUser = require('../middlewares/authenticateUser');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Note = require('../models/Note');
const router = express.Router();
const mongoose = require('mongoose');

// Route 1: Create a note 
router.post('/createNote', [
    authenticateUser,
    body('title', 'Title cannot be empty').notEmpty(),
    body('body', 'Body cannot be empty').notEmpty()
], async (req, res)=>{

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }

    const id = req.user.id;
    
    let _user = await User.findById(id);
    if(!_user){
        return res.json({ errors: 'Access forbidden.' });
    }

    const {title, body} = req.body;

    try {
        let _note = {
            title, body, user: id
        }

        _note = await Note.create(_note);
       
        return res.json(_note);

    } catch (error) {
        console.log(error);
        return res.json({ errors: error });
    }
})

// Route 2: Delete a note 
router.get('/deleteNote/:id', [
    authenticateUser
], async (req, res)=>{
    
    try {
        const id = req.params.id;
        await Note.findByIdAndDelete(id);
        return res.json({msg: 'Note has been deleted.'});

    } catch (error) {
        console.log(error);
        return res.json({ errors: error });
    }
})

// Route 3: Update note 
router.put('/updatenote/:id', [
    authenticateUser
], async (req, res)=>{

    const {title, body} = req.body;
    const noteId = req.params.id;
    
    if (!mongoose.isValidObjectId(noteId)) {
        return res.json({error: 'Please provide valid object id.'});
    }
    
    try {
        await Note.findByIdAndUpdate(noteId, {title, body});
        let note = await Note.findById(noteId);
        return res.json(note);

    } catch (error) {
        console.log(error);
        return res.json({ errors: error });
    }
})

// Route 4: Fetch note 
router.get('/fetchnote/:id', [
    authenticateUser
], async (req, res)=>{

    const {title, body} = req.body;
    const noteId = req.params.id;
    
    if (!mongoose.isValidObjectId(noteId)) {
        return res.json({error: 'Please provide valid object id.'});
    }
    
    try {
        let _note = await Note.findById(noteId);
        return res.json(_note);

    } catch (error) {
        console.log(error);
        return res.json({ errors: error });
    }
})

// Route 5: Fetch all notes 
router.get('/fetchnotes', [
    authenticateUser
], async (req, res)=>{

    const userId = req.user.id;
    
    try {
        let _notes = await Note.find({user:userId});
        return res.json(_notes);

    } catch (error) {
        console.log(error);
        return res.json({ errors: error });
    }
})

module.exports = router;