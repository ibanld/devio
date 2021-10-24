import { useState, useEffect } from 'react'
import Alert from '../components/Alert'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'
import WaiterPage from './WaiterPage'
import KitchenPage from './KitchenPage'
import SelectViewModal from '../components/SelectViewModal'
import { io } from "socket.io-client"
import { useOrders, useDispatchOrders } from '../context/ordersContext'
import { Container } from 'semantic-ui-react'
import AdminPage from './AdminPage'

export default function MainPage(){
    // State to handle different pages (views)
    const [view, setView] = useState(null)
    // State to open views Modal menu
    const [open, setOpen] = useState(false)
    // Placeholder values for tables (production mode should handle this from database or server)
    const [tables, setTables] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13])

// Orders and log-in status from context state provider
    const { orders, logged } = useOrders()
// Order dispatcher for context state managment (redux alike) 
    const dispatchOrders = useDispatchOrders()
// Connection to socket live server host    
    const socket = io("http://localhost:5000")


    useEffect( ()=> {
        if (logged) {
            socket.once("orders", (arg) => { 
                console.log(arg)
                dispatchOrders({
                    type: 'LOAD_ORDERS',
                    payload: arg
                })    
            })
            dispatchOrders({
                type: 'CURRENT_ORDERS'
            })
        }
    }, [dispatchOrders, logged])

    return (
        <>
        <Alert />
        <Navbar setOpen={setOpen} setView={setView} />
        <Container fluid>
            {!logged ?
                <LoginForm setView={setView} /> :
                <>
                {view === 'room' && <WaiterPage tables={tables} />}
                {view === 'kitchen' && <KitchenPage />}
                {view === 'admin' && <AdminPage setTables={setTables} />}
                </>
            } 
        </Container>
        <SelectViewModal open={open} setOpen={setOpen} setView={setView}/>
        </>
    )
}