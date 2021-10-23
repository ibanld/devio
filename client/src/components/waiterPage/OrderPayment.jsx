import React, { useState } from 'react'
import API from '../../utils/axiosUrl'
import { Button, Input, Divider } from 'semantic-ui-react'

export default function OrderPayment({ order }) {
    const [cashPayment, setCashPayment] = useState(false)
    const [cash, setCash] = useState(0)

    const handlePayment = async () => {
        try {
            const placePayment = await API.put(`/orders/${order._id}`, {type: 'PAYMENT_DONE', paymentMethod: cashPayment, paymentChange: cashPayment ? cash - order.total : 0})
            if(placePayment) {
                setCash(0)
                console.log(placePayment.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h4>Total Pedido: R$ {order.total}</h4>
            <h4>Selecionado pagamento com {cashPayment ? 'Dinheiro' : 'Cartão'}</h4>
            {cashPayment &&
            <>
                <Input 
                    label="Dinheiro Recebido"
                    step="0.01"
                    type="number"
                    name="cash"
                    value={cash}
                    onChange={ e => setCash(e.target.value) }
                />
                <h5>Troco: R$ {cash - order.total}</h5>
            </>
            }
            <Button.Group fluid size="small">
                <Button 
                    type="button"
                    icon="credit card"
                    content="Cartão"
                    color="yellow"
                    onClick={ ()=> setCashPayment(false) }
                />
                <Button
                    type="button"
                    icon="money"
                    content="Dinheiro"
                    color="olive"
                    onClick={ ()=> setCashPayment(true) }
                />
            </Button.Group>
            <Divider />
            <Button 
                type="button"
                fluid
                positive
                size="large"
                icon="thumbs up"
                content="Fazer Pagamento"
                onClick={handlePayment}
            />
        </div>
    )
}