import * as React from 'react'

/**
 * 行
 */
export default class Text extends React.Component<{ data: any }, { data: any }> {
    constructor(props: any) {
        super(props)
        this.state = { data: props.data }
    }
    render() {
        return this.state.data
    }
}