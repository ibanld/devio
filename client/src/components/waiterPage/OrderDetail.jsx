import React from 'react'
import AddProduct from './AddProduct'
import { Divider, Container } from 'semantic-ui-react'


export default function OrderDetail({ order }) {

    return (
        <>
        <Divider />
        <Container fluid>
            <h5>Mesa {order.table} > R$ {parseFloat(order.total)} > Para {order.customer}</h5>
            
            <AddProduct order={order} />
        </Container>
        </>
    )
}
