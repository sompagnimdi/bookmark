require('dotenv').config()
const Bookmark = require('../../models/bookmark')
const User = require('../../models/user')

//delete bookmark
// create bookmark

// update bookmark

const destroyBookmark = async (req, res, next) => {
    try {
        const seletedBookmark = await Bookmark.findByIdAndDelete(req.params.id)
        res.locals.data.bookmark = deletedBookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }

}

const updateBookmark = async (req, res, next) => {
    try {
        const updatedBookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.locals.data.bookmark = updateBookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }

}

const createBookmark = async (req, res, next) => {
    try {
        const createBookmark = await Bookmark.create(req.body)
        const user = await User.findOne({ email: res.locals.data.email})
        user.bookmark.addToSet(createBookmark)
        await user.save()
        res.locals.data.bookmark = createBookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
}

const respondWithBookmark = (res, res) => {
    res.json(res.locals.data.bookmark)
}


module.exports = {
    destroyBookmark,
    updateBookmark,
    createBookmark,
    respondWithBookmark
}

