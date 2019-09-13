module.exports = {
  create: function(req, res) {
    res.send('this is to create a todo item');
  },

  read: function(req, res) {
    var todoId = req.params.todoId;
    var todoExisting = db.get('posts').value();
    var response = {
      status: 'success',
      data: {
        todos: [],
      },
    };

    var todos = [];

    if (!todoId) {
      todos.push({ value: todoExisting });
    } else {
     todoExisting.forEach(val => {
          if(val[todoId]){
            todos.push({value: val})
          }
        });
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
