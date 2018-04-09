const express = require('express');
const Note = require('../model/note');

const router = express.Router();

router.get('/', (req, res) => {
  Note
    .find()
    .exec()
    .then((docs) => {
      const response = docs.map((doc) => {
        const note = {
          id: doc.id,
          title: doc.title,
          text: doc.text,
          date_create: doc.date_create.getTime(),
          date_update: doc.date_update.getTime(),
        };
        return note;
      });
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        status: 'fail',
        error: err,
      });
    });
});

router.post('/', (req, res) => {
  const note = new Note({
    title: req.body.title,
    text: req.body.text,
  });
  note
    .save()
    .then((result) => {
      res.status(201).json({
        status: 'success',
        createdNote: {
          id: result.id,
          title: result.title,
          text: result.text,
          date_create: result.date_create.getTime(),
          date_update: result.date_update.getTime(),
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'fail',
        errors: err.errors,
      });
    });
});

router.patch('/', (req, res) => {
  const { id, ...updateData } = req.body;
  Note
    .update({
      _id: id,
    }, {
      $set: updateData,
    })
    .exec()
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'The note was updated',
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'fail',
        error: err,
      });
    });
});

router.delete('/', (req, res) => {
  Note
    .remove({ _id: req.body.id })
    .exec()
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'The note was deleted',
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'fail',
        error: err.message,
      });
    });
});


module.exports = router;
