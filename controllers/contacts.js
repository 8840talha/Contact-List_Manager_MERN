const Contact = require('../models/contact')

exports.Create_Contact = (req, res) => {
    console.log(req.body)
    const NewContact = new Contact(req.body)
    NewContact.save().then(newContact => {

        return res.status(201).json({
            success: true,
            message: 'Contact registered Successfully',
            createdUser: newContact,
        })

    }).catch(err => {
        if (err.name === "MongoError") return res.status(401).json({ success: false, message: 'Contact Already Exists' })
        else {
            return res.status(400)
                .json({ error: err, message: 'Network error or some error occured' })
        }
    })
}



exports.Get_Contacts = (req, res) => {
    Contact.find().exec().then(contacts => {
        if (contacts.length < 1) {
            return res.status(404).json({
                success: false,
                count: contacts.length,
                message: 'No Contacts found',
                contacts: contacts

            })

        }

        return res.status(200).json({
            success: true,
            count: contacts.length,
            message: 'Contacts found',
            contacts: contacts

        })

    }).catch(err => {
        res.status(500).json({
            success: false,
            message: 'Some Error Occured',
            error: err
        })
    })

}
exports.getSingle_Contact = (req, res) => {
    Contact.findById(req.params.id)
        .exec().then(user => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Not Found Entry with this id '
                })
            }

            res.status(200).json({
                success: true,
                user: user
            })
        }).catch(err => res.status(500).json({
            error: err,
            success: false,
            message: 'Wrong Object Id or network issue'
        }))

}



exports.delete_Contact = (req, res) => {
    Contact.findById(req.params.id)
        .exec().then(deletedSingle => {
            if (!deletedSingle) {
                return res.status(404).json({
                    success: false,
                    message: 'Not Found Entry with this id  to delete'
                })
            }

            deletedSingle.remove();
            res.status(200).json({
                success: true,
                deletedData: deletedSingle
            })
        }).catch(err => res.status(500).json({
            error: err,
            success: false,
            message: 'Wrong Object Id or network issue'
        }))

}


exports.Update_Contact = (req, res) => {
    Contact.findById(req.params.id)
        .exec()
        .then(updatedSingle => {
            if (!updatedSingle) {
                return res.status(404).json({
                    success: false,
                    message: 'Not Found Entry with this id  to update'
                })
            }
            console.log(updatedSingle)

            Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
                .exec()
                .then(updatedSingle => {
                    res.status(200).json({
                        success: true,
                        message: 'SuccessFully Updated',
                        data: updatedSingle
                    })
                })

        }).catch(err => res.status(500).json({
            error: err,
            success: false,
            message: 'Wrong Object Id or network issue'
        }))

}
