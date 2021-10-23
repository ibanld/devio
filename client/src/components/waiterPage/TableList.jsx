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
    const newOrder = {
        customer: '',
        table: null,
        comment: '',
        products: [],
        total: 0
    }

    const { orders, myOrders, user } = useOrders()
    const dispatchOrders = useDispatchOrders()

    const getTableStatus = tableNumber => {
        if(orders.filter( order => order.table === tableNumber).length > 0) {
            if (myOrders.filter( order => order.table === tableNumber ).length > 0 ) {
                return false
            } else {
                return true
            }
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
            const addOrder = await API.post('/orders', {...newOrder, waiter: user.user, table: tableNumber})
            if (addOrder) {
                requestUpdate()
                dispatchOrders({
                    type: 'LOAD_ORDER',
                    payload: addOrder.data.data
                })
                setTimeout( ()=>{
                    dispatchOrders({
                        type: 'CURRENT_ORDERS'
                    })
                } , 300)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const loadOrder = async id => {
        try {
            const getOrder = await API.get(`/orders/${id}`)
            requestUpdate()
            if (getOrder) {
                dispatchOrders({
                    type: 'LOAD_ORDER',
                    payload: getOrder.data
                })
            }
        } catch (err) {
            console.error(err)
        }
    }
    
    const handleTableSelect = tableNumber => {
        if (myOrders.filter( isMyorder => isMyorder.table === tableNumber ).length > 0){
            let id = myOrders[0]._id
            console.log(tableNumber, id)
            loadOrder(id)
        } else {
            createOrder(tableNumber)
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
                    disabled={getTableStatus(table)}
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
