import React from 'react'
import AddProduct from './AddProduct'
import AddInfo from './AddInfo'
import { Divider, Container } from 'semantic-ui-react'


export default function OrderDetail({ order }) {

    return (
        <>
        <Divider />
        <Container fluid>
            <h5>Mesa {order.table} > R$ {parseFloat(order.total)} > Para {order.customer}</h5>
            <AddInfo order={order}/>
            <AddProduct order={order} />
        </Container>
        </>
    )
}
