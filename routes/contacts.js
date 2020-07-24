const express = require('express')
const router = express.Router()
const { Create_Contact,getSingle_Contact, Get_Contacts, delete_Contact, Update_Contact } = require('../controllers/contacts')


router.post('/createContact', Create_Contact)
router.get('/getContact', Get_Contacts)
router.get('/:id', getSingle_Contact)
router.delete('/:id', delete_Contact)
router.put('/:id', Update_Contact)













module.exports = router


