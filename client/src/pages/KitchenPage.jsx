import React, { useState, useEffect } from 'react'
import API from '../utils/axiosUrl'
import requestUpdate from '../utils/socketUpdate'
import { useOrders } from '../context/ordersContext'
import { Container, Header, Divider, Button } from 'semantic-ui-react'

export default function KitchenPage() {
    const [products, setProducts] = useState([])
    const { orders } = useOrders()

    useEffect( ()=> {
        if (orders.length > 0) {
            const getProducts = []
            orders.map( order => order.products.map( product => getProducts.push({orderId: order._id, customer: order.customer, table: order.table, ...product})))
            if (getProducts.length > 0) {
                const pending = getProducts.filter( product => !product.ready)
                setProducts(pending)
            }
        }
    }, [orders])

    const handleReady = async (product) => {
        const {orderId, _id} = product
        try {
            const orderComplete = await API.put(`/orders/${orderId}`, {type: 'PRODUCT_READY', productId: _id})
            if (orderComplete) {
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
