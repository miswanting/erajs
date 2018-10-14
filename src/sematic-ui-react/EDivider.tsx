import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Divider } from "semantic-ui-react";
/**
 * 行
 */
export default class EDivider extends React.Component<{ data: any }, { data: any }> {
    constructor(props: any) {
        super(props)
        this.state = { data: props.data }
    }
    render() {
        return <Divider content={this.state.data} />
    }
}