import { useState, useEffect } from 'react'
import Alert from '../components/Alert'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'
import WaiterPage from './WaiterPage'
import KitchenPage from './KitchenPage'
import SelectViewModal from '../components/SelectViewModal'
import { io } from "socket.io-client"
import API from '../utils/axiosUrl'
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
    const { refresh, logged } = useOrders()
// Order dispatcher for context state managment (redux alike) 
    const dispatchOrders = useDispatchOrders()
// Connection to socket live server host    
    const socket = io("https://cinqueterre.herokuapp.com")

    useEffect( ()=> {
        if (logged) {
            socket.on("orders", () => { 
                dispatchOrders({
                    type: 'RE_FETCH'
                })    
            })
            dispatchOrders({
                type: 'CURRENT_ORDERS'
            })
        }
    }, [logged])

    const loadOrders = async () => {
        try {
            const getOrders = await API.get('/orders')
            if (getOrders) {
                dispatchOrders({
                    type: 'LOAD_ORDERS',
                    payload: getOrders.data
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect( ()=> {
        loadOrders()
    }, [refresh])

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