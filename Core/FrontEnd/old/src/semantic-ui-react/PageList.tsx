import * as React from 'react'
import Page from "./Page";
import { Grid, GridRow } from 'semantic-ui-react'

/**
 * 页面列表（较长）
 */
export default class PageList extends React.Component<{ data: any }, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let pages = this.props.data.pages.map((page: any, index: number) => {
            if (index == this.props.data.pages.length - 1) {
                return <Page key={index} data={page} isDisabled={false} />
            } else {
                return <Page key={index} data={page} isDisabled={true} />
            }
        })
        return <div id={'pagelist'} className={'ui bottom aligned row padded grid'} style={{ height: 100 + '%', display: 'grid' }}>
            <div className={'column'}>
                {pages}
            </div>
        </div>
    }
    componentDidUpdate() {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
    }
}