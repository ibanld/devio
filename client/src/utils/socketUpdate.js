import { io } from "socket.io-client"

const socket = io("http://localhost:5000")

const requestRefresh = () => socket.emit("reFetch")

export default requestRefresh