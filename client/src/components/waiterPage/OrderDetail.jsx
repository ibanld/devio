import React, { useState } from 'react'
import AddProduct from './AddProduct'
import AddInfo from './AddInfo'
import OrderList from './OrderList'
import OrderPayment from './OrderPayment'
import { Divider, Container, Button } from 'semantic-ui-react'
import { useOrders } from '../../context/ordersContext'

export default function OrderDetail() {
    const [showInfo, setShowInfo] = useState('order')
    
    const { order } = useOrders()
    
    return (
        <>
        <Divider />
        <Container fluid>
            <Button.Group fluid>
                <Button 
                    color="purple"
                    compact
                    type="button"
                    content="Ver"
                    onClick={ ()=> setShowInfo('order') }
                />
                <Button 
                    color="green"
                    compact
                    type="button"
                    content="Adicionar"
                    onClick={ ()=> setShowInfo('add') }
                />
                <Button 
                    primary
                    compact
                    type="button"
                    content="Editar"
                    onClick={ ()=> setShowInfo('info') }
                />
                <Button 
                    color="orange"
                    compact
                    type="button"
                    content="Pagar"
                    onClick={  ()=> setShowInfo('payment') }
                />
            </Button.Group>
            <Divider />
            {order.table === null ? 'loading' :
                <>
                    {showInfo === 'info' && <AddInfo order={order} />}
                    {showInfo === 'order'&& <OrderList order={order} />}
                    {showInfo === 'add' && <AddProduct order={order} />}
                    {showInfo === 'payment' && <OrderPayment order={order} /> }
                </>
            }
        </Container>
        </>
    )
}
