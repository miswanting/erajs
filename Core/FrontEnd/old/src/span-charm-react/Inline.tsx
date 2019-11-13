import React, { useState } from "react";
export function Item(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    if (['text', 't', 'h'].indexOf(data.type) != -1) {
        return (
            <Text data={data}></Text>
        )
    } else if (['button', 'b'].indexOf(data.type) != -1) {
        return (
            <Button data={data}></Button>
        )
    } else if (['divider'].indexOf(data.type) != -1) {
        // return (
        // <Divider data={data}></Divider>
        // )
    } else if (['progress'].indexOf(data.type) != -1) {
        return (
            <Progress data={data}></Progress>
        )
    } else if (['input'].indexOf(data.type) != -1) {
        return (
            <Input data={data}></Input>
        )
    } else if (['radio'].indexOf(data.type) != -1) {
        return (
            <Radio data={data} />
        )
    } else if (['rate'].indexOf(data.type) != -1) {
        return (
            <Rate data={data} />
        )
    } else if (['check'].indexOf(data.type) != -1) {
        return (
            <Check data={data} />
        )
    } else if (['dropdown'].indexOf(data.type) != -1) {
        return (
            <Dropdown data={data} />
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
    let style = {
        color: data.value.color,
        background: data.value.bcolor
    }
    // const [style, setStyle] = useState(props.style);
    // 事件处理
    // 输出
    return (
        <span className="text" style={style}>{data.value.text}</span>
    );
}
export function Link(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    // 事件处理
    function click() {
        console.log("Clicked!");
    }
    // 输出
    return (
        <span className="link" style={style} onClick={click}>{data.text}</span>
    );
}
export function Button(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    // const [style, setStyle] = useState(props.style);
    let style = {
        color: data.value.color
    }
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
    if ("isLink" in data.value && data.value.isLink) {
        return <span className="link" style={style} onClick={click}>{data.text}</span>
    }
    let cls = []
    if ("isLink" in data.value && data.value.isLink) {
        cls.push("link")
    } else {
        cls.push("button")
    }
    if (data.value.disabled) {
        cls.push("disabled")
    }
    let p = <></>
    if (data.value.popup != '') {
        p = <div className="popup">
            {data.value.popup}
        </div>
    }
    return (
        <span
            className={cls.join(" ")}
            style={style}
            onClick={click}>
            {data.value.text}
            {p}
        </span>
    );
}
export function Radio(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    function click(v: any) {
        setData({ ...data, value: { ...data.value, default: v } })
    }
    let itemList = data.value.list.map((item: any, i: number) => {
        if (data.value.default == i) {
            return <span className="item active" onClick={() => click(i)}>
                {item}
            </span>
        } else {
            return <span className="item" onClick={() => click(i)}>
                {item}
            </span>
        }
    })
    // 输出
    return (
        <span className="radio" style={style}>
            {itemList}
        </span>
    );
}
export function Rate(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    let itemList = []
    for (let i = 0; i < data.value.max; i++) {
        if (data.value.disabled) {
            if (i < data.value.now) {
                itemList.push(<span key={i}>★</span>)
            } else {
                itemList.push(<span key={i}>☆</span>)
            }
        } else {
            if (i < data.value.now) {
                itemList.push(<span key={i} onClick={() => { click(i) }}>★</span>)
            } else {
                itemList.push(<span key={i} onClick={() => { click(i) }}>☆</span>)
            }
        }
    }
    // 事件处理
    function click(v: number) {
        if (v + 1 == data.value.now) {
            setData({ ...data, value: { ...data.value, now: 0 } })
        } else {
            setData({ ...data, value: { ...data.value, now: v + 1 } })
        }
    }
    // 输出
    return (
        <span className={data.value.disabled ? "rate" : "rate disabled"} style={style}>{itemList}</span>
    );
}
export function Progress(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    // 事件处理
    // 输出
    let barWidth = data.value.length * data.value.now / data.value.max
    let innerStyle = { width: barWidth }
    let OuterStyle = { width: data.value.length + 'px' }
    return (
        <span className="progress" style={OuterStyle}>
            <span className="bar" style={innerStyle}></span>
        </span>
    );
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

export function Input(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    // 事件处理
    function change(e: any) {
        let bag = {
            type: 'INPUT_CHANGE',
            from: 'r',
            to: 'b',
            hash: data.value.hash,
            value: e.target.value
        }
        data.value.func(bag)
    }
    // 输出
    if (data.value.is_area) {
        return (
            <textarea className="input" cols={3} rows={3} onInput={change}></textarea>
        )
    } else {
        return (
            <input type="text" className="input" onInput={change} />
        );
    }
}

export function Check(props: any) {
    // 初始化
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);

    // 事件处理
    function click() {
        let bag = {
            type: 'CHECK_CHANGE',
            from: 'r',
            to: 'b',
            hash: data.value.hash,
            value: !data.value.default
        }
        data.value.func(bag)
        setData({ ...data, value: { ...data.value, default: bag.value } })
    }
    let cls = ['check']
    if (data.value.default) {
        cls.push('active')
    }
    if ('disabled' in data.value && data.value.disabled) {
        cls.push('disabled')
    }
    if ('read_only' in data.value && data.value.read_only) {
        cls.push('read-only')
    }
    // 输出
    return (
        <span className={cls.join(' ')} onClick={click} >{data.value.text}</span>
    )
}

/**
 * 
 * 单例：初始显示默认
 * 点击显示列表
 * 点击列表更换数据
 * 多例：初始显示默认
 * 点击显示列表
 * 点击列表更换数据
 * 点击删除按钮删除该项
 * @param props 
 */
export function Dropdown(props: any) {
    // 初始化
    const [show, setShow] = useState(false)
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);

    // 事件处理
    function clickList(i: number) {
        let bag = {
            type: 'DROPDOWN_CHANGE',
            from: 'r',
            to: 'b',
            hash: data.value.hash,
            value: null
        }
        if (data.value.multiple) {
            // bag.value = data.value.default
        } else {
            bag.value = i
        }
        data.value.func(bag)
        setData({ ...data, value: { ...data.value, default: bag.value } })
        setShow(!show)
    }
    function clickItem() {
        setShow(!show)
    }
    // TODO: 参数兼容还没做完
    // 1. multiple
    // 2. search
    // 3. allowAddition
    // 4. placeholder
    if (data.value.multiple) {
        let items = data.value.default.map((item, i) => {
            return <div onClick={() => { clickList(i) }} className="item">{item.text}</div>
        })
    } else {
        let items = data.value.options.map((item, i) => {
            return <div onClick={() => { clickList(i) }} className="item">{item.text}</div>
        })
        let showText = data.value.options[data.value.default].text
        return (
            <span className="dropdown" >
                <span onClick={() => { clickItem() }} className="item">{showText}↑</span>
                <div className={show ? "list show" : "list"}>
                    {items}
                </div>
            </span>
        )
    }
}