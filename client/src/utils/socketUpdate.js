import { io } from "socket.io-client"

const socket = io("https://cinqueterre.herokuapp.com")

const requestRefresh = () => socket.emit("reFetch")

export default requestRefresh