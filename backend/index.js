import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectToMongoDB from "./db/connectToMongoDB.js";
import ToDoModel from "./model/todo.model.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/get",(req,res)=>{
    ToDoModel.find()
    .then(result=> res.json(result))
    .catch(error =>res.json(error))
})
app.get("/api/get/:id",(req,res)=>{
    const {id} = req.params;
    ToDoModel.findById({_id:id})
    .then(result=> res.json(result))
    .catch(error =>res.json(error))
})

app.post("/api/add", async(req, res) =>  {
    try {
        const todo = await ToDoModel.create(req.body);
        return res.status(201).json(todo);
    } catch (error) {
        console.log(error);
    }
});

app.put("/api/update/:id",(req,res)=>{
    const {id} = req.params;
    ToDoModel.findByIdAndUpdate({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

app.delete("/api/delete/:id",(req,res)=>{
    const {id} = req.params;
    ToDoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});
