import dataDatabase,{ DataDatabase } from "../database/DataDatabase";
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
        
        const {text, page, nameColumn, order, limit} = input

        
        
        if(!page || !text || !nameColumn || !order || !limit){
            throw new CustomError(400, "Missin inputs page, text or nameColumn")
        }
        if(order !== "asc" && order !== "desc"){
            throw new CustomError(400,"input order is asc or desc")
        }
        if(nameColumn !== "day" && nameColumn !== "hour"){
            throw new CustomError(400,"nameColumn")
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

        
        
        const {text, page, nameColumn, order, limit} = input
        
        
        if(!page || !text || !nameColumn || !order || !limit){
            throw new CustomError(400,"Missin inputs page, text or nameColumn")
        }
        if(order !== "asc" && order !== "desc"){
            throw new CustomError(400,"input order is asc or desc")
        }

        if(nameColumn !== "day" && nameColumn !== "hour"){
            throw new CustomError(400,"input nameColum is asc or desc")
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
