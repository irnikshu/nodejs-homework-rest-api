
const { Schema, model } = require("mongoose")

const Joi = require("joi");

const { handleMongooseError }=require("../Utils")

const contactSchema = new Schema({
  name: {
    type: String,
    require: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    
  },
  phone: {
    type: String,
    
  } ,
  favorite: {
    type: Boolean,
    default: false,
  },
   owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
}, { versionKey: false, timestamps: true })

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email() .required(), 
  phone: Joi.string().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/).required(),
  favorite: Joi.boolean()
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Contact = model("contact", contactSchema)

module.exports = {
  Contact,
   schemas,
};

