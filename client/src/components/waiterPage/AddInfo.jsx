import React, { useState } from 'react'
import API from '../../utils/axiosUrl'
import requestUpdate from '../../utils/socketUpdate'
import { Form, Divider, Button } from 'semantic-ui-react'

export default function AddInfo({ order }) {
    const [form, setForm] = useState({
        customer: order.customer,
        comment: order.comment
    })

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const updateOrder = await API.put(`/orders/${order._id}`, {type: 'UPDATE_INFO', data: form})
            if (updateOrder) {
                requestUpdate()
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async id => {
        try {
            const delItem = await API.delete(`/orders/${id}`)
            if (delItem) {
                console.log(delItem.data.message)
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
