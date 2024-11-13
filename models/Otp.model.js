const mongoose = require('mongoose');
const {Schema} = mongoose;

const otpSchema = new Schema({
    email: String,
    otp: String,
    expireAt: { type: Date,  expires: 60 }
})

const Otp = mongoose.model('Otp', otpSchema, 'otps');
module.exports = Otp;