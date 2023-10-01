const mongoose = require('mongoose')

const WalletSchema = mongoose.Schema({
    name:String,
    quantity:String,
    price:String,
    UserId:String
})
module.exports = mongoose.model('walletdata', WalletSchema)