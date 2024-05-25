import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            require: true,
            minlength: 5,
            max_length:25
        },
        description:{
            type: String,
            require: true,
        },
        todoStatus:{
            type:String,
            default:"pending",
            require: true,
        },
        dueDate: { 
            type:Date,
            require:true,
        },
    }
)

const ToDoModel = mongoose.model("todos",todoSchema);

export default ToDoModel;