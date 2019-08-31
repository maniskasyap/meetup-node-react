
const uuidv1 = require('uuid/v1');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = {
  create: function(req, res) {
    const id = uuidv1();

    // Add a post
    db.get('posts')
      .push({ id, title: req.body})
      .write()

    // Increment count
    db.update('count', n => n + 1)
    .write()
    res.send(`ToDo created with id:${id}`);
  },
  read: function(req, res) {
    var todoId = req.params.todoId;

    var response = {
      status: 'success',
      data: {
        todos: [],
      },
    };

    var todos = [];

    if (!todoId) {
      todos.push({ value: 'all todos' });
    } else {
      todos.push({ value: 'todo with id = ' + todoId });
    }

    response.data.todos = todos.slice();

    res.send(response);
  },
  update: function(req, res) {
    res.send('this is to update a todo item');
  },
  delete: function(req, res) {
    res.send('this is to delete a todo item');
  },
};
