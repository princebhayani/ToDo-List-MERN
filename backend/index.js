import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectToMongoDB from "./db/connectToMongoDB.js";
import ToDoModel from "./model/todo.model.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/tasks/get", async (req,res)=>{
    try {
        const todos = await ToDoModel.find();
        return res.status(201).json(todos);
    } catch (error) {
        console.log(error);
    }
})
app.get("/tasks/get/:id",async (req,res)=>{
    try {
        const todo = await ToDoModel.findById({_id:req.params.id});
        return res.status(201).json(todo);
    } catch (error) {
        console.log(error);
    }
})

app.post("/tasks/add", async(req, res) =>  {
    try {
        const todo = await ToDoModel.create(req.body);
        return res.status(201).json(todo);
    } catch (error) {
        console.log(error);
    }
});

app.put("/tasks/update/:id",async (req,res)=>{
    try {
        const updatedTodo = await ToDoModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json(updatedTodo);
    } catch (error) {
        
    }
})

app.delete("/tasks/delete/:id",async (req,res)=>{
    try {
        const todo = await ToDoModel.findByIdAndDelete({_id:req.params.id});
        return res.status(201).json(todo);
    } catch (error) {
        console.log(error);
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});
