
import * as React from 'react'
import * as ReactDOM from 'react-dom'
export default class App extends React.Component<{ data: any }, {}> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return <><svg width="640" height="480"
            xmlns="http://www.w3.org/2000/svg">
            <circle r="50" cy="100" cx="100" stroke-width="0" stroke="#000000" fill="#ff0000" />
            <polygon stroke-width="0" stroke="#000000" points="0,100 100,100 50,0" strokeWidth="0" strokecolor="#000000" fill="#000000" cy="100" cx="100" />
            <polygon stroke-width="0" stroke="#000000" points="0,100 100,100 50,200" strokeWidth="0" strokecolor="#000000" fill="#000000" cy="100" cx="100" />
            <text stroke="#000000" font-family="Microsoft YaHei" font-size="100" y="150" x="100" stroke-width="0" fill="#000000">Era.js</text>
        </svg></>
    }
}