module.exports = {
  create: function(req, res) {
    res.send('this is to create a todo item');
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
