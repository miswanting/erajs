import React, { useState, useEffect } from 'react';
import { Item } from './Inline'

export function Game(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    useEffect(() => {
        let e = document.getElementsByClassName('game')[0]
        e.scrollTop = e.scrollHeight;
    });
    let pages = []
    for (let i = 0; i < data.pages.children.length; i++) {
        const page = data.pages.children[i];
        pages.push(<Section data={page} key={Math.random()}></Section>)
    }
    return (
        <main className="game">
            {pages}
        </main>
    );
}
function Section(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    let blocks = []
    for (let i = 0; i < data.children.length; i++) {
        const block = data.children[i];
        blocks.push(<Block data={block} key={i}></Block>)
    }
    return (
        <section className="page">
            {blocks}
        </section>
    )
}

function Block(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    if (data.type == 'line') {
        return (
            <Line data={data}></Line>
        )
    } else if (data.type == 'grid') {
        return (
            <Grid data={data}></Grid>
        )
    } else if (data.type == 'divider') {
        return (
            <Divider data={data} />
        )
    }
}
function Line(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    if (data.children.length == 0) {
        return (
            <div><br /></div>
        )
    }
    let items = data.children.map((item: any, i: number) => {
        return <Item data={item} keys={i}></Item>
    })
    return (
        <div className="line">{items}</div>
    )
}

function Grid(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    let rows = []
    function add(item: any) {
        // 当现在不存在行时，初始化一行
        if (rows.length == 0) {
            rows.push([[]])
        }
        // 在最后一行的最后一列新增项目
        rows[rows.length - 1][rows[rows.length - 1].length - 1].push(item)
    }
    function tab(item: any) {
        // 当现在不存在行时，初始化一行
        if (rows.length == 0) {
            rows.push([[]])
        }
        // 当一行列数已满时时，初始化一行
        if (rows[rows.length - 1].length == props.data.value.column) {
            rows.push([[]])
        } else {
            rows[rows.length - 1].push([])
        }
    }
    for (let i = 0; i < data.children.length; i++) {
        const item = data.children[i];
        if (item.type == 't') {
            if (item.value.text == '') {
                tab(item)
            }
            else {
                add(item)
            }
        } else {
            add(item)
        }
    }
    var rs = rows.map((row, i) => {
        var cs = row.map((column, j) => {
            let is: object;
            if (column.length == 0) {
                is = <br />
            } else {
                is = column.map((item, k) => {
                    return <Item data={item}></Item>
                })
            }
            return <span className="column">{is}</span>
        })
        return <div className="row">{cs}</div>
    })
    return (
        <div className="grid">{rs}</div>
    )
}
function LCR(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    let rows = []
    function add(item: any) {
        // 当现在不存在行时，初始化一行
        if (rows.length == 0) {
            rows.push([[]])
        }
        // 在最后一行的最后一列新增项目
        rows[rows.length - 1][rows[rows.length - 1].length - 1].push(item)
    }
    function tab(item: any) {
        // 当现在不存在行时，初始化一行
        if (rows.length == 0) {
            rows.push([[]])
        }
        // 当一行列数已达到3时，初始化一行
        if (rows[rows.length - 1].length == 3) {
            rows.push([[]])
        } else {
            rows[rows.length - 1].push([])
        }
    }
    for (let i = 0; i < data.children.length; i++) {
        const item = data.children[i];
        if (item.type == 't') {
            if (item.value.text == '') {
                tab(item)
            }
            else {
                add(item)
            }
        } else {
            add(item)
        }
    }
    var rs = rows.map((row, i) => {
        var cs = row.map((column, j) => {
            let is: object;
            if (column.length == 0) {
                is = <br />
            } else {
                is = column.map((item, k) => {
                    return <Item data={item}></Item>
                })
            }
            return <span className="column">{is}</span>
        })
        return <div className="row">{cs}</div>
    })
    return (
        <div className="lcr">{rs}</div>
    )
}
function Divider(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    console.log(data);

    return (
        <div className="divider">
            <span className="breaker"><span></span></span>
            <span className="text" >{data.value}</span>
            <span className="breaker"><span></span></span>
        </div >
    )
}