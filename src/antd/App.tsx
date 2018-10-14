import * as React from 'react'
import 'antd/dist/antd.css'
import Xcover from './Xcover'
import PageList from './PageList'
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
        return <div style={{ position: 'relative', height: '100%' }}>
            <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
                <PageList data={this.props.data} />
            </div>
        </div>
    }
}