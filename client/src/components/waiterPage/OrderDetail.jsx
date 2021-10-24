import React, { useState, useEffect } from 'react'
import AddProduct from './AddProduct'
import API from '../../utils/axiosUrl'
import AddInfo from './AddInfo'
import OrderList from './OrderList'
import OrderPayment from './OrderPayment'
import { Divider, Container, Button } from 'semantic-ui-react'
import { useOrders } from '../../context/ordersContext'

export default function OrderDetail() {
    const [showInfo, setShowInfo] = useState('order')
    const [myOrder, setMyOrder] = useState({})

    // Get order and refresh status from global state context provider
    const { order, refresh } = useOrders()
    
    // Get Single Orders from API endpoint using ID from global context provider
    const loadOrder = async () => {
        try {
            const getOrder = await API.get(`/orders/${order._id}`)
            if (getOrder) {
                setMyOrder(getOrder.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // Reload order when socket server emits Re-Fetch command or order changes
    useEffect( ()=> loadOrder(order._id), [order, refresh])

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
                    {showInfo === 'info' && <AddInfo order={myOrder} />}
                    {showInfo === 'order'&& <OrderList order={myOrder} />}
                    {showInfo === 'add' && <AddProduct order={myOrder} />}
                    {showInfo === 'payment' && <OrderPayment order={myOrder} /> }
                </>
            }
        </Container>
        </>
    )
}
