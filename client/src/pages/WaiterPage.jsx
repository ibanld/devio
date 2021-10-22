import React, { useState, useEffect } from 'react'
import TableList from '../components/waiterPage/TableList'
import InfoPanel from '../components/waiterPage/InfoPanel'
import OrderDetail from '../components/waiterPage/OrderDetail'

function WaiterPage({ user, orders, tables }) {
    const [order, setOrder] = useState({
        waiter: user.user,
        customer: '',
        table: null,
        comment: '',
        products: [],
        total: 0
    })
    const [userOrders, setUserOrders] = useState([])

    useEffect( ()=> {
        const myOrders = orders.filter( order => order.waiter === user.user )
        if(myOrders.length > 0) {
            setUserOrders(myOrders)
        }
    }, [orders, user])


    return (
        <div>
            <TableList 
                order={order} 
                setOrder={setOrder} 
                tables={tables} 
                orders={orders} 
                userOrders={userOrders}
            />
            {order.table === null ?
                <InfoPanel /> :
                <OrderDetail order={order} setOrder={setOrder} />
            }
        </div>
    )
}

export default WaiterPage
