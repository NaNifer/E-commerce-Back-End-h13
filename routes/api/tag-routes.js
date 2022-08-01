const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags and its associated Product data
  try {
    tags = await Tag.findAll({
      include: [
        { model: Product }
      ]
    });
    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id` and its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
