
import * as React from 'react'
import * as ReactDOM from 'react-dom'
export default class App extends React.Component<{ data: any }, {}> {
    constructor(props: any) {
        super(props);
    }
    render() {
        var display_item = []
        if (this.props.data.isConsole) {
            display_item.push(<Console data={this.props.data} />)
        } else if (this.props.data.avantar_editor) {
            display_item.push(<Console data={this.props.data} />)
        } else if (this.props.data.map_editor) {
            display_item.push(<Map data={this.props.data} />)
        } else if (this.props.data.code_editor) {
            // display_item.push(<Code data={this.props.data} />)
        } else if (!this.props.data.isLoaded) {
            display_item.push(<Xcover data={this.props.data} />)
        } else {
            display_item.push(<PageList data={this.props.data} />)
        }
        return <>{display_item}</>
    }
}