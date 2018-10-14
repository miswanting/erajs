import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button } from "semantic-ui-react";

/**
 * 行
 */
export default class EButton extends React.Component<{ data: any }, { data: any }> {
    constructor(props: any) {
        super(props)
        this.state = { data: props.data }
    }
    handleClick = () => {
        let bag = {
            type: 'BUTTON_CLICK',
            from: 'r',
            to: 'b',
            hash: this.state.data.hash
        }
        this.state.data.func(bag)
    }
    render() {
        return <Button
            content={this.state.data.text}
            onClick={this.handleClick}
            size='tiny'
            compact
            disabled={this.state.data.disabled}
        />
    }
}