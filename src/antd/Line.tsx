import * as React from 'react'
import Text from "./Text";
import EButton from "./EButton";
import EHeader from "./EHeader";
import EProgress from "./EProgress";

/**
 * 行
 */
export default class Line extends React.Component<{ data: any }, {}> {
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
            }
        })
        return <p>{items}</p>
    }
}