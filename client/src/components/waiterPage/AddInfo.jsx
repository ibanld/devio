import React, { useState } from 'react'
import API from '../../utils/axiosUrl'
import { Form } from 'semantic-ui-react'

export default function AddInfo({ order }) {
    const [form, setForm] = useState({
        customer: order.customer,
        comment: ''
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
                console.log(updateOrder.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
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
    )
}
