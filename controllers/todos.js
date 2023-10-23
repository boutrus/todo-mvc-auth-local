const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res) => {
        try {
          const { todoItem, priority, category, dateAdded, description } = req.body;
          
          // Assuming you have the user ID in req.user
          const newTodo = await Todo.create({
            todo: todoItem,
            completed: false,
            userId: req.user.id,
            priority,   // Include the priority from req.body
            category,   // Include the category from req.body
            dateAdded, 
            description,
          });
    
          console.log('Todo has been added!');
          res.redirect('/todos');
        } catch (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }    
    },
    markComplete: async (req, res) => {
        try {
          await Todo.findOneAndUpdate(
            { _id: req.body.todoIdFromJSFile },
            {
              completed: true
            }
          );
          console.log('Marked Complete');
          res.json({ message: 'Marked Complete', complete: true }); // Include 'complete' in the response
        } catch (err) {
          console.log(err);
        }
      
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    