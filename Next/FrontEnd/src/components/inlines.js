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
}