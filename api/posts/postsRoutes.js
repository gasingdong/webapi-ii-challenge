const express = require('express');
const db = require('../../data/db');

const router = express.Router();

router.get('/', (req, res) => {
  (async () => {
    try {
      const posts = await db.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ error: "The posts information could not be retrieved." });
    }
  })();
});

router.get('/:id', (req, res) => {
  (async () => {
    try {
      const post = await db.findById(req.params.id);
      if (post.length === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
        return;
      }
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ error: "The post information could not be retrieved." });
    }
  })();
});

module.exports = router;
