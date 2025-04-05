const db = require('../models/db');

//for POST  to create tasks
exports.createTask = async (req, res) =>{
    const {title, description} = req.body;
    const sql = "INSERT INTO tasks (title, description) VALUES (?,?)";

    try{
        const result = await db.query(sql, [title, description]);
        res.status(201).json({message:"Task Created"});
    }
    catch(err){
        res.status(500).json({message: "Failed Creating Task!", Error:err});
    }
};


//for GET  to get tasks
exports.getTask = async (req,res) =>{
    const sql = "SELECT * FROM tasks";

    try{
        const result = await db.query(sql);
        res.status(200).json({message:"The tasks are:", tasks:result});
    }
    catch(err){
        res.status(500).json({message:"Error while fetching Data", Error:err});
    }
};

//for PUT to update tasks
exports.updateTask = async (req, res)=>{
    const id = req.params.id;
    const {title, description} = req.body;

    const sql = "Update tasks set title = ? , description = ? where id = ?";
    try{
        const result= await db.query(sql, [title, description, id]);
        res.status(200).json({message:"Successfully updated"});
    }
    catch(err){
        res.status(500).json({message: "Update Failed", Error: err});
    }
};

//for DELETE  to delete specific tasks
exports.deleteTask = async (req, res)=>{
    const id = req.params.id;
    const sql = "Delete from tasks where id = ?";
    try{
        const result = await db.query(sql, [id]);
        res.status(200).json({message:"Deleted successfully!"});
    }
    catch(err){
        res.status(500).json({message:"Deleting Failed", Error:err});
    }
};

