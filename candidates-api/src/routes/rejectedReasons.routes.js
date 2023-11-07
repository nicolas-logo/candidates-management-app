const { Router } = require('express');
const rejectedReasonsCtrl = require('../controllers/rejectedReasons.controller');

const router = Router();

router.get('/', rejectedReasonsCtrl.GetRejectedReasons);

module.exports = router;