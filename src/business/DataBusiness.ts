import dataDatabase,{ DataDatabase } from "../data/DataDatabase";
import { DataInfo, rangePagination } from "../model/DataModels";
import idGenerator, { IdGenerator } from "../service/idGenerator";


export class DataBusiness{

    constructor(
        private idGenerator: IdGenerator,
        private dataDatabase: DataDatabase
        ){}

    public async createList(input:DataInfo){
        try {
            const {month, day, hour, ip, cronSSDH, message} = input
    
            if(!month || !day || !hour || !ip || !cronSSDH || ! message){
                throw new Error("missin input")
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
        
        const {text, page, limit} = input
        

       
        if(!page || !limit || !text){
            throw new Error("without start, limit ou Text")
        }

        try {
            const result = await dataDatabase.getList(input)
            return result

        } catch (error) {

            const { statusCode, message } = error
            throw new Error(statusCode || message)
        }
    }
}

export default new DataBusiness(idGenerator,dataDatabase)
