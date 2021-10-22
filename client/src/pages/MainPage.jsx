import { useState, useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import LoginForm from '../components/LoginForm'

export default function MainPage(){
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)

    useEffect( ()=> {
        if(user !== null){
            user.role === 'admin' && setView('admin')
            user.role === 'kitchen' && setView('kitchen')
            user.role === 'room' && setView('room')
        }
    }, [user])

    return (
        <Container fluid>
            {user === null &&
                <LoginForm setUser={setUser} /> 
            }
            {view === 'admin' && <h1>Admin</h1>}
            {view === 'kitchen' && <h1>kitchen</h1>}
            {view === 'room' && <h1>Room</h1>}
        </Container>
    )
}