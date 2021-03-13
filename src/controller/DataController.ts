import {Request, Response} from "express"
import dataBusiness, {DataBusiness} from '../business/DataBusiness'

export class DataController{
    constructor(
        public dataBusiness: DataBusiness
    ){}

    public async createList(req:Request, res:Response){
        try {
            const input = req.body


            await dataBusiness.createList(input)
            res.status(201).send()

        } catch (error) {

            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

    }
    public async getList(req:Request, res:Response){
        try {
           


            const result = await dataBusiness.getList()
            res.status(200).send({result})

        } catch (error) {

            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

    }
}

export default new DataController(dataBusiness)