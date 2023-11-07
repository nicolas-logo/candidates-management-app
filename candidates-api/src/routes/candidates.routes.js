const { Router } = require('express');
const candidatesCtrl = require('../controllers/candidates.controller');

const router = Router();

router.get('/', candidatesCtrl.GetCandidates);
router.put('/:id', candidatesCtrl.UpdateCandidate);

module.exports = router;