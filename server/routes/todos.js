var express = require('express');
var router = express.Router();
var todos = require('../controllers/todos');

router.post('/', todos.create);
router.get('/:todoId?', todos.read);
router.put('/:todoId', todos.update);
router.delete('/:todoId', todos.delete);

module.exports = router;
