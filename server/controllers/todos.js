
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
