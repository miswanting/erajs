import "span-charm/span-charm.css"
import * as React from 'react'
import { useState } from 'react';
import * as ReactDOM from 'react-dom'
import Intro from './Intro'
import Game from './Game'
import { Window } from '../Managers/DisplayManager'
export default function App(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    let displayList = []
    if (data.displayMode == Window.Intro) {
        displayList.push(<Intro key='1' data={data} style={style} />)
    } else if (data.displayMode == Window.Game) {
        if (data.showConsole) {
        } else if (data.showSystemMenu) {
        } else {
            displayList.push(<Game />)
        }
    }
    return (<>{displayList}</>)
}