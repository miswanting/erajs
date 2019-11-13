import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Radio } from "semantic-ui-react";

/**
 * 
 * 
 */
export default class ERadio extends React.Component<{ data: any }, { data: any }> {
    constructor(props: any) {
        super(props)
        this.state = { data: props.data }
    }
    handleClick = (e: any, data: any) => {
        console.log(data);
        let bag = {
            type: 'RADIO_CLICK',
            from: 'r',
            to: 'b',
            hash: this.state.data.hash,
            value: data.label
        }
        this.state.data.func(bag)
        for (let i = 0; i < this.state.data.list.length; i++) {
            if (data.label == this.state.data.list[i]) {
                var tmp = this.state
                tmp.data.default = i
                this.setState(tmp)
            }
        }
    }
    render() {
        var radio_group = this.state.data.list.map((radio: any, index: number) => {
            console.log(index, this.state.data.default);
            return <Radio label={radio} checked={index == this.state.data.default} onChange={this.handleClick} style={{ marginRight: 20 + 'px' }} />
        })
        return <>{radio_group}</>
    }
}