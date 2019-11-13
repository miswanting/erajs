import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Segment } from 'semantic-ui-react'
import Line from "./Line";
import EGrid from './EGrid';


/**
 * 页面
 */
export default class Page extends React.Component<{ data: any, isDisabled: boolean }, {}> {
    render() {
        let lines = []
        for (let i = 0; i < this.props.data.children.length; i++) {
            if (this.props.data.children[i].type == 'line') {
                lines.push(<Line key={i} data={this.props.data.children[i]} mode={this.props.data.mode} />)
            } else if (this.props.data.children[i].type == 'grid') {
                lines.push(<EGrid key={i} data={this.props.data.children[i]} />)
            }
        }
        var page_style = { width: 100 + '%' }
        if (this.props.data.data.color != 'default') { // 的确是两个data
            page_style['background'] = this.props.data.data.color
        }
        return <Segment
            disabled={this.props.isDisabled}
            style={page_style}
        >
            {lines}
        </Segment>
    }
}