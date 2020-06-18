const express = require('express');

const knex = require('../data/dbConfig.js');
const { first } = require('../data/dbConfig.js');
const Knex = require('knex');

const router = express.Router();

//get
router.get('/', (req, res) => {
  //select * from accounts
  knex
    .select('*')
    .from('accounts')
    .then(accounts => {
      res.status(200).json({ accounts: accounts });
    })
    .catch(err => {
      console.log('GET /', err);
      res.status(500).json({ erroMessage: 'Error getting all the accounts' });
    });
});

//get
router.get('/:id', (req, res) => {
  //select * from accouns where id = req.params.id
  knex
    .select('*')
    .from('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
      res.status(200).json({ accounts: account });
    })
    .catch(err => {
      console.log('GET /:id', err);
      res.status(500).json({ erroMessage: 'Error getting the account' });
    });
});

//post
router.post('/', (req, res) => {
  knex('accounts')
    .insert(req.body, 'id')
    .then(([id]) => {
      res.status(201).json({ data: id });
    })
    .catch(err => {
      console.log('POST /', err);
      res.status(500).json({ erroMessage: 'Error posting new the account' });
    });
});

//put
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  knex('accounts')
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'record updated sucessfuly' });
      } else {
        res.status(404).json({ message: 'No records found' });
      }
    })
    .catch(err => {
      console.log('POST /', err);
      res.status(500).json({ erroMessage: 'Error posting new the account' });
    });
});

//delete
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  knex('accounts')
    .where({ id })
    .delete()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'record deleted sucessfuly' });
      } else {
        res.status(404).json({ message: 'No records found' });
      }
    })
    .catch(err => {
      console.log('POST /', err);
      res.status(500).json({ erroMessage: 'Error with account' });
    });
});

module.exports = router;
