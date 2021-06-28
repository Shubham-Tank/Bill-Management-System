const express = require('express')
const controllers = require('../controllers/controller')
const router = express.Router()


router.get('/', controllers.HomeController)
router.get('/showProducts', controllers.ShowController)
router.post('/addProduct', controllers.addProduct)
router.post('/createCustomerBill', controllers.createCustomerBill)
router.get('/customerBill/:customer_name', controllers.fetchBill)
router.get('/about', controllers.aboutController)
router.get('/deleteProd/:id', controllers.deleteProd)
router.get('/searchBill', controllers.searchBill)
router.get('/fetchByName/:customer_name', controllers.fetchByName)
router.get('/fetchById/:id', controllers.fetchById)
router.get('/getBill/:id', controllers.getBill)

router.use((req, res) => {
    res.status(404).render('../views/404.ejs')
})

module.exports = router