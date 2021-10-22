import { useState, useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import Navbar from '../components/Navbar'
import { Container } from 'semantic-ui-react'

export default function MainPage(){
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)

    useEffect( ()=> {
        if(user !== null){
            user.role === 'admin' && setView('admin')
            user.role === 'kitchen' && setView('kitchen')
            user.role === 'room' && setView('room')
        } else {
            setView(null)
        }
    }, [user])

    return (
        <>
        <Navbar user={user} setUser={setUser} />
        <Container fluid>
            {user === null &&
                <LoginForm setUser={setUser} /> 
            }
            {view === 'admin' && <h1>Admin</h1>}
            {view === 'kitchen' && <h1>kitchen</h1>}
            {view === 'room' && <h1>Room</h1>}
        </Container>
        </>
    )
}