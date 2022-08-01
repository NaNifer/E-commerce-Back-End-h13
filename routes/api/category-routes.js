const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findAll } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
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

// router.get('/:id', (req, res) => {
//   // TODO: Add a comment describing the functionality of this method
//   Book.findByPk(req.params.id).then((bookData) => {
//     res.json(bookData);
//   });
// });

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
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


router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
