import { io } from "socket.io-client"

const socket = io("http://localhost:5000")

const requestUpdate = () => socket.emit("getOrders")

export default requestUpdate