import React, { useState, useEffect } from 'react'
import TableList from '../components/waiterPage/TableList'

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
            <h2>placeholder new order / edit order</h2>
        </div>
    )
}

export default WaiterPage
