import * as React from 'react'
import { Modal, Spin, Row, Col } from 'antd';
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
        return <Modal
            title="Era.js"
            visible={true}
            closable={false}
            footer={null}
            width={'300px'}
        >
            <Row type="flex" justify="center">
                <Col>
                    <Spin tip={status} />
                </Col>
            </Row>
        </Modal>
    }
}