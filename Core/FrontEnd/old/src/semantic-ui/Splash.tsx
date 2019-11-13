import React, { useState } from 'react';
import { Loader, Modal } from 'semantic-ui-react'
export function Splash(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    let content = []
    if (props.data.load_text == '') {
        content.push(<p>Connecting...</p>)
    } else {
        content.push(<p>Loading...</p>)
        content.push(<p>{props.data.load_text}</p>)
    }
    return (
        <main className="splash">
            <div className="dimmer">
                <Loader active inline='centered' indeterminate={props.data.load_text == ''}>
                    <h1>Era.js</h1>
                    {content}
                    <p>按[Esc]键打开菜单</p>
                    <p>按[`]键打开控制台</p>
                </Loader>
            </div>
        </main>
        // <Modal basic open={true} size={'mini'}>
        //     <Modal.Content>
        //         <Loader active inline='centered'>
        //             <h1>Era.js</h1>
        //             <p>Loading...</p>
        //             <p>Loading...</p>
        //         </Loader>
        //     </Modal.Content>
        // </Modal >
    )
}