const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findAll } = require('../../models/Product');

// Asaha's suggestion
// router.get('/', async (req, res) => {
//   try {
//     Category = await Category.findAll({
//       attributes: ['id', 'category_name'],
//       include: [
//         {
//           model: Product,
//           attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
//         }
//       ]
//     });
//     res.json(Category);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error });
//   }
// });

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
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

// SAMPLE GET by id
// router.get('/:id', (req, res) => {
//   // TODO: Add a comment describing the functionality of this method
//   Book.findByPk(req.params.id).then((bookData) => {
//     res.json(bookData);
//   });
// });

router.get('/:id', async (req, res) => {
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

// SAMPLE POST
// router.post('/', async (req, res) => {
//   const { todo, isCompleted } = req.body;
//   try {
//       const newTodo = await Todo.create({
//           todo,
//           isCompleted,
//       });
//       console.log(newTodo);
//       res.json(newTodo);

//   } catch (error) {
//       res.status(500).json({ error })
//   }
// });

// Another SAMPLE POST
// router.post('/', (req, res) => {
//   Book.create(req.body)
//     .then((newBook) => {
//       res.json(newBook);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });


router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// SAMPLE UPDATE
// router.put('/:book_id', async (req, res) => {
//   //Calls the update method on the Book model
//   const updatedBook = await Book.update(
//     {
//       // All the fields you can update and the data attached to the request body.
//       title: req.body.title,
//       author: req.body.author,
//       isbn: req.body.isbn,
//       pages: req.body.pages,
//       edition: req.body.edition,
//       is_paperback: req.body.is_paperback,
//     },
//     {
//       // Gets a book based on the book_id given in the request parameters
//       where: {
//         book_id: req.params.book_id,
//       },
//     }
//   );
  
//   res.json(updatedBook);
// });


router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    updatedCategory = await Category.update(
      {
        id: req.body.id,
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

// SAMPLE Delete route for a book with a matching book_id
// router.delete('/:book_id', async (req, res) => {
//   // Looks for the book based on the book_id given in the request parameters
//   const deletedBook = await Book.destroy({
//     where: {
//       book_id: req.params.book_id,
//     },
//   });
  
//   res.json(deletedBook);
// });

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
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
