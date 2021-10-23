import React, { useState, useEffect } from 'react'
import TableList from '../components/waiterPage/TableList'
import InfoPanel from '../components/waiterPage/InfoPanel'
import { useOrders } from '../context/ordersContext'
import OrderDetail from '../components/waiterPage/OrderDetail'

function WaiterPage({ tables }) {

    const { myOrders } = useOrders()

    return (
        <div>
            <TableList tables={tables} />
            {myOrders.length < 1 ?
                <InfoPanel /> :
                <OrderDetail />
            }
        </div>
    )
}

export default WaiterPage
