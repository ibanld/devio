import React from 'react'
import { Button } from 'semantic-ui-react'

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
    
    const handleTableSelect = table => {
        const myOrder = orders.filter( order => order.table === table)
        if(myOrder.length > 0) {
            setOrder(myOrder[0])
        } else {
            setOrder({ ...order, table: table })
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
