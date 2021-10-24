import React, { useState } from 'react'
import API from '../../utils/axiosUrl'
import { useDispatchOrders } from '../../context/ordersContext'
import { useDispatchAlert } from '../../context/alertsContenxt'
import requestRefresh from '../../utils/socketUpdate'
import { Form, Divider, Button } from 'semantic-ui-react'

export default function AddInfo({ order }) {
    const [form, setForm] = useState({
        customer: order.customer,
        comment: order.comment
    })

    // Alert and Orders dispatcher for context (redux alike) 
    const dispatchOrders = useDispatchOrders()
    const dispatchAlert = useDispatchAlert()

    // Function to handle controller form fields
    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    // Update order Customer name and comment by calling ORDERS endpoint with PUT operation on API
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const updateOrder = await API.put(`/orders/${order._id}`, {type: 'UPDATE_INFO', data: form})
            if (updateOrder) {
                requestRefresh()
                dispatchOrders({
                    type: 'LOAD_ORDER',
                    payload: {
                        ...order,
                        ...updateOrder.data.data
                    }
                })
                dispatchAlert({
                    type: 'SHOW_ALERT',
                    payload: {
                        icon:'info',
                        header: 'Pedido Atualizado',
                        content: `Informaçao para pedido ${order._id} foi atualizada!`,
                        positive: true
                    }
                })
                setTimeout( ()=> dispatchAlert({type:'HIDE_ALERT'}) , 3000)
            }
        } catch (err) {
            console.error(err)
        }
    }

    // Delete order by calling ORDER endpoint and set order global state to empty to show Info component
    const handleDelete = async id => {
        try {
            const delItem = await API.delete(`/orders/${id}`)
            if (delItem) {
                requestRefresh()
                dispatchOrders({
                    type: 'LOAD_ORDER',
                    payload: {}
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
        <Form onSubmit={e => handleSubmit(e) }>
            <Form.Group widths="equal">
                <Form.Input 
                    label="Nome do Cliente"
                    type="text"
                    name="customer"
                    placeholder="Digite o nome do cliente"
                    value={form.customer}
                    onChange={ e => handleChange(e) }
                />  
                <Form.Input 
                    label="Comentario"
                    type="text"
                    name="comment"
                    placeholder="Digite um comentario sobre o pedido"
                    value={form.comment}
                    onChange={ e => handleChange(e) }
                    />  
            </Form.Group>
            <Form.Button 
                primary
                fluid
                type="submit"
                icon="comment"
                content="Atualizar Informaçao"
            />
        </Form>
        <Divider />
        <Button 
            type="button"
            icon="trash"
            content="Excluir Pedido"
            onClick={ ()=> handleDelete(order._id)}
            negative
            fluid
        />
    </>
    )
}
