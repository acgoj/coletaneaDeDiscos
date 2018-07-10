const express = require('express');
const router = express.Router();
const collectionsController = require('../controllers/collectionsController')

router.get('/', function(req, res) {
    return collectionsController.getAllCollections(req, res)
  })
router.get('/:id?', function(req, res) {
    return collectionsController.getCollectionById(req, res)
  })
router.delete('/:id?', function(req, res) {
    return collectionsController.deleteCollection(req, res)
  })
router.post('/disk', function(req, res) {
    return collectionsController.addDiskToCollection(req, res)
  })
router.delete('/disk/:idCollection?/:idDisk?', function(req, res) {
    return collectionsController.deleteDiskFromCollection(req, res)
  })
router.put('/:id?', function(req, res) {
    return collectionsController.updateCollection(req, res)
  })
router.post('/create', function(req, res) {
    return collectionsController.createCollection(req,res)
  })
router.get('/search/:text?', function(req, res) {
    return collectionsController.searchCollection(req,res)
  })
module.exports = router;