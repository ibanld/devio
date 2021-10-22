import React from 'react'
import { Modal, Button, Input } from 'semantic-ui-react'

export default function ProductConfirmModal({ open, setOpen, selectedProduct, setSelectedProduct, handleAddProduct }) {
    return (
        <Modal size="small" open={open} onClose={()=> setOpen(false)}>
            {selectedProduct.hasOwnProperty('item') && 
                <Modal.Content>
                    Quantas unidades você quer adicionar de {selectedProduct.item}?
                    <Input 
                        type="number"
                        min="1"
                        onChange={ e => setSelectedProduct({ ...selectedProduct, qty: e.target.value }) }
                    />
                    <Button 
                        type="button"
                        fluid 
                        positive 
                        content={`Adicionar ${selectedProduct.item} ao pedido`}
                        onClick={ () => handleAddProduct(selectedProduct) }
                    />
                </Modal.Content>
            }
            <Modal.Actions>
                <Button 
                    primary
                    type="button"
                    icon="chevron left"
                    content="Voltar"
                    onClick={ ()=> setOpen(false)}
                />
            </Modal.Actions>
        </Modal>
    )
}
