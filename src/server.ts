import  express  from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, {swaggerUiOptions} from "./config/swagger";
import cors ,{CorsOptions} from "cors";
import morgan from "morgan";

// conectar a la base de datos
export async function conectDB() {
    try{
        await db.authenticate();
        db.sync();
       // console.log(colors.blue.bold("Conectado a la base de datos"));
    }  catch (error) {
        //console.log(error);
        console.log(colors.red.bold("No se pudo conectar a la base de datos"));  
    }
}

conectDB()

// instancia de Express
const server = express();

// permitir conexiones remotas
const corseOptions : CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
            console.log(colors.yellow.bold('Conexión permitida por CORS'))
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}
server.use(cors(corseOptions))

server.use(morgan('dev'));
// Leer datos de formularios
server.use(express.json());

server.use("/api/products", router);

// Docunentación de SWAGGER
server.use("/docs",swaggerUI.serve,swaggerUI.setup(swaggerSpec,swaggerUiOptions));

export default server;
