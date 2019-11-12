import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Dropdown } from "semantic-ui-react";

/**
 * 行
 */
export default class EDropdown extends React.Component<{ data: any }> {
    constructor(props: any) {
        super(props)
        // this.state = { data: props.data }
    }
    onChange = (e: any, data: any) => {
        let bag = {
            type: 'DROPDOWN_CHANGE',
            from: 'r',
            to: 'b',
            hash: this.props.data.hash,
            value: data['value']
        }
        // if (typeof bag.value == 'string') {
        //     bag.value = [bag.value]
        // }
        this.props.data.func(bag)
    }
    render() {
        return <Dropdown
            selection
            search={this.props.data.search}
            multiple={this.props.data.multiple}
            options={this.props.data.options}
            placeholder={this.props.data.placeholder}
            defaultValue={this.props.data.default}
            allowAdditions={this.props.data.allowAdditions}
            size='tiny'
            onChange={this.onChange}
        />
    }
}