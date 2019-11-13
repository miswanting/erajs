import * as React from 'react'
import { TextArea, Form, Input, Modal, Divider } from "semantic-ui-react";
/**
 * 行
 */
export default class Console extends React.Component<{ data: any }, { cmd: string }> {
    constructor(props: any) {
        super(props)
        this.state = { cmd: '' }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e, data) {
        this.setState({ cmd: data.value })
    }
    handleSubmit(e) {
        this.setState({ cmd: this.state.cmd })
        this.props.data.cmd_func(this.state.cmd)
    }
    render() {
        const { cmd } = this.state
        return <Modal open={true} size='tiny' centered={false}>
            <Modal.Content>
                <Form onSubmit={this.handleSubmit}>
                    <Input focus transparent fluid label='>' size='mini' value={cmd} onChange={this.handleChange} />
                    <Divider />
                    <TextArea autoHeight value={this.props.data.result} />
                </Form>
            </Modal.Content>
        </Modal >
    }
}