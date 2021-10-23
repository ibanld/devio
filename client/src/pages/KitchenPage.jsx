import React, { useState, useEffect } from 'react'
import API from '../utils/axiosUrl'
import requestUpdate from '../utils/socketUpdate'
import { useOrders } from '../context/ordersContext'
import { Container, Header, Divider, Button } from 'semantic-ui-react'

export default function KitchenPage() {
    // State to set pending orders individually
    const [products, setProducts] = useState([])

    // Get orders from global state Context (redux alikes)
    const { orders } = useOrders()

    useEffect( ()=> {
        if (orders.length > 0) {
            const getProducts = []
            // Map though all orders and add products to array by mapping on products for each order
            orders.map( order => order.products.map( product => getProducts.push({orderId: order._id, customer: order.customer, table: order.table, ...product})))
            if (getProducts.length > 0) {
                // Filter all pending products
                const pending = getProducts.filter( product => !product.ready)
                setProducts(pending)
            }
        }
        // Update products everytime live server receives an update on ORDERS
    }, [orders])
// Function to handle products when are ready
    const handleReady = async (product) => {
        const {orderId, _id} = product
        try {
            // PUT into orders endpoint with ID and action type to set the product as READY
            const orderComplete = await API.put(`/orders/${orderId}`, {type: 'PRODUCT_READY', productId: _id})
            if (orderComplete) {
                // If success the socket will update the orders state in real time
                requestUpdate()
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
                    <div key={product.orderId}>
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
