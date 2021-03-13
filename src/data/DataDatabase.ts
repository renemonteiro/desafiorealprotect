import knex from './connection'
import {DataInfo, rangePagination} from "../model/DataModels"

export class DataDatabase{
    protected static tableName:string = "auth"

    public async createList(input:DataInfo){
        const {id, month, day, hour, ip, cronSSDH, message} = input
        try {
            await knex.raw(`
            INSERT INTO ${DataDatabase.tableName} VALUES(
                '${id}', 
                '${month}', 
                '${day}',
                '${hour}', 
                '${ip}', 
                '${cronSSDH}',
                '${message}');
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
    public async getList(input:rangePagination){
        const {page, limit, text} =input
        let p = page - 1
       
        try {
            const result = await knex.raw(`
            select * from ${DataDatabase.tableName} 
            where message like "%${text}%" 
            limit ${limit} 
            offset ${p};

            `)
            return result[0]
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}

export default new DataDatabase()