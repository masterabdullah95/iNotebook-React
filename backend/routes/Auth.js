const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const authenticateUser = require('../middlewares/authenticateUser');
const JWT_TOKEN = process.env.JWT_TOKEN;

// Route 1: Create user 
router.post('/createUser', [
    body('name', 'Name cannot be empty').notEmpty(),
    body('email', 'Email cannot be empty').notEmpty(),
    body('email', 'Email must be valid').isEmail(),
    body('password', 'Password cannot be empty').notEmpty(),
    body('password', 'Password must be atleast 5 charcters long').notEmpty().isLength({ min: 5 })
], async (req, res)=>{

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }

    const {name, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
        let _user = {
            name, email, password: hash
        }

        _user = await User.create(_user);

        let token_data = {
            id: _user._id,
            name: _user.name
        }
    
        var token = jwt.sign(token_data, JWT_TOKEN);
        return res.json(token);

    } catch (error) {
        console.log(error);
        return res.json({ errors: error });
    }
})

// Route 2: Login 
router.post('/login', [
    body('email', 'Email cannot be empty').notEmpty(),
    body('email', 'Email must be valid').isEmail(),
    body('password', 'Password cannot be empty').notEmpty(),
    body('password', 'Password must be atleast 5 charcters long').notEmpty().isLength({ min: 5 })
], async (req, res)=>{

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }

    const {email, password} = req.body;

    let _user = await User.findOne({email});
    if(!_user){
        return res.json({ errors: 'Please provide valid credentials.' });
    }
    
    let passwordCompare = await bcrypt.compare(password, _user.password);
    if(passwordCompare){

        let token_data = {
            id: _user._id,
            name: _user.name
        }
    
        var token = jwt.sign(token_data, JWT_TOKEN);
        return res.json(token);
        
    }else{
        return res.json({ errors: 'Please provide valid credentials.' });
    }
    
})

// Route 3: Fetch User 
router.get('/fetchuser', authenticateUser, async (req, res)=>{

    const id = req.user.id;

    let _user = await User.findById(id);
    if(!_user){
        return res.json({ errors: 'Access forbidden.' });
    }

    return res.json(_user);
})

module.exports = router;