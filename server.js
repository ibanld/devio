const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const dbConnect = require('./config/db')

// Criamos servidor de Express e httpServer
const app = express()
const httpServer = createServer(app)

// Abrimos conexao com Socket.io
const io = new Server(httpServer)

// Escolhemos PORT do host ou 3000
const PORT = process.env.PORT || 3000

// Testamo conexao com o banco de dados
dbConnect

// Abrimos socket para conxao com o cliente
io.on("connection", (socket) => {  
    id = socket.id
    console.log('New income connection' + socket.id)
})

// Iniciamos servidor
httpServer.listen(PORT, () => console.log(`Express-Socket running at PORT: ${PORT}`))