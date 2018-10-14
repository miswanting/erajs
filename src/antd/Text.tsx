import * as React from 'react'

/**
 * 行
 */
export default class Text extends React.Component<{ data: any }, {}> {
    render() {
        return this.props.data
    }
}