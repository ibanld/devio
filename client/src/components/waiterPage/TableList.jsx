import React from 'react'
import API from '../../utils/axiosUrl'
import { Button } from 'semantic-ui-react'
import requestUpdate from '../../utils/socketUpdate'
import { useOrders, useDispatchOrders } from '../../context/ordersContext'

const styles = {
    width: '100vw',
    display: 'flex',
    height: '100%',
    overflowX: 'scroll'
}

export default function TableList({ tables }) {

    const { orders, myOrders, order } = useOrders()
    const dispatchOrders = useDispatchOrders()

    const getTableStatus = tableNumber => {
        if(orders.filter( order => order.table === tableNumber).length < 1 || myOrders.filter( order => order.table === tableNumber ).length > 0)  {
            return true
        } else {
            return false
        }
    } 

    const getTableColor = tableNumber => {
        if (orders.filter( order => order.table === tableNumber).length < 1) {
            return 'green'
        } else if (myOrders.filter( order => order.table === tableNumber ).length > 0) {
            return 'blue'
        } else {
            return 'red'
        }
    }

    const createOrder = async tableNumber => {
        try {
            const addOrder = await API.post('/orders', {...order, table: tableNumber})
            if (addOrder) {
                requestUpdate()
                dispatchOrders({
                    type: '',
                    payload: addOrder.data.data
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    const loadOrder = async id => {
        try {
            const getOrder = await API.get(`/orders/${id}`)
            if (getOrder) {
                console.log(getOrder)
                dispatchOrders({
                    type: '',
                    payload: getOrder
                })
            }
        } catch (err) {
            console.error(err)
        }
    }
    
    const handleTableSelect = table => {
        const myOrder = orders.filter( order => order.table === table)
        if(myOrder.length > 0) {
            const id = myOrder[0]._id
            loadOrder(id)
        } else {
            dispatchOrders({
                type: '',
                payload: { ...order, table: table }
            })
            if (order.table !== null) {
                createOrder(table)
            }
        }
    }

    return (
        <>
        <h5>Lista de Mesas</h5>
        <div style={styles}>
            {tables.map( (table, i) => 
                <Button 
                    key={i}
                    color={getTableColor(table)}
                    disabled={!getTableStatus(table)}
                    type="button"
                    circular
                    content={table}
                    compact
                    onClick={()=> handleTableSelect(table)}
                />
            )}
        </div>
        </>
    )
}
