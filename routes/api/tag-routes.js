const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags and its associated Product data
router.get('/', (req, res) => {
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

  // find a single tag by its `id` and its associated Product data
  router.get('/:id', (req, res) => {
  try {
    tag = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product }
      ]
    });
    res.json(tag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

  // create a new tag
router.post('/', (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.json(newTag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});




  // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  try {
    deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.json(deletedTag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
