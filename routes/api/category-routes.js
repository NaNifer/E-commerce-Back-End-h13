const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findAll } = require('../../models/Product');

// The `/api/categories` endpoint

  // find all categories and its associated Products
  router.get('/', async (req, res) => {
  try {
    categories = await Category.findAll({
      include: [
        { model: Product }
      ]
    });
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

  // find one category by its `id` value and its associated Products
  router.get('/:id', async (req, res) => {
  try {
    category = await Category.findByPk(req.params.id, {
      include: [
        { model: Product }
      ]
    });
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error });
  }
});

// update a category by its `id` value
router.put('/:id', async(req, res) => {
  try {
    updatedCategory = await Category.update(
      {
        id: req.params.id,
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// delete a category by its `id` value
router.delete('/:id', async(req, res) => {
  try {
    deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.json(deletedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
