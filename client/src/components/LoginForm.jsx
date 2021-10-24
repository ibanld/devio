import React, { useState } from 'react'
import API from '../utils/axiosUrl'
import { useDispatchOrders } from '../context/ordersContext'
import { useDispatchAlert } from '../context/alertsContenxt'
import { Card, Button, Input, Image } from 'semantic-ui-react'

export default function LoginForm({ setView }) {
    const [formUser, setUserForm] = useState({
        user: '',
        password: ''
    })

    const dispatchOrders = useDispatchOrders()
    const dispatchAlert = useDispatchAlert()

    const handleChange = e => {
        setUserForm({
            ...formUser,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async () => {
        try {
            const login = await API.post('/users/login', formUser)
            if (login) {
                const { message, data } = login.data
                if (data) {
                    dispatchOrders({
                        type: 'LOG_IN',
                        payload: data
                    })             
                    dispatchOrders({
                        type: 'CURRENT_ORDERS'
                    })
                    setView(data.role)  
                } else {
                    dispatchAlert({
                        type: 'SHOW_ALERT',
                        payload: {
                            icon:'info',
                            header: 'Algo nao deu certo!',
                            content: message,
                            positive: false
                        }
                    })
                    setTimeout( ()=> dispatchAlert({type:'HIDE_ALERT'}) , 3000)
                }
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Card centered>
            <Image src='logo.png' wrapped />
            <Card.Content>
                <Card.Header>
                    Acesso
                </Card.Header>
                <Input 
                    type="text"
                    placeholder="Digite usuário"
                    name="user"
                    value={formUser.user}
                    focus
                    icon="user"
                    iconPosition="left"
                    fluid
                    onChange={ e => handleChange(e) }
                />
                <Input 
                    type="password"
                    placeholder="Digite senha"
                    name="password"
                    value={formUser.password}
                    focus
                    icon="lock"
                    iconPosition="left"
                    fluid
                    onChange={ e => handleChange(e) }
                />
            </Card.Content>
            <Card.Description>
                <Button 
                    positive
                    fluid
                    type="button"
                    icon="send"
                    content="Fazer Login"
                    onClick={handleLogin}
                />
                
            </Card.Description>
        </Card>
    )
}
