import React, { useState } from 'react'
import API from '../utils/axiosUrl'
import { Card, Button, Input } from 'semantic-ui-react'

export default function LoginForm({ setUser }) {
    const [formUser, setUserForm] = useState({
        user: '',
        password: ''
    })

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
                    setUser(data)
                }
            }
        } catch (err) {
            console.error(err.message)
        }
    }
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
