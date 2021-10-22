import { useState, useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import Navbar from '../components/Navbar'
import { Container } from 'semantic-ui-react'
import SelectViewModal from '../components/SelectViewModal'

export default function MainPage(){
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect( ()=> {
        if(user !== null){
            setView(user.role)
        } else {
            setView(null)
        }
    }, [user])

    return (
        <>
        <Navbar user={user} setUser={setUser} setOpen={setOpen} />
        <Container fluid>
            {user === null &&
                <LoginForm setUser={setUser} /> 
            }
            {view === 'admin' && <h1>Admin</h1>}
            {view === 'kitchen' && <h1>kitchen</h1>}
            {view === 'room' && <h1>Room</h1>}
        </Container>
        <SelectViewModal open={open} setOpen={setOpen} setView={setView}/>
        </>
    )
}