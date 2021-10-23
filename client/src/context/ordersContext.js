import { useReducer, useContext, createContext } from 'react'

const OrdersStateContext = createContext()
const OrdersDispatchContext = createContext()

const initialState = {
    orders: [],
    order: {},
    loading: true
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