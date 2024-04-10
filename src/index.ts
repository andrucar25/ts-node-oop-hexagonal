import ServerBootstrap from "./bootstrap/Server.bootstrap";
import app from "./app";
import { Bootstrap } from "./bootstrap/bootstrap";

const server: Bootstrap = new ServerBootstrap(app);

//esto es una funcion autoinvocada
(async () => {
  try{
    const promises : Array<Promise<boolean | Error>> = [server.initialize()];
    await Promise.all(promises);

  } catch(error){
    console.log(error);
    process.exit(1)
    //el 0 indica que termino de forma natural y el 1 es que hay un error
  }
})()


//20x = success
//30x = redirect
//40x = client error
//50x = server error

