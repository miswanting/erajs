import React, { useState, useEffect } from "react";
import { Header, Popup, Button, Checkbox, Radio, Rating, Form, TextArea, Input, Dropdown } from "semantic-ui-react";

export function Inline(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    if (['text', 't'].indexOf(data.type) != -1) {
        return (
            <Text data={data}></Text>
        )
    } else if (['header', 'h'].indexOf(data.type) != -1) {
        return (
            <EHeader data={data}></EHeader>
        )
    } else if (['link', 'l'].indexOf(data.type) != -1) {
        return (
            <EButton data={data}></EButton>
        )
    } else if (['button', 'b'].indexOf(data.type) != -1) {
        return (
            <EButton data={data}></EButton>
        )
    }
    // else if (['divider'].indexOf(data.type) != -1) {
    //     return (
    //         <Divider data={data}></Divider>
    //     )
    // } 
    else if (['progress'].indexOf(data.type) != -1) {
        return (
            <Progress data={data}></Progress>
        )
    } else if (['check'].indexOf(data.type) != -1) {
        return (
            <Check data={data} />
        )
    } else if (['radio'].indexOf(data.type) != -1) {
        return (
            <ERadio data={data} />
        )
    } else if (['rate'].indexOf(data.type) != -1) {
        return (
            <Rate data={data} />
        )
    } else if (['input'].indexOf(data.type) != -1) {
        return (
            <EInput data={data} />
        )
    } else if (['dropdown'].indexOf(data.type) != -1) {
        return (
            <EDropdown data={data} />
        )
    } else {
        return (
            <div>{JSON.stringify(data)}</div>
        )
    }
}
export function Text(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    // 事件处理
    // 输出
    var text_style = {}
    if (data.color != 'default') {
        text_style['color'] = data.color
    }
    if (data.color != 'default') {
        text_style['background'] = data.bcolor
    }
    var text = data.value.text.split(' ').join('&nbsp;')
    return (
        <span style={text_style} dangerouslySetInnerHTML={{ __html: text }}></span>
    );
}

export function EHeader(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);

    let header_style = { display: 'inline-grid' }
    if (data.value.color != 'default') {
        header_style['color'] = data.value.color
    }
    if (data.value.color != 'default') {
        header_style['background'] = data.value.bcolor
    }
    let rank = 'h' + data.value.rank.toString()
    return <Header as={rank} content={data.value.text} style={header_style} />
}
export function Link(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    // 事件处理
    function click() {
        let bag = {
            type: 'BUTTON_CLICK',
            from: 'r',
            to: 'b',
            hash: data.value.hash
        }
        data.value.func(bag)
    }
    // 输出
    return (
        <span className="link" style={style} onClick={click}>{data.text}</span>
    );
}
export function EButton(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    // 事件处理
    function click() {
        let bag = {
            type: 'BUTTON_CLICK',
            from: 'r',
            to: 'b',
            hash: data.value.hash
        }
        data.value.func(bag)
    }
    // 输出
    if (data.value.isLink) {
        if (data.value.disabled) {
            var e = <a
                style={{ color: data.value.color, cursor: 'pointer' }}
            >
                {data.value.text}
            </a>
        } else {
            var e = <a
                onClick={click}
                style={{ color: data.value.color, cursor: 'pointer' }}
            >
                {data.value.text}
            </a>
        }
    } else {
        var e = <Button
            content={data.value.text}
            onClick={click}
            size='tiny'
            color={data.value.color}
            compact
            disabled={data.value.disabled}
        />
    }
    if (data.value.popup == '') {
        return e
    } else {
        return <Popup trigger={e}
            content={data.value.popup}
            position='top center'
            size='tiny'
        />
    }
}
export function Progress(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    // 事件处理
    // 输出
    var percent = data.value.now / data.value.max * 100
    return (<div
        className='ui active indicating small progress'
        data-percent={percent}
        style={{
            display: 'inline-grid',
            width: data.value.length + 'px',
            margin: 0 + 'px',
            top: 2 + 'px'
        }}>
        <div
            className='bar'
            style={{
                width: percent + '%',
                minWidth: 0 + 'px'
            }} />
    </div>)
    // return (
    //     <span className="progress" style={style}>
    //         <span className="bar" style={style}></span>
    //     </span>
    // );
}
export function Check(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    let change = (e: any, d: any) => {
        let bag = {
            type: 'CHECK_CHANGE',
            from: 'r',
            to: 'b',
            hash: data.value.hash,
            value: d['checked']
        }
        data.value.func(bag)
    }
    return (
        <Checkbox
            label={data.value.text}
            defaultChecked={data.value.default}
            disabled={data.value.disabled}
            readOnly={data.value.read_only}
            onChange={change}
        />
    )
}
export function ERadio(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    function click(e: any, d: any) {
        let bag = {
            type: 'RADIO_CLICK',
            from: 'r',
            to: 'b',
            hash: data.value.hash,
            value: d.label
        }
        data.value.func(bag)
        for (let i = 0; i < data.value.list.length; i++) {
            if (d.label == data.value.list[i]) {
                setData({ ...data, value: { ...data.value, default: i } })
            }
        }
    }
    let seed = Math.random().toString()
    let radio_group = data.value.list.map((radio: any, i: number) => {
        let seed = Math.random().toString()
        return <Radio
            key={seed}
            label={radio}
            // name={seed}
            checked={i == data.value.default}
            onChange={click}
            style={{ marginRight: 20 + 'px' }} />
    })
    return (
        <>
            {radio_group}
        </>
    )
    // let radio_group = data.value.list.map((radio: any, index: number) => {
    //     return <Radio label={radio} checked={index == data.default} onChange={click} style={{ marginRight: 20 + 'px' }} />
    // })
    // return (
    //     <>{radio_group}</>
    // )
}
export function Rate(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    let click = (e: any, d: any) => {
        var new_data = data
        new_data.value.now = d.value
        setData(new_data)
        let bag = {
            type: 'RATE_CLICK',
            from: 'r',
            to: 'b',
            hash: data.value.hash,
            value: d.rating
        }
        data.value.func(bag)
    }
    return (
        <Rating
            rating={data.value.now}
            maxRating={data.value.max}
            disabled={data.value.disabled}
            onRate={click}
            size={'tiny'}
            clearable
        />
    )
    // let itemList = []
    // for (let i = 0; i < data.item.length; i++) {
    //     const element = data.item[i];
    //     itemList.push(<span key={i} onClick={() => { click(element) }}>{element}</span>)
    // }
    // // 事件处理
    // function click(value: string) {
    //     console.log(value);
    // }
    // // 输出
    // return (
    //     <span className="rate" style={style}>{itemList}</span>
    // );
}

// export function Divider(props: any) {
//     // 初始化
//     const [data, setData] = useState(props.data);
//     const [style, setStyle] = useState(props.style);
//     // 事件处理
//     // 输出
//     return (
//         <div className="divider">

//         </div>
//     );
// }

export function EInput(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    // 事件处理
    let change = (e: any, d: any) => {
        let bag = {
            type: 'INPUT_CHANGE',
            from: 'r',
            to: 'b',
            hash: data.value.hash,
            value: d['value']
        }
        data.value.func(bag)
    }
    if (data.value.is_area) {
        return <Form><TextArea
            defaultValue={data.value.default}
            placeholder={data.value.placeholder}
            onChange={change}
        /></Form>
    } else {
        return <Input
            defaultValue={data.value.default}
            placeholder={data.value.placeholder}
            size='mini'
            onChange={change}
        />
    }
    // function change(e: any) {
    //     let bag = {
    //         type: 'INPUT_CHANGE',
    //         from: 'r',
    //         to: 'b',
    //         hash: data.value.hash,
    //         value: data['value']
    //     }
    //     data.func(bag)
    // }
    // // 输出
    // return (
    //     <input type="text"
    //         onChange={change}>
    //         {data.value.default}
    //     </input>
    // );
}

export function EDropdown(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    // 事件处理
    let change = (e: any, d: any) => {
        let bag = {
            type: 'DROPDOWN_CHANGE',
            from: 'r',
            to: 'b',
            hash: data.value.hash,
            value: d['value']
        }
        // if (typeof bag.value == 'string') {
        //     bag.value = [bag.value]
        // }
        data.value.func(bag)
    }
    // 输出
    return <Dropdown
        selection
        search={data.value.search}
        multiple={data.value.multiple}
        options={data.value.options}
        placeholder={data.value.placeholder}
        defaultValue={data.value.default}
        allowAdditions={data.value.allowAdditions}
        size='tiny'
        onChange={change}
    />
}
