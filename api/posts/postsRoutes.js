const express = require('express');
const db = require('../../data/db');

const router = express.Router();

router.use(express.json());

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

router.get('/:id/comments', (req, res) => {
  (async () => {
    try {
      const post = await db.findById(req.params.id);
      if (post.length === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
        return;
      }
      const comments = await db.findPostComments(post[0].id);
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json({ error: "The comments information could not be retrieved." });
    }
  })();
});

router.post('/', (req, res) => {
  (async () => {
    try {
      const { title, contents } = req.body;
      if (title && contents) {
        const timestamp = Date.now();
        const newPost = {
          title,
          contents,
          created_at: timestamp,
          updated_at: timestamp,
        }
        await db.insert(newPost);
        res.status(201).json(newPost);
      } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
      }
    } catch (err) {
      res.status(500).json({ error: "There was an error while saving the post to the database" });
    }
  })();
})

module.exports = router;
