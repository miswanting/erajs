import * as React from 'react'
import { Button, Popup } from "semantic-ui-react";

/**
 * 行
 */
export default class EButton extends React.Component<{ data: any }, {}> {
    handleClick = () => {
        let bag = {
            type: 'BUTTON_CLICK',
            from: 'r',
            to: 'b',
            hash: this.props.data.hash
        }
        this.props.data.func(bag)
    }
    render() {
        if (this.props.data.isLink) {
            if (this.props.data.disabled) {
                var e = <a
                    style={{ color: this.props.data.color, cursor: 'pointer' }}
                >
                    {this.props.data.text}
                </a>
            } else {
                var e = <a
                    onClick={this.handleClick}
                    style={{ color: this.props.data.color, cursor: 'pointer' }}
                >
                    {this.props.data.text}
                </a>
            }
        } else {
            var e = <Button
                content={this.props.data.text}
                onClick={this.handleClick}
                size='tiny'
                color={this.props.data.color}
                compact
                disabled={this.props.data.disabled}
            />
        }

        if (this.props.data.popup == '') {
            return e
        } else {
            return <Popup trigger={
                e
            }
                content={this.props.data.popup}
                position='top center'
                size='tiny'
            />
        }

    }
}