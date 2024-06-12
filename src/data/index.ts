import {exit} from 'node:process'
import db from '../config/db'

const clearDb = async () => {
    try {
        await db.sync({force: true})
        console.log('Base de datos reiniciada')
        exit()
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === '--clear') { // proces.argv[2]  -- es un codigo que se ejecuta desde cli
    clearDb()
}
 
export default clearDb