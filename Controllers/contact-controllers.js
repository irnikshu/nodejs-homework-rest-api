

const {ctrlWrapper} = require("../Utils")

const { HttpError } = require("../Helpers")

const { Contact } = require("../models/contacts")



const listAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, { skip, limit}).populate("owner", "name email");
  res.json(result); 
 
}

const getById = async (req, res) => {

    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      
      throw HttpError(404, "Not found")
    }
    res.json(result);
  }
 
 
  

const addCont = async (req, res) => {
   const { _id: owner } = req.user;
    const result = await Contact.create(...req.body, owner)
    res.status(201).json(result);
 
  
}

const updateContactById = async (req, res) => {
 

    const { id } = req.params;
    const { faavorite } = req.body;
        if (!faavorite) {
        throw HttpError(400, "missing field favorite");
    }
  const result = await Contact.findByIdAndUpdate({ id, owner: _id,}, req.body, {new: true})
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
 
}


const updateFavoriteById = async (req, res) => {
 

    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
 
}

const deleteContactById = async (req, res) => {

    const { id } = req.params;
  const result = await Contact.findByIdAndDelete({ id, owner: _id, })
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.status(200).json({
      message:"Delete success"
    })
 
}

module.exports = {
    listAllContacts:ctrlWrapper(listAllContacts) ,
    getById: ctrlWrapper(getById),
    addCont:ctrlWrapper(addCont),
    updateContactById: ctrlWrapper(updateContactById),
    updateFavoriteById: ctrlWrapper(updateFavoriteById),
    deleteContactById: ctrlWrapper(deleteContactById),
}