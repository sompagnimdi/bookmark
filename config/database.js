const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)

const db = mongoose.connect

db.on('connect', () => {
    console.log(`Connected to ${db.name}) at ${db.host}. I will be a Master in MERN .... in training`)
})

