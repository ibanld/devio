import React, { useState, useEffect } from 'react'
import AddProduct from './AddProduct'
import AddInfo from './AddInfo'
import API from '../../utils/axiosUrl'
import OrderList from './OrderList'
import OrderPayment from './OrderPayment'
import { Divider, Container, Button } from 'semantic-ui-react'
import { useDispatchOrders, useOrders } from '../../context/ordersContext'

export default function OrderDetail() {
    const [showInfo, setShowInfo] = useState('order')
    
    const { order } = useOrders()
    const dispatchOrders = useDispatchOrders()

    const getOrder = async (id) => {
        try {
            const loadOrder = await API.get(`/orders/${id}`)
            if (loadOrder) {
                dispatchOrders({
                    type: 'LOAD_ORDER',
                    payload: loadOrder
                })
                
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect( ()=> {
        getOrder(order._id)
    }, [order])

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
            {myOrder === null ? 'loading' :
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
