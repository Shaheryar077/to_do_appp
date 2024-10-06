const Todo = require('../model/todo.model')


const createTodo = async(req,res)=>{

    try {
        const todo = new Todo({
            ...req.body,
            user:req.user.userId    // Assuming the token includes userID
        });

        await todo.save();
        // console.log(todo);
        
        res.status(201).json({
            success : true,
            data:todo
        });
        
    } catch (error) {
        console.error('error creating todo',error.message)
        res.status(500).json({
            success : false,
            message : 'failed to create todo',
            error : error.message
        });

        
    }

}

const getTodos = async(req,res)=>{

    try {
        const todos = await Todo.find({
            user:req.user.userId
        });
        res.status(201).json({
            success : true,
            data:todos
        });
        
    } catch (error) {

        console.error('error fetching todo',error.message)
        res.status(500).json({
            success : false,
            message : 'failed to fetch todo',
            error : error.message
        });
        
    }

}

const updateTodo = async(req,res)=>{

    try {

        const todo = await Todo.findOneAndUpdate({
            _id:req.params.id,
            user : req.user.userId
        },
        req.body,{
            new : true
        }
    );
    if(!todo){
        return res.status(404).json({
            success : false,
            message : 'todo not found'
        });
    }
    res.status(201).json({
        success : true,
        data : todo})
        
    } catch (error) {

        console.error('error updating todo',error.message)
        res.status(500).json({
            success : false,
            message : 'failed to update todo',
            error : error.message })
        
    }

}

const deleteTodo = async(req,res)=>{

    try {

        const todo = await Todo.findOneAndDelete({
            _id:req.params.id,
            user : req.user.userId
        });
    if(!todo){
        return res.status(404).json({
            success : false,
            message : 'todo not found'
        });
    }
    res.status(201).json({
        success : true,
        message : 'todo delete successfully'})
        
    } catch (error) {

        console.error('error deleting todo',error.message)
        res.status(500).json({
            success : false,
            message : 'failed to delete todo',
            error : error.message })
        
    }

}



module.exports = {createTodo,getTodos,updateTodo,deleteTodo}




