import React, { useState, useEffect } from 'react'
import API from '../../utils/axiosUrl'
import AddProduct from './AddProduct'
import AddInfo from './AddInfo'
import OrderList from './OrderList'
import OrderPayment from './OrderPayment'
import { Divider, Container, Button } from 'semantic-ui-react'
import { useOrders } from '../../context/ordersContext'

export default function OrderDetail() {
    const [showInfo, setShowInfo] = useState('order')
    const [myOrder, setMyOrder] = useState({})
    const { order, orders } = useOrders()
    
    const getMyOrder = async id => {
        try {
            const getOrder = await API.get(`/orders/${id}`)
            if (getOrder) {
                setMyOrder(getOrder.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect( ()=> {
        getMyOrder(order._id)
        console.log('re-rendered')
    }, [orders, order])

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
            {myOrder.table === null ? 'loading' :
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
