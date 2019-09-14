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
    let todoId = req.params.todoId;
    let {text} = req.body;
    let todosExisting = db.get('posts').value();
    todosExisting.forEach(value => {
      if(value[todoId]){
        value[todoId] = text;
      }
    });
    db.update('posts',todosExisting).write();
    res.send({status:"success",value:todosExisting});
  },
  delete: function(req, res) {
    res.send('this is to delete a todo item');
  },
};
