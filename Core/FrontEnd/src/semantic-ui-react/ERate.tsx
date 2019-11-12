import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Rating } from "semantic-ui-react";

/**
 * 标题
 * BUG: <Header> 不应该位于 <p> 中。
 */
export default class ERate extends React.Component<{ data: any }, { data: any }> {
    constructor(props: any) {
        super(props)
        this.state = { data: props.data }
    }
    handleClick = (e: any, data: any) => {
        console.log(data);
        var new_state = this.state
        new_state.data.now = data.value
        this.setState(new_state)
        let bag = {
            type: 'RATE_CLICK',
            from: 'r',
            to: 'b',
            hash: this.state.data.hash,
            value: data.rating
        }
        this.state.data.func(bag)
    }
    render() {
        return <Rating
            rating={this.state.data.now}
            maxRating={this.state.data.max}
            disabled={this.state.data.disabled}
            onRate={this.handleClick}
            size={'tiny'}
            clearable
        />
    }
}