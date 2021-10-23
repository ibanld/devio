import React from 'react'
import TableList from '../components/waiterPage/TableList'
import InfoPanel from '../components/waiterPage/InfoPanel'
import { useOrders } from '../context/ordersContext'
import OrderDetail from '../components/waiterPage/OrderDetail'

function WaiterPage({ tables }) {

    const { order } = useOrders()

    return (
        <div>
            <TableList tables={tables} />
            {order.hasOwnProperty('_id') ? <OrderDetail /> : <InfoPanel />}
        </div>
    )
}

export default WaiterPage
