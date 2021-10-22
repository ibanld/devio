import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'
import WaiterPage from './WaiterPage'
import SelectViewModal from '../components/SelectViewModal'
import { Container } from 'semantic-ui-react'

export default function MainPage(){
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)
    const [open, setOpen] = useState(false)
    //Placeholder values
    const [tables, setTables] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13])
    const [orders, setOrders] = useState([{table: 5, waiter: 'alo'}, {table: 11}, {table: 2, waiter: 'ilopez', comment:'this is an order'}])

    useEffect( ()=> {
        if(user !== null){
            setView(user.role)
        } else {
            setView(null)
        }
    }, [user])

    return (
        <>
        <Navbar user={user} setUser={setUser} setOpen={setOpen} setView={setView} />
        <Container fluid>
            {setView === null || user === null &&
                <LoginForm setUser={setUser} /> 
            }
            {view === 'room' && <WaiterPage user={user} orders={orders} tables={tables} />}
            {view === 'kitchen' && <h1>kitchen</h1>}
            {view === 'admin' && <h1>Admin</h1>}
        </Container>
        <SelectViewModal open={open} setOpen={setOpen} setView={setView}/>
        </>
    )
}