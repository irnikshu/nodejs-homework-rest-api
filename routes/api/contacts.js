const express = require('express')


const ctrl=require("../../Controllers/contact-controllers")



const { validateBody } = require("../../Utils");

const { schemas } = require("../../models/contacts");


const router = express.Router()



router.get('/', ctrl.listAllContacts);

router.get('/:id',  ctrl.getById)

router.post('/', validateBody(schemas.addSchema),ctrl.addCont)

router.delete('/:id', ctrl.deleteContactById)

router.put('/:id', validateBody(schemas.addSchema), ctrl.updateContactById)

router.patch("/:id/favorite", validateBody(schemas.updateFavoriteSchema), ctrl.updateFavoriteById)

module.exports = router;
