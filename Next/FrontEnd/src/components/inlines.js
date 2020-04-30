const React = require('../../node_modules/react')
module.exports = function Inline(props) {
    let inline = null
    if (props.type == 'heading') {
        inline = Heading(props)
    } else if (props.type == 'text') {
        inline = Text(props)
    } else if (props.type == 'button') {
        inline = Button(props)
    } else if (props.type == 'link') {
        inline = Link(props)
    } else if (props.type == 'progress') {
        inline = Progress(props)
    } else if (props.type == 'check') {
        inline = Check(props)
    } else if (props.type == 'rate') {
        inline = Rate(props)
    } else if (props.type == 'radio') {
        inline = Radio(props)
    } else if (props.type == 'input') {
        inline = Input(props)
    } else if (props.type == 'dropdown') {
        inline = Dropdown(props)
    } else {
        inline = React.createElement('span', {}, JSON.stringify(props))
    }
    return (
        inline
    )
}
function Heading(props) {
    return (
        React.createElement(
            'h' + props.data.rank.toString(),
            {
                style: props.style
            },
            props.data.text
        )
    )
}
function Text(props) {
    // const [shake, setShake] = React.useState(false)
    // React.useEffect(() => {
    //     if (props.style) {
    //         if (props.style.hasOwnProperty('shake_duration')) {
    //             const timer = setTimeout(() => {
    //                 console.log('This will shake!')
    //             }, props.style.shake_duration * 1000)
    //         }
    //     }
    //     return () => clearTimeout(timer)
    // }, [])


    if (!props.data.text) {
        return (
            React.createElement('br')
        )
    }
    let c = ['text']
    if (props.style && props.style.hasOwnProperty('shake_duration')) {
        c.push('shake')
        c.push('shake-constant')
    }
    return (
        React.createElement(
            'span',
            {
                className: c.join(' '),
                style: props.style
            },
            props.data.text
        )
    )
}
// function Text(props) {
//     console.log('useState', this);

//     const [shake, setShake] = React.useState(false)
//     toggleShake = () => {
//         setShake(!shake)
//     }


//     if (!props.data.text) {
//         return (
//             React.createElement('br')
//         )
//     }
//     let c = ['text']
//     if (props.style) {
//         if (props.style.hasOwnProperty('shake_duration')) {
//             toggleShake()
//         }
//     }
//     if (shake) {
//         c.push('shake')
//         c.push('shake-constant')
//     }
//     return (
//         React.createElement(
//             'span',
//             {
//                 className: c.join(' '),
//                 style: props.style
//             },
//             props.data.text
//         )
//     )
// }
function Button(props) {
    click = () => {
        if (!props.data.disabled) {
            props.callback({
                type: 'pull',
                data: {
                    type: 'BUTTON_CLICK',
                    target: props.data.hash
                }
            })
        }
    }
    return (
        React.createElement(
            'span',
            {
                className: 'button',
                style: props.style,
                onClick: click
            },
            props.data.text
        )
    )
}
function Link(props) {
    click = () => {
        if (!props.disabled) {
            props.data.callback()
        }
    }
    return (
        React.createElement(
            'span',
            {
                className: 'link',
                style: props.style,
                onClick: click
            },
            props.data.text
        )
    )
}
function Progress(props) {
    if (!props.style[0].hasOwnProperty('width')) {
        props.style[0].width = '100px'
    }
    props.style[1].width = `${props.data.now / props.data.max * 100}%`
    return (
        React.createElement(
            'span',
            {
                className: 'progress',
                style: props.style[0]
            },
            React.createElement(
                'span',
                {
                    className: 'bar',
                    style: props.style[1]
                },
                props.data.text
            )
        )
    )
}
function Rate(props) {
    const [now, setNow] = React.useState(props.data.now)
    let falseIcon = '☆';
    let trueIcon = '★';

    if (props.style.hasOwnProperty('false_icon')) {
        falseIcon = props.style.false_icon;
    }

    if (props.style.hasOwnProperty('true_icon')) {
        trueIcon = props.style.true_icon;
    }

    click = i => {
        if (!props.data.disabled) {
            if (i == now) {
                i = 0
            }
            props.callback({
                type: 'pull',
                data: {
                    type: 'RATE_CLICK',
                    value: i,
                    target: props.data.hash
                }
            });
            setNow(i)
        }
    };

    let itemList = [];

    for (let i = 0; i < props.data.max; i++) {
        if (i < now) {
            itemList.push(React.createElement('span', {
                className: 'rate-item',
                onClick: e => {
                    click(i + 1);
                }
            }, trueIcon));
        } else {
            itemList.push(React.createElement('span', {
                className: 'rate-item',
                onClick: () => {
                    click(i + 1);
                }
            }, falseIcon));
        }
    }

    return React.createElement('span', {
        className: 'rate',
        style: props.style
    }, itemList);
}

function Check(props) {
    const [value, setValue] = React.useState(props.data.default)
    let falseIcon = '◻';
    let trueIcon = '◼';

    if (props.style.hasOwnProperty('false_icon')) {
        falseIcon = props.style.false_icon;
    }

    if (props.style.hasOwnProperty('true_icon')) {
        trueIcon = props.style.true_icon;
    }

    click = () => {
        if (!props.data.disabled) {
            props.callback({
                type: 'pull',
                data: {
                    type: 'CHECK_CHANGE',
                    value: !value,
                    target: props.data.hash
                }
            });
            setValue(!value)
        }
    };
    let valueText = falseIcon
    if (value) {
        valueText = trueIcon
    }
    return React.createElement('span', {
        className: 'check',
        style: props.style,
        onClick: click
    }, [
        React.createElement('span', {
            className: 'check-value',
        }, valueText),
        React.createElement('span', {
            className: 'check-text',
        }, props.data.text)
    ]);
}
function Radio(props) {
    const [value, setValue] = React.useState(props.data.default_index)
    let falseIcon = '◻';
    let trueIcon = '◼';

    if (props.style.hasOwnProperty('false_icon')) {
        falseIcon = props.style.false_icon;
    }

    if (props.style.hasOwnProperty('true_icon')) {
        trueIcon = props.style.true_icon;
    }

    click = (i) => {
        if (!props.data.disabled) {
            props.callback({
                type: 'pull',
                data: {
                    type: 'RADIO_CHANGE',
                    value: i,
                    target: props.data.hash
                }
            });
            setValue(i)
        }
    };
    let itemList = []
    for (let i = 0; i < props.data.text_list.length; i++) {
        let valueText = falseIcon
        if (i == value) {
            valueText = trueIcon
        }
        itemList.push(
            React.createElement('span', {
                className: 'radio-item',
                style: props.style,
                onClick: () => { click(i) }
            }, [
                React.createElement('span', {
                    className: 'radio-value',
                }, valueText),
                React.createElement('span', {
                    className: 'radio-text',
                }, props.data.text_list[i])
            ])
        )
    }
    return React.createElement('span', {
        className: 'radio',
    }, itemList);
}
function Input(props) {
    const [value, setValue] = React.useState(props.data.default)
    change = (e) => {
        if (!props.data.disabled) {
            props.callback({
                type: 'pull',
                data: {
                    type: 'INPUT_CHANGE',
                    value: e.target.value,
                    target: props.data.hash
                }
            });
            setValue(e.target.value)
        }
    };

    let entity = null
    if (props.data.is_area) {
        entity = React.createElement('textarea', {
            className: 'input-area',
            onChange: change,
            placeholder: props.data.placeholder,
            value: value
        })
    } else {
        entity = React.createElement('input', {
            className: 'input',
            onChange: change,
            placeholder: props.data.placeholder,
            value: value
        })
    }
    return entity
}
function Dropdown(props) {
    const [value, setValue] = React.useState(props.data.default)
    change = (e) => {
        if (!props.data.disabled) {
            props.callback({
                type: 'pull',
                data: {
                    type: 'INPUT_CHANGE',
                    value: e.target.value,
                    target: props.data.hash
                }
            });
            setValue(e.target.value)
        }
    };

    let entity = null
    if (props.data.is_area) {
        entity = React.createElement('textarea', {
            className: 'input-area',
            onChange: change,
            placeholder: props.data.placeholder,
            value: value
        })
    } else {
        entity = React.createElement('input', {
            className: 'input',
            onChange: change,
            placeholder: props.data.placeholder,
            value: value
        })
    }
    return entity
}