import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Progress, } from "semantic-ui-react";

/**
 * 标题
 * BUG: <Header> 不应该位于 <p> 中。
 */
export default class EProgress extends React.Component<{ data: any }, {}> {
    render() {
        var percent = this.props.data.now / this.props.data.max * 100
        return <div
            className='ui active indicating small progress'
            data-percent={percent}
            style={{
                display: 'inline-grid',
                width: this.props.data.length + 'px',
                margin: 0 + 'px',
                top: 2 + 'px'
            }}
        >
            <div
                className='bar'
                style={{
                    width: percent + '%',
                    minWidth: 0 + 'px'
                }} />
        </div>
    }
}