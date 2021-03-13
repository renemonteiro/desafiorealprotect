import express from "express"
import DataController from '../controller/DataController'

export const data = express.Router()


data.get("/getLists", DataController.getList )
data.post("/createData", DataController.createList )

