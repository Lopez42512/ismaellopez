const {v4: uuidv4} = require("uuid")
const httpError = require("../models/http-error")
const {validationResult} = require('express-validator')

const DUMMY_USERS = [
    {
        id: 'u1',
        name: "Max",
        email: 'test@test.com',
        password: 'testers'
    }
]

const getUsers = (req,res,next) => {
    res.json(DUMMY_USERS)
}

const signup = (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log(errors);
        throw new httpError("Invalid imputs passed, please check your data.", 422)
    }
    const {name, email, password} = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);

    if(hasUser) {
        throw new httpError("User already exist, please login", 422)
    }

    const createdUser = {
        id: uuidv4(),
        name,
        email,
        password
    }

    DUMMY_USERS.push(createdUser);

    res.status(201).json({user: DUMMY_USERS})
}

const login = (req,res,next) => {
    const {email, password} = req.body;
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if(!identifiedUser || identifiedUser.password !== password) {
        throw new httpError("User not found", 401);
    }
    res.json(identifiedUser)
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

