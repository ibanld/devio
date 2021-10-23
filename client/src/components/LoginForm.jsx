import React, { useState, useEffect } from 'react'
import API from '../utils/axiosUrl'
import { useOrders, useDispatchOrders } from '../context/ordersContext'
import { Card, Button, Input } from 'semantic-ui-react'

export default function LoginForm({ setView }) {
    const [formUser, setUserForm] = useState({
        user: '',
        password: ''
    })

    const { logged, orders, user } = useOrders
    const dispatchOrders = useDispatchOrders()

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
                }
            }
        } catch (err) {
            console.error(err.message)
        }
    }


    useEffect(() => {
        if (logged) {
            const myOrders = orders.filter( order => order.waiter === user.user )
            const currentOrders = myOrders.filter( order => order.payment === false)
            if (currentOrders.length > 0) {
                dispatchOrders({
                    type: 'CURRENT_ORDERS',
                    payload: currentOrders
                })
            }
        }
    }, [logged])

    return (
        <Card centered>
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
