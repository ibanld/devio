import React, { useEffect, useState } from 'react'
import { Divider, Button, Header } from 'semantic-ui-react'
import API from '../../utils/axiosUrl'
import requestUpdate from '../../utils/socketUpdate'
import { useDispatchAlert } from '../../context/alertsContenxt'
import getColor from '../../utils/getColor'

export default function MostSoldList({ products, order }) {
    const [mostSold, setMostSold] = useState([])

    const dispatchAlert = useDispatchAlert()

    const handleAdd = async product => {
        try {
            const putIntoOrder = {
                type: 'ADD_PRODUCT',
                product: {...product, ready: false, qty: 1}
            }
            if (product){
                const putOrder = await API.put(`/orders/${order._id}`, putIntoOrder)
                if (putOrder) {
                    requestUpdate()
                    dispatchAlert({
                        type: 'SHOW_ALERT',
                        payload: {
                            icon:'thumbs up',
                            header: 'Produto Adicionado!',
                            content: `${product.item} foi adicionado no pedido!`,
                            positive: true
                        }
                    })
                    setTimeout( ()=> dispatchAlert({type:'HIDE_ALERT'}) , 3000)
                }
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect( ()=> {
        const myProducts = products.filter( product => product.sold > 5).slice(0, 9)
        setMostSold(myProducts)
    }, [products])

    return (
        <>
            <Header as="h4">Top 10 Produtos mais vendidos</Header>
            {mostSold.length > 0 &&
                mostSold.map( product => 
                    <div key={product._id}>
                        <Button
                            type="button"
                            icon="add circle"
                            color={getColor(product.family)}
                            fluid
                            onClick={ ()=> handleAdd(product)}
                            content={`${product.item} foi vendido ${product.sold} vezes || Preço: R$ ${product.price}`}
                        />    
                        <Divider />
                    </div>
                )
            }
        </>
    )
}
