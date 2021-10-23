import React, { useState, useEffect } from 'react'
import TableList from '../components/waiterPage/TableList'
import InfoPanel from '../components/waiterPage/InfoPanel'
import { useOrders } from '../context/ordersContext'
import OrderDetail from '../components/waiterPage/OrderDetail'

function WaiterPage({ tables }) {

    const { myOrders } = useOrders()

    // const myOrders = orders.filter( order => order.waiter === user.user )

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
