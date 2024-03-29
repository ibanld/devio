import { useState, useEffect } from 'react'
import API from '../../utils/axiosUrl'
import { Button } from 'semantic-ui-react'
import requestUpdate from '../../utils/socketUpdate'
import { useOrders, useDispatchOrders } from '../../context/ordersContext'

// CSS style for table component
const styles = {
    width: '100vw',
    display: 'flex',
    height: '100%',
    overflowX: 'scroll'
}

export default function TableList({ tables }) {
    const [allTables, setAllTables] = useState([])
    // New order form state component
    const newOrder = {
        customer: '',
        table: null,
        comment: '',
        products: [],
        total: 0
    }
    // Retrieve orders and user global state from Context provider
    const { orders, user } = useOrders()
    // Orders dispatcher for context (redux alike) 
    const dispatchOrders = useDispatchOrders()

    // Function to create new order when tapping on order number
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

    // Load order when tapping on User filtered tables
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
    
    // function to check if table is busy or not, if table has _id property load order
    //  if doesnt have _id property create new order
    const handleTableSelect = isBusy => {
        if (isBusy._id){
            let id = isBusy._id
            loadOrder(id)
        } else {
            createOrder(isBusy.table)
        }
    }

    // User orders and tables list to filter tables and check which one are free, busy or belong to user
    useEffect( ()=> {
        const busyTables = []
        const emptyTables = []
        const currentOrders = orders.filter(order => !order.payment)

        currentOrders.map( order => busyTables.push({ ...order, disabled: order.waiter === user.user ? false : true,  color: order.waiter === user.user ? 'blue' : 'red' }))
        
        tables.map( table => busyTables.filter( busy => busy.table === table).length < 1 && emptyTables.push({table: table, color: 'green', disabled: false}))
        
        setAllTables(busyTables.concat(emptyTables))
    }, [orders, tables])

    return (
        <>
        <h5>Lista de Mesas</h5>
        <div style={styles}>
            {allTables.length < 1 ? 'carregando mesas' :
             allTables.map( (table, i) => 
                <Button 
                    key={table.table}
                    color={table.color}
                    disabled={table.disabled}
                    type="button"
                    circular
                    content={table.table}
                    compact
                    onClick={()=> handleTableSelect(table)}
                />
            )}
        </div>
        </>
    )
}
