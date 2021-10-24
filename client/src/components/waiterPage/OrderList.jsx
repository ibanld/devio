import { useState, useEffect } from 'react'
import API from '../../utils/axiosUrl'
import { useDispatchAlert } from '../../context/alertsContenxt'
import { Table, Button } from 'semantic-ui-react'
import requestRefresh from '../../utils/socketUpdate'

export default function OrderList({ order }) {

    const dispatchAlert = useDispatchAlert()

    const handleDelete = async id => {
        try {
            const deleteProduct = await API.put(`/orders/${order._id}`, {type: 'DELETE_PRODUCT', productId: id})
            if (deleteProduct) {
                requestRefresh()
                dispatchAlert({
                    type: 'SHOW_ALERT',
                    payload: {
                        icon:'thumbs up',
                        header: 'Pedido Excluido',
                        content: `Pedido ${id} foi excluido!`,
                        positive: false
                    }
                })
                setTimeout( ()=> dispatchAlert({type:'HIDE_ALERT'}) , 3000)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleSumProduct = async product => {
        try {
            const addOne = await API.put(`/orders/${order._id}`, { type: 'UPDATE_PRODUCT_QTY',productId: product._id, qty: product.qty + 1 })
            if (addOne) {
                requestRefresh()
                dispatchAlert({
                    type: 'SHOW_ALERT',
                    payload: {
                        icon:'add circle',
                        header: 'Produto Adicionado',
                        content: `Mais um ${product.item} foi adicionado`,
                        positive: true
                    }
                })
                setTimeout( ()=> dispatchAlert({type:'HIDE_ALERT'}) , 3000)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleRemoveOneProduct = async product => {
        try {
            const removeOne = await API.put(`/orders/${order._id}`, { type: 'UPDATE_PRODUCT_QTY', productId: product._id, qty: product.qty - 1 })
            if (removeOne) {
                if (product.qty - 1 < 1){
                    handleDelete(product._id)
                }
                requestRefresh()
                dispatchAlert({
                    type: 'SHOW_ALERT',
                    payload: {
                        icon:'minus circle',
                        header: 'Produto Excluido',
                        content: `Um ${product.item} foi exlcuido`,
                        positive: false
                    }
                })
                setTimeout( ()=> dispatchAlert({type:'HIDE_ALERT'}) , 3000)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
        <h5>Mesa {order.table} > R$ {parseFloat(order.total)} > Para {order.customer} || {order.comment} </h5>  
        {order.hasOwnProperty('products') && 
            <Table selectable singleLine unstackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            Produto
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Preço
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Quantidade
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Valor Total
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Editar
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Excluir
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {order.products.length > 0 &&
                        order.products.map( product => 
                            <Table.Row key={product._id} positive={product.ready}>
                                <Table.Cell>({product.ref}){product.item}</Table.Cell>
                                <Table.Cell>R$ {parseFloat(product.price).toFixed(2)}</Table.Cell>
                                <Table.Cell>{product.qty}</Table.Cell>
                                <Table.Cell>R$ {parseFloat(product.qty*product.price).toFixed(2)}</Table.Cell>
                                <Table.Cell>
                                    <Button.Group compact>
                                        <Button 
                                            type="button"
                                            color="green"
                                            icon="add circle"
                                            onClick={ () => handleSumProduct(product) }
                                        />
                                        <Button 
                                            type="button"
                                            color="yellow"
                                            icon="minus circle"
                                            onClick={ ()=> handleRemoveOneProduct(product) }
                                        />
                                    </Button.Group>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button
                                        compact
                                        type="button"
                                        negative
                                        icon="trash"
                                        onClick={ ()=> handleDelete(product._id)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        )}
                </Table.Body>
            </Table>
        }
        </>
    )
}
