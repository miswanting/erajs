import * as React from 'react'
import { Checkbox } from "semantic-ui-react";

/**
 * 行
 */
export default class ECheck extends React.Component<{ data: any }, { data: any }> {
    constructor(props: any) {
        super(props)
        this.state = { data: props.data }
    }
    onChange = (e: any, data: any) => {
        let bag = {
            type: 'CHECK_CHANGE',
            from: 'r',
            to: 'b',
            hash: this.state.data.hash,
            value: data['checked']
        }
        this.state.data.func(bag)
    }
    render() {
        return <Checkbox
            label={this.props.data.text}
            defaultChecked={this.props.data.default}
            disabled={this.props.data.disabled}
            readOnly={this.props.data.read_only}
            onChange={this.onChange}
        />
    }
}