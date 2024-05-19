import Data from "../models/dataModel.js";


//add new Data
export const addDetails = async (req, res, next) =>{
    const newData = new Data(req.body);
    try{
        const savedData = await newData.save();
        res.status(200).json(savedData)
    }
    catch(err){
        next(err);
    }
}


//update Data
export const updateData = async (req, res, next) =>{
    try{
        const updatedData = await Data.findByIdAndUpdate(
            req.params.id,
            {$set : req.body},
            {new : true}
        )
        res.status(200).json(updatedData);
    }
    catch(err){
        next(err);
    }
}


//delete Data
export const deleteData = async (req, res, next) => {
    try{
        await Data.findByIdAndDelete(req.params.id);
        res.status(200).json("Data has been deleted.")
    }
    catch(err){
        next(err)
    }
}

//get Data
export const getData = async (req, res, next) => {
    try{
        const data = await Data.findById(req.params.id);
        res.status(200).json(data);
    }
    catch(err){
        next(err)
    }
}


//get all Data

export const getAllData = async (req, res, next) => {
    try{
        const data = await Data.find();
        res.status(200).json(data);
    }
    catch(err){
        next(err)
    }
}


//get data based on name
export const getDataByName = async(req, res, next) => {
    try{
        const personName = req.params.name
        const data = await Data.findOne({firstName : personName} || {lastName : personName})
        if (data){
            res.status(200).json(data)
        }
        else{
            res.status(404).json({message : "Data not found"})
        }
    }
    catch(err){
        res.status(500).json({message : "Server error", error : err})
    }
}