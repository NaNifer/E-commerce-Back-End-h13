const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findAll } = require('../../models/Product');

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
// router.put('/:book_id', (req, res) => {
//   //Calls the update method on the Book model
//   Book.update(
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
//   )
//     .then((updatedBook) => {
//       res.json(updatedBook);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json(err);
//     });
// });


router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    Category.update(
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

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
