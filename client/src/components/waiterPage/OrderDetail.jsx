import React from 'react'

export default function OrderDetail({ order, setOrder }) {
    return (
        <div>
            {order.waiter}
            {order.table}
            R$ {order.total}
        </div>
    )
}
