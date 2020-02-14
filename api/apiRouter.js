const express = require('express')
const router = express.Router();
const projectRouter = require('./projectRouter')
const actionRouter = require('./actionsRouter')

router.use('/projects', projectRouter);
router.use('/actions', actionRouter);


module.exports = router;