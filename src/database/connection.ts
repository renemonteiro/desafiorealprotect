import knex from 'knex'
const knexfile = require("../../knexfile")

const connection = knex(knexfile)

export default connection