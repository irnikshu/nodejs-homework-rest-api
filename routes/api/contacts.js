const express = require('express')


const ctrl = require("../../Controllers/contact-controllers")

const {isValidid, authenticate}= require("../../middlewares")

const { validateBody } = require("../../Utils");

const { schemas } = require("../../models/contacts");


const router = express.Router()



router.get('/', authenticate, ctrl.listAllContacts);

router.get('/:id', authenticate, isValidid,  ctrl.getById)

router.post('/', authenticate,  validateBody(schemas.addSchema),ctrl.addCont)

router.delete('/:id', authenticate, isValidid, ctrl.deleteContactById)

router.put('/:id', authenticate, isValidid, validateBody(schemas.addSchema), ctrl.updateContactById)

router.patch("/:id/favorite", authenticate, isValidid, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavoriteById)

module.exports = router;
