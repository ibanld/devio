import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'
import WaiterPage from './WaiterPage'
import SelectViewModal from '../components/SelectViewModal'
import { io } from "socket.io-client"
import { useOrders, useDispatchOrders } from '../context/ordersContext'
import { Container } from 'semantic-ui-react'

export default function MainPage(){
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)
    const [open, setOpen] = useState(false)
    //Placeholder values
    const [tables, setTables] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13])

    const { orders } = useOrders()
    const dispatchOrders = useDispatchOrders()

    useEffect( ()=> {
        if(user !== null){
            setView(user.role)
        } else {
            setView(null)
        }
    }, [user])

    const socket = io("http://localhost:5000")

    useEffect( () => {
        socket.once("orders", (arg) => { 
            dispatchOrders({
                type: 'LOAD_ORDERS',
                payload: arg
            })
        })
    }, [orders])

    return (
        <>
        <Navbar user={user} setUser={setUser} setOpen={setOpen} setView={setView} />
        <Container fluid>
            {setView === null || user === null &&
                <LoginForm setUser={setUser} /> 
            }
            {view === 'room' && <WaiterPage user={user} tables={tables} />}
            {view === 'kitchen' && <h1>kitchen</h1>}
            {view === 'admin' && <h1>Admin</h1>}
        </Container>
        <SelectViewModal open={open} setOpen={setOpen} setView={setView}/>
        </>
    )
}