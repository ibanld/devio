import { Segment, Header, Icon } from 'semantic-ui-react'

export default function InfoPanel() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='arrow circle up' size="large" />
                Escolha a mesa para servir
            </Header>
        </Segment>
    )
}
