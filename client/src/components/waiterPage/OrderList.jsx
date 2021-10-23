import { useState, useEffect } from 'react'
import API from '../../utils/axiosUrl'
import requestUpdate from '../../utils/socketUpdate'
import { useOrders } from '../../context/ordersContext'
import { Table, Button } from 'semantic-ui-react'

export default function OrderList() {
    const [thisOrder, setThisOrder] = useState({})
    const { order } = useOrders()

    const handleDelete = async id => {
        try {
            const deleteProduct = await API.put(`/orders/${id}`, {type: 'DELETE_PRODUCT', productId: id})
            if (deleteProduct) {
                requestUpdate()
                console.log(deleteProduct.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect( ()=> {
        setThisOrder(order)
    }, [order])

    return (
        <>
        <h5>Mesa {thisOrder.table} > R$ {parseFloat(thisOrder.total)} > Para {thisOrder.customer} || {thisOrder.comment} </h5>  
        {thisOrder.hasOwnProperty('products') && 
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
                            Editar
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Excluir
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {thisOrder.products.length > 0 &&
                        thisOrder.products.map( product => 
                            <Table.Row key={product._id} positive={product.ready}>
                                <Table.Cell>({product.ref}){product.item}</Table.Cell>
                                <Table.Cell>R$ {product.price}</Table.Cell>
                                <Table.Cell>{product.qty}</Table.Cell>
                                <Table.Cell>
                                    <Button.Group compact>
                                        <Button 
                                            type="button"
                                            color="green"
                                            icon="add circle"
                                            
                                        />
                                        <Button 
                                            type="button"
                                            color="yellow"
                                            icon="minus circle"
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
