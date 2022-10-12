import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import { createServer } from "http"
import { productos } from '../Routes/productos.js'
// import { ContainerSQLite } from '../SQLite3/ContainerSQLite.js'
// import { ContainerMariaDB } from '../MariaDB/ContainerMariaDB.js'
import messageDAO from '../DAOs/index.js'

// console.log(await messageDAO.all())

// const SQLite = new ContainerSQLite();
// const MariaDB = new ContainerMariaDB()


const PORT = 3000
const app = express()
const httpServer = createServer(app)


const io = new Server(httpServer)

app.use(express.static('Public'))
app.use(express.static('Uploads'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

io.on('connection', async (socket) => {
    console.log('Cliente conectado')
    
    socket.emit('fromServerChat', await messageDAO.all())

    socket.on('fromClientChat', async msge => {                
        messageDAO.save(msge)
        io.sockets.emit('fromServerChat', await messageDAO.all())
    })        
})


/*Ruta Index API NoREST*/ 
app.get('/', (req, res) => {
    res.render('index',{
        messageSuccess: null,
        errores: null,
        prodVal: null
    })
})

app.use('/api', productos)





httpServer.listen(PORT, () => {
    console.log(`Corriendo en puerto ${PORT}`)
})

app.use('*', (req, res, next) => {
    res.status(404).json({message: "El rescurso buscado no existe"});
});

app.use((err, req, res, next) =>{
    res.status(err.statusCode ? err.statusCode : 500 ).json({
        message: err.message,
        status: err.statusCode
    })
});