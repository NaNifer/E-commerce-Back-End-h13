const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags and its associated Product data
router.get('/', async(req, res) => {
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
  router.get('/:id', async(req, res) => {
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
router.post('/', async(req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.json(newTag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    updatedTag = await Tag.update(
      {
        id: req.body.id,
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.json(updatedTag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

  // delete on tag by its `id` value
router.delete('/:id', async(req, res) => {
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
