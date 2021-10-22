import React from 'react'
import AddProduct from './AddProduct'
import { Divider, Container } from 'semantic-ui-react'

export default function OrderDetail({ order }) {
    return (
        <>
        <Divider />
        <Container fluid>
            breadcrumb with order info
            <AddProduct order={order} />
        </Container>
        </>
    )
}
