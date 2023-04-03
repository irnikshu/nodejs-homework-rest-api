const express = require('express')
const Joi = require("joi");



const contacts = require("../../models/contacts")

const {HttpError} = require("../../Helpers")

const router = express.Router()

const addSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email() .required(), 
  phone: Joi.string() .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/).required()
})

router.get('/', async (req, res, next) => {
  try {
     const result = await contacts.listContacts();
  res.json(result);
  }
  catch (error) {
    
    next(error)
  }
 
})

router.get('/:id', async (req, res, next) => {
  try { 
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      
      throw HttpError(404, `Contacts with ${id} not found`)
    }
    res.json(result);
  }
  catch (error) {
    next(error)
   
  }
 
  
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await contacts.addContact(req.body)
    res.status(201).json(result);
   }
  catch (error){
    next(error);
  }
  
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id)
    if (!result) {
      throw HttpError(404, `Contacts with ${id} not found`)
    }
    res.status(200).json({
      message:"Delete success"
    })
   }
  catch (error) {
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
   const { error } = addSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body)
    if (!result) {
      throw HttpError(400, error.messge);
    }
    res.status(200).json(result);
   }
  catch (error){
    next(error);
  }
})

module.exports = router;
