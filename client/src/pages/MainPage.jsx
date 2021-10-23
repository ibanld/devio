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

export default function MainPage(){
    const [view, setView] = useState(null)
    const [open, setOpen] = useState(false)
    //Placeholder values
    const [tables, setTables] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13])

    const { orders, logged } = useOrders()
    const dispatchOrders = useDispatchOrders()
    
    const socket = io("http://localhost:5000")

    useEffect( () => {
        socket.on("orders", (arg) => { 
            console.log('socket listening')
            dispatchOrders({
                type: 'LOAD_ORDERS',
                payload: arg
            })
            
        })
    }, [])
    
    useEffect(() => {   
        if (logged) {
            dispatchOrders({
                type: 'CURRENT_ORDERS'
            })
        }
    }, [logged])

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
                {view === 'admin' && <h1>Admin</h1>}
                </>
            } 
        </Container>
        <SelectViewModal open={open} setOpen={setOpen} setView={setView}/>
        </>
    )
}