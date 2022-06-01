const config = require('./config');
const express = require('express');
const apisRoutes = require('./routers/app.routers');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use(apisRoutes);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, async () => {
  console.log(`Servidor express escuchando en el puerto ${PORT} (${config.NODE_ENV} - ${config.TIPO_PERSISTENCIA})`)
});

server.on('error', async (error) => {
  console.log('Servidor express en :',error);
});