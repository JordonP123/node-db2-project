const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  const getId = await Cars.getById(req.params.id)
  try {
    if (getId) {
      req.id = getId
      next()
    } else {
      next({ status: 404, message: `car with id ${req.params.id} is not found` })
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.vin) {
    res.status(400).json({ message: 'vin is missing' })
  }
  if (!req.body.make) {
    res.status(400).json({ message: 'make is missing' })
  }
  if (!req.body.model) {
    res.status(400).json({ message: 'model is missing' })
  }
  if (!req.body.mileage) {
    res.status(400).json({ message: 'mileage is missing' })
  }
  next()
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  if (vinValidator.validate(req.body.vin)) {
    next()
  } else {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const oldVin = await Cars.getByVin(req.body.vin)
    console.log(oldVin)
    if (!oldVin) {
      next()
    } else {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}
