import express from  'express'
import { addDetails, deleteData, getAllData, getData, getDataByName, updateData } from '../controllers/dataController.js';

const router = express.Router()

//get Details
router.get(":id", getData);


//Post Details or Add Details
router.post("/", addDetails)


//get details by name
router.get("/:name", getDataByName)


//get all data
router.get("/", getAllData)


//update Data
router.put("/:id", updateData)


//delete Data
router.delete("/:id", deleteData)

export default router