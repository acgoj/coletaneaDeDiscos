const express = require('express');
const router = express.Router();
const disksController = require('../controllers/disksController')

router.get('/', function(req, res) {
    return disksController.getAllDisks(req, res)
  })
router.get('/:id?', function(req, res) {
    return disksController.getDiskById(req, res)
  })
router.delete('/:id?', function(req, res) {
    return disksController.deleteDisk(req, res)
  })
router.put('/:id?', function(req, res) {
    return disksController.updateDisk(req, res)
  })
router.post('/create', function(req, res) {
    return disksController.createDisk(req,res)
  })
router.get('/search/:text?', function(req, res) {
    return disksController.searchDisks(req,res)
  })
module.exports = router;