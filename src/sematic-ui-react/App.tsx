import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import Xcover from './Xcover'
import PageList from './PageList'
import { Grid, GridRow, GridColumn } from 'semantic-ui-react'
/**
 * 窗口
 */
export default class App extends React.Component<{ data: any }, {}> {
    constructor(props: any) {
        super(props);
    }
    render() {
        if (!this.props.data.isLoaded) {
            return <Xcover data={this.props.data} />
        }
        // return <div style={{ position: 'relative', height: '100%' }}>
        //     <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
        //         <PageList data={this.props.data} />
        //     </div>
        // </div>
        return <PageList data={this.props.data} />

    }
}