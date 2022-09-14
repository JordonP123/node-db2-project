// DO YOUR MAGIC
const router = require('express').Router()
const Cars = require('./cars-model')
const {  checkCarId,
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid } = require('./cars-middleware')

router.get('/', async(req, res) => {
    try{
        const getAllCars = await Cars.getAll()
        res.json(getAllCars)
    } catch(err){
        res.status(500).json({ message: 'cant get cars' })
    }
})

router.get('/:id', checkCarId, (req,res) => {
   res.json(req.id)
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async(req, res, next) => {
    try{
        const addCar = await Cars.create(req.body)
        res.status(201).json(addCar)
    } catch(err){
        next(err)
    }
})

module.exports = router