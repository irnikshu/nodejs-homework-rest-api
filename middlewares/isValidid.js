const { isValidObjectId } = require("mongoose")

const {HttpError}=require("../Helpers")

const isValidid = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        next(HttpError(404, `${id} invalid format`))
    }
    next()
}

module.exports = isValidid;