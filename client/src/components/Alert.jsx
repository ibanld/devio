import React from 'react'
import { useAlert } from '../context/alertsContenxt'
import { Message, Transition } from 'semantic-ui-react'

function Alert() {
    const alert = useAlert()
    const {icon, header, content, showMe, positive} = alert

    return (
        <>
        {showMe &&
            <div style={{position: 'absolute', zIndex: 999, width: '100vw', top: '0'}}>
            <Transition visible={showMe} animation='scale' duration='1000' >
                    <Message 
                        icon={icon}
                        header={header}
                        content={content}
                        positive={positive}
                        negative={!positive}
                    />
            </Transition>
            </div>
        }
        </>
    )
}

export default Alert