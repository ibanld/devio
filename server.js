const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser')
const { createServer } = require("http")
const { Server } = require("socket.io")
const { dbConnect } = require('./config/db')
const { findAll } = require('./socketEvents/order.events')

// Criamos servidor de Express e httpServer
const app = express()
const httpServer = createServer(app)

// Iniciamos CORS
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Abrimos conexao com Socket.io
const io = new Server(httpServer, {
    cors: { 
        origin: "http://localhost:3000",    
        methods: ["GET", "POST", "PUT"]  
    }
})

// Escolhemos PORT do host ou 3000
const PORT = process.env.PORT || 5000

// Abrimos conexao com o banco de dados
dbConnect()

// Abrimos socket para conxao com o cliente
io.on("connection", (socket) => { 
    let data
    const broadcast = async () =>  {
        try {
            const getOrder = await findAll()
            if (getOrder) {
                data = [...getOrder]
                socket.broadcast.emit("orders", data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    socket.on("updateOrder", () => {
        console.log('Update')
        broadcast()
    })
})

// Rotas do API
app.use('/api/orders', require('./routes/api/order.router'))
app.use('/api/users', require('./routes/api/user.router'))
app.use('/api/products', require('./routes/api/product.router'))

// Iniciamos servidor
httpServer.listen(PORT, () => console.log(`Express-Socket running at PORT: ${PORT}`))