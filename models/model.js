const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 25
    },
    price: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

const BillProductsSchema = new mongoose.Schema({
    srNo: {
        type: Number,
        required: true
    },
    pname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
})

const BillSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 40
    },
    mobile_no: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    products: [BillProductsSchema],
    total: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports.Product = mongoose.model('Product', ProductSchema)
module.exports.Bill = mongoose.model('Bill', BillSchema)