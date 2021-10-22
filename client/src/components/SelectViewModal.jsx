import React from 'react'
import { Modal, Card, Icon, Header, Button } from 'semantic-ui-react'


export default function SelectViewModal({ open, setOpen, setView }) {
    return (
        <Modal basic open={open} onClose={ ()=> setOpen(false)}>
            <Modal.Header>
                Vamos para
            </Modal.Header>
            <Modal.Content>
                <Card.Group centered>
                    <Card color="blue" onClick={ ()=> { setView('room'); setOpen(false) }}>
                        <Card.Content>
                            <Header color="blue" icon>
                                <Icon name='list ol' size="large" />
                                Sala
                            </Header>
                        </Card.Content>
                    </Card>
                    <Card color="green" onClick={ ()=> { setView('kitchen'); setOpen(false) }}>
                        <Card.Content>
                            <Header color="green" icon>
                                <Icon name='utensils' size="large" />
                                Cozinha
                            </Header>
                        </Card.Content>
                    </Card>
                    <Card color="orange" onClick={ ()=> { setView('admin'); setOpen(false) }}>
                        <Card.Content>
                            <Header icon color="orange">
                                <Icon name='briefcase' size="large" />
                                Administraçao
                            </Header>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    type="button"
                    primary
                    icon="chevron left"
                    content="Voltar"
                    onClick={ ()=> setOpen(false) }
                />
            </Modal.Actions>
        </Modal>
    )
}
