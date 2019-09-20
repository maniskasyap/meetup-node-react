
const uuidv1 = require('uuid/v1');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = {
  create: function(req, res) {
    const id = uuidv1();

    // Async call to update the database with the new post
    async function dbupdate(){
    await db.get('posts')
      .push({ [id]: req.body.text})
      .write()
    }
    // If the DB update is successfull, send posts back else error
    dbupdate().then(()=>{
        let dbUpdated = db.get('posts');
        res.send({status:"success",posts:dbUpdated});
    }).catch((err)=>{
      res.send({status:"Update failed",error:err})
    });

    // Increment count
    db.update('count', n => n + 1)
    .write()
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
    let todoId = req.params.todoId;
      db.get('posts')
        .remove(todoId)
        .write();
        let updatedTodos = db.get('posts').value();
      res.send({status:"success",value:updatedTodos});
     //Decrement count
     db.update('count', n => n - 1)
     .write()
  },
};
