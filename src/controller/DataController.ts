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
    public async createListAuto(req:Request, res:Response){
        const  {start,stop} =req.params
       
        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('novo.log')
        });

        lineReader.on('line', function (line:any) {
            let startNumber = Number(start)
            const stopNumber = Number(stop)

            console.log(startNumber,stopNumber);
        
            try {
                if(startNumber>= stopNumber){
                    throw new Error("stop");
                    
                }
                const month = line.slice(0,3)
                const day = line.slice(4,6) 
                const hour = line.slice(7,15)
                const ip = line.slice(16,32)
                const cronSSDH = line.slice(33,44)
                const message = line.slice(46)
                
                const input = {month, day, hour, ip, cronSSDH, message}
                dataBusiness.createListAuto(input)
               
                startNumber = startNumber + 1
                console.log(line);
    
                return res.status(200).send()
            
            } catch (error) {
                const { statusCode, message } = error
                res.status(statusCode || 400).send({ message });
                
            }
        });
        
    }
    public async getList(req:Request, res:Response){

        const input:any = req.query

        try {
            const result = await dataBusiness.getList(input)
            res.status(200).send({result})

        } catch (error) {

            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

    }
    public async getListByMonth(req:Request, res:Response){

        const input:any = req.query
        try {
            const result = await dataBusiness.getListByMonth(input)
            res.status(200).send({result})

        } catch (error) {

            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

    }
}

export default new DataController(dataBusiness)