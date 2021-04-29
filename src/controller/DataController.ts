import { Request, Response } from "express"
import dataBusiness, { DataBusiness } from '../business/DataBusiness'
import { DataInfo, rangePagination } from "../model/DataModels"

export class DataController{
    constructor(
        public dataBusiness: DataBusiness
    ){} 

    public async createList(req:Request, res:Response){
        try {
            const input:DataInfo = {
                id: req.body.id,
                month: req.body.month,
                day: Number(req.body.day),
                hour: req.body.hour, 
                ip: req.body.ip, 
                cronSSDH: req.body.cronSSDH, 
                message: req.body.message
            }


            const result = await dataBusiness.createList(input)
            res.status(201).json(result)

        } catch (error) {

            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

    }

    // public async createListAuto(req:Request, res:Response){
    //     const  {start,stop} =req.params

    //     const filename = "auth.log"
       
    //     var lineReader = require('readline').createInterface({
    //         input: require('fs').createReadStream(filename)
    //     });
    //     let startNumber = Number(start)
    //     const stopNumber = Number(stop)

    //     lineReader.on('line', function (line:any) {
            
    //         try {
              
    //             if(startNumber>= stopNumber ){
    //                 return false
    //                 // throw new CustomError(400,"stop params can not be smaller or equal than start");
    //             }

    //             const month = line.slice(0,3)
    //             const day = line.slice(4,6) 
    //             const hour = line.slice(7,15)
    //             const ip = line.slice(16,32)
    //             const cronSSDH = line.slice(33,44)
    //             const message = line.slice(46)
              
                
    //             const input = {month, day, hour, ip, cronSSDH, message}
                
               
    //             dataBusiness.createListAuto(input)
                
    //             console.log(line);
    //             console.log(startNumber);
                
                
    //             startNumber = startNumber+ 1
                
    //             return res.status(200).send()
            
    //         } catch (error) {
    //             const { statusCode, message } = error
    //             res.status(statusCode || 400).send({ message });
                
    //         }
    //     });
        
    // }

    public async createListAuto(req:Request, res:Response){

        const { createReadStream } = require('fs');
        const { createInterface } = require('readline');
        
        (async function processLineByLine() {
           

        try {
            const rl = createInterface({
            input: createReadStream('./novo.log'),
           
            });

            rl.on('line', (line:any) => {
                try {

                    const month = line.slice(0,3)
                    const day = line.slice(4,6) 
                    const hour = line.slice(7,15)
                    const ip = line.slice(16,32)
                    const cronSSDH = line.slice(33,44)
                    const message = line.slice(46)
                  
                    const input = {month, day, hour, ip, cronSSDH, message}
                    
                    dataBusiness.createListAuto(input)
                    
                   
                    
                    return res.status(200).send()
                
                } catch (error) {
                    const { statusCode, message } = error
                    res.status(statusCode || 400).send({ message });
                    
                }
            });
        } catch (err) {
            console.error(err);
        }
        })();
       
    }

    public async getList(req:Request, res:Response){

        const input:any = req.query

        const newInput:rangePagination = input

        try {
            const result = await dataBusiness.getList(newInput)
            res.status(200).send({result})

        } catch (error) {

            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

    }
    public async getListByMonth(req:Request, res:Response){

        const input:any = req.query
        const newInput:rangePagination = input
        try {
            const result = await dataBusiness.getListByMonth(newInput)
            res.status(200).send({result})

        } catch (error) {

            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

    }
}

export default new DataController(dataBusiness)