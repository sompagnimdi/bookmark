const router = require('express').Router()
const checkToken = require('../../config/checkToken')
const userCtrl = require('../../controllers/api/users')
const ensureLoogedIn = require('../../config/ensureLoggedin')

// api/users Signup

router.post('/', userCtrl.signUp, userCtrl.respondWithToken)

// api/users/login Login
router.post('/login', userCtrl.login, userCtrl.respondWithToken)


// api/users/bookmarks Get Bookmark by User

router.get('/bookmarks', checkToken, ensureLoogedIn, userCtrl.getBookmarksByUser, userCtrl.respondWithBookmarks)


module.exports = router

