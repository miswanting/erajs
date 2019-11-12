import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Header } from "semantic-ui-react";

/**
 * 标题
 * BUG: <Header> 不应该位于 <p> 中。
 */
export default class EHeader extends React.Component<{ data: any }, {}> {
    render() {
        var header_style = { display: 'inline-grid' }
        if (this.props.data.color != 'default') {
            header_style['color'] = this.props.data.color
        }
        if (this.props.data.color != 'default') {
            header_style['background'] = this.props.data.bcolor
        }
        let rank = 'h' + this.props.data.rank.toString()
        return <Header as={rank} content={this.props.data.text} style={header_style} />
    }
}