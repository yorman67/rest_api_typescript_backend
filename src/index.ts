import server from "./server";
import colors from "colors";

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(colors.yellow.bold("Servidor corriendo en el puerto "+ port));
});