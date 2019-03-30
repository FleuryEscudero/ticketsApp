const express = require('express');
/**
 * Se carga el socketio dentro de la constante apra ser utilziado
 * Se utiliza http ya que socketIO no funciona con express
 * Express esta absado en http.
 */
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();

/**
 * Se carga la variable server para cargar el servidor http utilizando express
 */
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));


/**
 * Se inicializa el SocketIO con el servidor HTTP
 * IO = a la comunicacion del backend entradas y salidas
 * 
 * Para validar que socketIO esta funcionando entrar en el web browser y teclear http://localhost:3000/socket.io/socket.io.js
 */
module.exports.io = socketIO(server);
require('./sockets/sockets');
/**
 * para saber que tenemos en los dos lugares la conexion se crea el io.on para poner la notificacion de que tenemos
 * el usuario conectado.
 */


server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});