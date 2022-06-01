const express = require('express');
const apiRoutes = require('./api/api.routes');
const { warnLog, infoLog } = require('../middlewares/logger');
const router = express.Router();


//Routes
router.use(infoLog)
router.use('/api', apiRoutes);
router.use('/*', warnLog);

module.exports = router;