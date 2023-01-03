const router = require('express').Router()
const bookmarkCtrl = require('../../controllers/api/bookmarks')
const checkToken = require('../../config/checkToken')
const ensureLoogedIn = require('../../config/ensureLoggedin')


/* /api/bookmark/:id
Delete
destroy bookmark */
router.delete('/:id', checkToken, ensureLoogedIn, bookmarkCtrl.updateBookmark, bookmarkCtrl.respondWithBookmark)


/* /api/bookmarks/:id
Put update bookmark*/
router.put('/:id', checkToken, ensureLoogedIn, bookmarkCtrl.updateBookmark, bookmarkCtrl.respondWithBookmark)


/* /api/bookmark 
Post creat bookmark */
router.post('/', checkToken, ensureLoogedIn, bookmarkCtrl.createBookmark, bookmarkCtrl.respondWithBookmark)

