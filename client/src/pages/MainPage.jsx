import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'
import WaiterPage from './WaiterPage'
import SelectViewModal from '../components/SelectViewModal'
import { io } from "socket.io-client"
import { useOrders, useDispatchOrders } from '../context/ordersContext'
import { Container } from 'semantic-ui-react'

export default function MainPage(){
    const [view, setView] = useState(null)
    const [open, setOpen] = useState(false)
    //Placeholder values
    const [tables, setTables] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13])

    const { orders, logged } = useOrders()
    const dispatchOrders = useDispatchOrders()


    const socket = io("http://localhost:5000")

    useEffect( () => {
        socket.once("orders", (arg) => { 
            dispatchOrders({
                type: 'LOAD_ORDERS',
                payload: arg
            })
        })
    }, [orders])

    useEffect(() => {   
        if (logged) {
            dispatchOrders({
                type: 'CURRENT_ORDERS'
            })
        }
    }, [logged])

    return (
        <>
        <Navbar setOpen={setOpen} setView={setView} />
        <Container fluid>
            {!logged ?
                <LoginForm setView={setView} /> :
                <>
                {view === 'room' && <WaiterPage tables={tables} />}
                {view === 'kitchen' && <h1>kitchen</h1>}
                {view === 'admin' && <h1>Admin</h1>}
                </>
            } 
        </Container>
        <SelectViewModal open={open} setOpen={setOpen} setView={setView}/>
        </>
    )
}