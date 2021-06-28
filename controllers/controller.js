const { Product, Bill } = require('../models/model')

const HomeController = (req, res) => {
    Product.find().sort()
        .then((data) => {
            res.status(200).render('../views/index.ejs', { url: '/', data })
        })
        .catch((err) => {
            console.log(err)
        })
}

const ShowController = (req, res) => {
    Product.find().sort({ createdAt: -1 })
        .then((data) => {
            res.status(200).render('../views/showProducts.ejs', { url: '/showProducts', data })
        })
        .catch((err) => {
            console.log(err)
        })
}

const addProduct = (req, res) => {
    const product = new Product({
        pname: req.body.pname,
        price: Number(req.body.price)
    })
    product.save()
        .then(() => {
            res.redirect('/showProducts')
        })
        .catch((err) => {
            console.log(err)
        })
}

const aboutController = (req, res) => {
    res.status(200).render('../views/about.ejs', { url: '/about' })
}

const createCustomerBill = (req, res) => {
    const bill = new Bill(req.body)
    bill.save()
        .then(() => {
        })
        .catch((err) => {
            console.log(err)
        })
}

const fetchBill = (req, res) => {
    Bill.find({ customer_name: req.params.customer_name }).sort({ createdAt: -1 })
        .then((data) => {
            res.status(200).render('../views/bill.ejs', { url: '/createCustomerbill', data: data[0] })
        })
        .catch((err) => {
            console.log(err)
        })
}

const deleteProd = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/showProducts')
        })
        .catch(err => {
            console.log(err)
        })
}

const searchBill = (req, res) => {
    res.render('../views/searchBill.ejs', { url: '/searchBill' })
}

const fetchByName = (req, res) => {
    Bill.find({ customer_name: req.params.customer_name }).sort({ createdAt: 1 })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
        })

}

const fetchById = (req, res) => {
    Bill.findById(req.params.id)
        .then((result) => {
            res.json(result)
        })
        .catch((err) => { console.log(err) })
}

const getBill = (req, res) => {
    Bill.findById(req.params.id)
        .then((data) => {
            res.render('../views/bill.ejs', { url: data._id, data })
        })
        .catch((err) => { console.log(err) })
}

module.exports = {
    HomeController,
    ShowController,
    aboutController,
    addProduct,
    createCustomerBill,
    fetchBill,
    deleteProd,
    searchBill,
    fetchByName,
    fetchById,
    getBill
}