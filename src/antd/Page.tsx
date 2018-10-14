import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Segment } from 'semantic-ui-react'
import Line from "./Line";

/**
 * 页面
 */
export default class Page extends React.Component<{ data: any, isDisabled: boolean }, {}> {
    render() {
        let lines = this.props.data.children.map((line: any, index: number) => {
            return <Line key={index} data={line} />
        })
        return <Segment disabled={this.props.isDisabled}>{lines}</Segment>
    }
}