const express = require('express');

const postsRoutes = require('./posts/postsRoutes');

const router = express.Router();

router.use('/posts', postsRoutes);

module.exports = router;
