import React from 'react'
import API from '../../utils/axiosUrl'
import { Button } from 'semantic-ui-react'
import requestUpdate from '../../utils/socketUpdate'

const styles = {
    width: '100vw',
    display: 'flex',
    height: '100%',
    overflowX: 'scroll'
}

export default function TableList({ orders, order, setOrder, tables, userOrders }) {

    const getTableStatus = tableNumber => {
        if(orders.filter( order => order.table === tableNumber).length < 1 || userOrders.filter( order => order.table === tableNumber ).length > 0)  {
            return true
        } else {
            return false
        }
    } 

    const getTableColor = tableNumber => {
        if (orders.filter( order => order.table === tableNumber).length < 1) {
            return 'green'
        } else if (userOrders.filter( order => order.table === tableNumber ).length > 0) {
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
                setOrder(addOrder.data.data)
            }
        } catch (err) {
            console.error(err)
        }
    }
    
    const handleTableSelect = table => {
        const myOrder = orders.filter( order => order.table === table)
        if(myOrder.length > 0) {
            setOrder(myOrder[0])
        } else {
            setOrder({ ...order, table: table })
            createOrder(table)
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
