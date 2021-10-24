import React, { useState, useEffect } from 'react'
import API from '../utils/axiosUrl'
import { useOrders } from '../context/ordersContext'
import requestRefresh from '../utils/socketUpdate'

import { Container, Header, Divider, Button } from 'semantic-ui-react'

export default function KitchenPage() {
    // State to set pending orders individually
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])

    // Get orders from global state Context (redux alikes)
    const { refresh } = useOrders()

    // Get All Orders from API endpoint
    const loadOrders = async () => {
        try {
            const getOrders = await API.get('/orders')
            if (getOrders) {
                setOrders(getOrders.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // Call orders loader every time refresh (socket server call) or orders are invoked
    useEffect( ()=> loadOrders(), [refresh, orders])

    useEffect( ()=> {
        if (orders.length > 0) {
            const getProducts = []
            // Map though all orders and add products to array by mapping on products for each order
            orders.map( order => order.products.map( product => getProducts.push({orderId: order._id, customer: order.customer, table: order.table, comment: order.comment, ...product})))
            if (getProducts.length > 0) {
                // Filter all pending products
                const pending = getProducts.filter( product => !product.ready)
                setProducts(pending)
            }
        }
        // Update products everytime live server receives an update on ORDERS and socket emit the RE-Fetch order
    }, [orders, refresh])
// Function to handle products when are ready
    const handleReady = async (product) => {
        const {orderId, _id} = product
        try {
            // PUT into orders endpoint with ID and action type to set the product as READY
            const orderComplete = await API.put(`/orders/${orderId}`, {type: 'PRODUCT_READY', productId: _id})
            if (orderComplete) {
                // If success the socket will update the orders state in real time
                requestRefresh()
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Container fluid>
            <Header as="h5">Lista de Produtos para Cozinhar</Header>
            <Divider />
            {products.length > 0 ?
                products.map( product => 
                    <div key={product.orderId+product._id}>
                    <Button 
                        type="button"
                        fluid
                        size="massive"
                        content={`Mesa ${product.table} de ${product.customer} || ${product.item.toUpperCase()} || Quantidade: ${product.qty} || ${product.comment}`}
                        color="green"
                        onClick={ ()=> handleReady(product)}
                    /> 
                    <Divider />
                    </div>
                    ):'Nao ha pedidos pendientes'
            }
        </Container>
    )
}
