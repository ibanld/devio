import { useReducer, useContext, createContext } from 'react'

const OrdersStateContext = createContext()
const OrdersDispatchContext = createContext()

const initialState = {
    orders: [],
    order: {},
    user: {},
    myOrders: [],
    logged: false,
    loading: true,
    refresh: false
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case 'LOAD_ORDERS':
            return {
                ...state,
                orders: payload,
                loading: false,
            }
        case 'LOAD_ORDER': 
            return {
                ...state,
                loading: false,
                order: payload
            }
        case 'CURRENT_ORDERS':
            const myOrders = state.orders.filter( order => order.waiter === state.user.user )
            const currentOrders = myOrders.filter( order => order.payment === false)
            return {
                ...state,
                myOrders: currentOrders
            }
        case 'LOG_IN':
            return {
                ...state,
                order: {
                    ...state.order,
                    waiter: payload.user,
                },
                user: payload,
                logged: true
            }
        case 'LOG_OUT':
            return {
                ...state,
                loading: false,
                logged: false,
                user: {}
            }
        case 'RE_FETCH':
            return {
                ...state,
                loading: false,
                refresh: !state.refresh
            }
        default:
            throw new Error(`Unknown action: ${action.type}`)
    }
}

export const OrdersProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <OrdersDispatchContext.Provider value={dispatch}>
            <OrdersStateContext.Provider value={state}>
                {children}
            </OrdersStateContext.Provider>
        </OrdersDispatchContext.Provider>
    )
}

export const useOrders = () => useContext(OrdersStateContext)
export const useDispatchOrders = () => useContext(OrdersDispatchContext)