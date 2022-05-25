const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./middlewares/passport');
const cluster = require('cluster')
const os = require('os')
const http = require('http')
const  ChatDao = require('./models/daos/Chat.dao')

const chat = new ChatDao()
const apisRoutes = require('./routers/app.routers');
const { errorLog } = require('./middlewares/logger');
const { DBConfig } = require('./config/dbConfig');

const mode = process.argv[3] == 'cluster';
const app = express();

const server = http.createServer(app) 
const io = require('socket.io')(server)

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(session({ 
  name: 'coder-session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: DBConfig.mongo.uri('sessions')
  })
}));
app.use(passport.initialize());
app.use(passport.session());

// Template engines
app.set('views', './views');
app.set('view engine', 'ejs');

// Routes
app.use(apisRoutes);

if (mode && cluster.isPrimary) {
  console.log('Primary process PID =>', process.pid)
  
  const numCPUs = os.cpus().length
  console.log('No. de nucleos => ', numCPUs)

  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on('exit', (worker, code) => {
    console.log('Worker ', worker.process.pid, `Exitted on ${new Date().toLocaleDateString()}`);
    cluster.fork()
  })
} else {
  const PORT = process.env.PORT || 8081;
  io.on('connection', async (socket) => {
    emitir()
    socket.on("incomingMessage", async (message) =>{
      await chat.createItem(message)
      emitir()
    })
  })
  
  const emitir = async () => {
    const lista = await chat.normalizar()
    io.sockets.emit("chat", lista)
  }
  const runningServer = server.listen(PORT, async () => {
  });
  
  runningServer.on('error', async (error) => {
    errorLog(error.message);
  });
}