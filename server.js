require('dotenv').config()
require('./config/database')

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const PORT = process.env.PORT || 3001

const app = express = express()

app.use(express.json())
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})