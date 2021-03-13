import dataDatabase,{ DataDatabase } from "../data/DataDatabase";
import { DataInfo, rangePagination } from "../model/DataModels";
import idGenerator, { IdGenerator } from "../service/idGenerator";
import CustomError from "../error/CustomError"



export class DataBusiness{

    constructor(
        private idGenerator: IdGenerator,
        private dataDatabase: DataDatabase
        ){}

    public async createList(input:DataInfo){
        try {
            const {month, day, hour, ip, cronSSDH, message} = input
    
            if(!month || !day || !hour || !ip || !cronSSDH || ! message){
                throw new CustomError(400,"Missin inputs: month, day, hour, ip, cronSSDH, message ")
            }
            input.id = this.idGenerator.generate()
    
            const result = await this.dataDatabase.createList(input)

            return {result}
            
        } catch (error) {
            const { statusCode, message } = error
            throw new Error(statusCode || message)
        }
    }
    public async createListAuto(input:any){
       
        try {
            const {month, day, hour, ip, cronSSDH, message} = input
    
            if(!month || !day || !hour || !ip || !cronSSDH || ! message){
                throw new CustomError(400, "Missin inputs: month, day, hour, ip, cronSSDH, message ")
            }
            input.id = this.idGenerator.generate()
    
            const result = await this.dataDatabase.createList(input)

            return {result}
            
        } catch (error) {
            const { statusCode, message } = error
            throw new Error(statusCode || message)
        }
    }

    public async getList(input:rangePagination){
        
        const {text, page, orderBy} = input

        
        
        if(!page || !text || !orderBy){
            throw new CustomError(400, "Missin inputs page, text or orderBy")
        }
        if(orderBy !== "day" && orderBy !== "hour"){
            throw new CustomError(400,"orderBy")
        }

        try {
            const result = await dataDatabase.getList(input)
            return result

        } catch (error) {

            const { statusCode, message } = error
            throw new Error(statusCode || message)
        }
    }
    public async getListByMonth(input:rangePagination){

        
        
        const {text, page, orderBy} = input
        
        if(!page || !text || !orderBy){
            throw new CustomError(400,"Missin inputs page, text or orderBy")
        }
        if(orderBy !== "day" && orderBy !== "hour"){
            throw new CustomError(400,"orderBy")
        }

        try {
            const result = await dataDatabase.getListByMonth(input)
            return result

        } catch (error) {

            const { statusCode, message } = error
            throw new Error(statusCode || message)
        }
    }
}

export default new DataBusiness(idGenerator,dataDatabase)
