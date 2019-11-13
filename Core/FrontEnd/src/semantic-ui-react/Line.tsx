import * as React from 'react'
import Text from "./Text";
import EButton from "./EButton";
import EHeader from "./EHeader";
import EProgress from "./EProgress";
import ERate from "./ERate";
import ECheck from './ECheck';
import ERadio from "./ERadio";
import EInput from "./EInput";
import EDivider from "./EDivider";
// import EChart from "./EChart";
import EDropdown from './EDropdown';

/**
 * 行
 */
export default class Line extends React.Component<{ data: any, mode: any }, {}> {
    render() {
        if (this.props.data.children.length == 0) {
            return <p dangerouslySetInnerHTML={{ __html: '<br>' }} />
        }
        let items = this.props.data.children.map((item: any, index: number) => {
            if (item.type == 't') {
                return <Text key={index} data={item.value} />
            } else if (item.type == 'b') {
                return <EButton key={index} data={item.value} />
            } else if (item.type == 'h') {
                return <EHeader key={index} data={item.value} />
            } else if (item.type == 'progress') {
                return <EProgress key={index} data={item.value} />
            } else if (item.type == 'rate') {
                return <ERate key={index} data={item.value} />
            } else if (item.type == 'check') {
                return <ECheck key={index} data={item.value} />
            } else if (item.type == 'radio') {
                return <ERadio key={index} data={item.value} />
            } else if (item.type == 'input') {
                return <EInput key={index} data={item.value} />
            } else if (item.type == 'divider') {
                return <EDivider key={index} data={item.value} />
            } else if (item.type == 'chart') {
                // return <EChart key={index} data={item.value} />
            } else if (item.type == 'dropdown') {
                return <EDropdown key={index} data={item.value} />
            }
        })
        return <p>{items}</p>
    }
}