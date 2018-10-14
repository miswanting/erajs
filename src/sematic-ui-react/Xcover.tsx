import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Segment, Loader, Image, Modal } from 'semantic-ui-react'
/**
 * 窗口
 */
export default class Xcover extends React.Component<{ data: any }, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let loadingType = true
        let status = 'Connecting...'
        let commet = 'Now, you can start the Game Script Engine.'
        if (this.props.data.isConnected) {
            loadingType = false
            status = 'Loading...'
            commet = ''
        }
        return <Modal basic open={true} size={'mini'}>
            <Modal.Content>
                <Loader active indeterminate={loadingType} inline='centered'>
                    <h1>Era.js</h1>
                    <p>{status}</p>
                    <p>{commet}</p>
                </Loader>
            </Modal.Content>
        </Modal >
    }
}