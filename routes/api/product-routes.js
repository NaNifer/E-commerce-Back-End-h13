const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
// find all products and its associated Category and Tag data
router.get('/', async(req, res) => {
  try {
    products = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag }
      ]
    });
    res.json(products);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// get one product
// find a single product by its `id` and its associated Category and Tag data
router.get('/:id', async(req, res) => {
  try {
    product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag }
      ]
    });
    res.json(product);
  
  
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// create new product
router.post('/', async(req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      console.log(req.body.tagIds.length)
      console.log(req.body.tagIds)
      console.log(typeof req.body.tagIds)

      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', async(req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      console.log(req.body.tagId)
      // create filtered list of new tag_ids
      
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
        console.log(newProductTags)

      // figure out which ones to remove
      // const productTagsToRemove = productTags
      //   .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      //   .map(({ id }) => id);

      //   console.log(productTagsToRemove)

      // run both actions
      return Promise.all([
       // ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});




// delete one product by its `id` value
router.delete('/:id', async(req, res) => {
try {
  deletedProduct = await Product.destroy({
    where: {
      id: req.params.id,
    }
  });
  res.json(deletedProduct);
} catch (error) {
  console.log(error);
  res.status(500).json({ error });
}
});

module.exports = router;
