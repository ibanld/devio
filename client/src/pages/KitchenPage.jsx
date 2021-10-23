import React, { useState, useEffect } from 'react'
import API from '../utils/axiosUrl'
import { useOrders, useDispatchOrders } from '../context/ordersContext'
import { Container, Header, Divider, Button } from 'semantic-ui-react'

export default function KitchenPage() {
    const [products, setProducts] = useState([])
    const { orders } = useOrders()

    useEffect( ()=> {
        if (orders.length > 0) {
            const getProducts = []
            orders.map( order => order.products.map( product => getProducts.push({_id: order._id, customer: order.customer, table: order.table, ...product})))
            if (getProducts.length > 0) {
                const pending = getProducts.filter( product => !product.ready)
                setProducts(pending)
                console.log(products)
            }
        }
    }, [orders])

    const handleReady = () => {
        console.log('product ready')
    }

    return (
        <Container fluid>
            <Header as="h5">Lista de Produtos para Cozinhar</Header>
            <Divider />
            {products.length > 0 ?
                products.map( product => 
                    <>
                    <Button 
                        key={product._id}
                        type="button"
                        fluid
                        size="massive"
                        content={`Mesa ${product.table} de ${product.customer} || ${product.item.toUpperCase()} || Quantidade: ${product.qty}`}
                        color="green"
                        onClick={ ()=> handleReady()}
                    /> 
                    <Divider />
                    </>
                    ):'Nao ha pedidos pendientes'
            }
        </Container>
    )
}
