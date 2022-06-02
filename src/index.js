const config = require('./config');
const express = require('express');
const Router = require('./routers/app.routers');

const app = express();
const router = new Router()
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use(router.start());

const PORT = config.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT} (${config.NODE_ENV} - ${config.TIPO_PERSISTENCIA})`)
});

server.on('error', (error) => {
  console.log('Servidor express en :',error);
});