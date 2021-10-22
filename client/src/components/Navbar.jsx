import React, { useState } from 'react'
import { Menu, Icon, Button } from 'semantic-ui-react'

export default function Navbar({ user, setUser }) {

    const handleLogout = () => {
        setUser(null)
    }

    return (
        <Menu inverted>
            <Menu.Item>Ristorante Cinque Terre</Menu.Item>
            {user !== null && 
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Icon
                            name="user"
                        />
                        {user.fullName}
                    </Menu.Item>
                    <Menu.Item>
                        <Button
                            basic
                            inverted
                            compact
                            type="button"
                            icon="sign-out"
                            content="Sair"
                            onClick={handleLogout}
                        />
                    </Menu.Item>
                </Menu.Menu>
            }
        </Menu>
    )
}
