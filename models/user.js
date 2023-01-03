require('dotenv').config()
const {schema, model, Schema} = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const SALT_ROUNDS = 6

const userSchema = new Schema ({
    name: {type: String, require: true},
    email: {type: String, unique: true, lowercase: true, require: true },
    password: { type: String, trim: true, minLength: 5, require: true },
    bookmark: [{ type: Schema.Types.ObjectId, ref: 'Bookmark'}]
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret){
            delete ret.password
            return ret
        }
    }
})

userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next()
    const password = crypto.createHmac('sha256', process.env.SECRET).update(this.password).split('').reverse().join('')
    this.password = await bcrypt.hash(password, SALT_ROUNDS)
})

module.exports = model('User', userSchema)


