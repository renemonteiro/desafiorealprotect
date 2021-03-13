import express from "express"
import DataController from '../controller/DataController'


export const data = express.Router()


data.get("/getLists", DataController.getList )
data.get("/getListsByMonth", DataController.getListByMonth )
data.post("/createData", DataController.createList )
data.post("/createDataAuto/:start/:stop", DataController.createListAuto )

