require('dotenv').config
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const crypto = require('crypto')


const signUp = async (req, res) => {
    try {
        const user = User.create(req.body)
        const token = createJWT(user)
        res.locals.data.user = user
        res.local.data.token = token
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email})
       if(!user) throw new Error('user not found, email was invalid')
       const password = crypto.createHmac('sha256', process.env.SECRET).update(req.body.password).digest('hex').split('').reverse().join('')
       const match = await bcrypt.compare(password, user.password)
       if(!match) throw new Error('password did not match')
       res.locals.data.user = user
       res.loals.data.token = createJWT(user)
       next()
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

const getBookmarksByUser = async (req, res, next) => {
    try {
        const user = await User.findOne({email: res.locals.data.email}).populate('bookmarks').sort('createAt').exect()
        const bookmarks = user.bookmarks
        res.locals.data.bookmarks = bookmarks
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
}


const respondWithToken = (req, res) => {
    res.json(res.locals.data.token)
}

const respondWithUsers = (req, res) => {
    res.json(res.locals.data.user)
}

const respondWithBookmarks = (req, res) => {
    res.json(res.locals.data.bookmarks)
}

module.exports = {
    signUp,
    login,
    getBookmarksByUser,
    respondWithToken,
    respondWithUsers,
    respondWithBookmarks
}


// helper function

function createJWT(user){
    return JsonWebTokenError.sign({ user}, process.env.SECRET, { expiresIn: '48h'})
}

