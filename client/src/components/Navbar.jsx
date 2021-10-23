import { Menu, Icon, Button } from 'semantic-ui-react'
import { useOrders, useDispatchOrders } from '../context/ordersContext'

export default function Navbar({ setOpen, setView }) {

    const { user, logged } = useOrders()
    const dispatchOrder = useDispatchOrders()

    const handleLogout = () => {
        setView(null)
        dispatchOrder({
            type: 'LOG_OUT'
        })    
    }

    return (
        <Menu inverted>
            <Menu.Item>Ristorante Cinque Terre</Menu.Item>
            {logged && 
                <Menu.Menu position="right">
                    <Menu.Item onClick={ () => setOpen(true)}>
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
