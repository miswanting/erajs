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
    console.log(props.data);

    if (!props.data.text) {
        return (
            React.createElement('br')
        )
    }
    if (props.hasOwnProperty('disabled') && props.disabled) {
        return (
            React.createElement(
                'span',
                {
                    className: 'text',
                },
                props.data.text
            )
        )
    } else {
        return (
            React.createElement(
                'span',
                {
                    className: 'text',
                    style: props.style
                },
                props.data.text
            )
        )
    }
}
function Button(props) {
    click = () => {
        if (!props.data.disabled) {
            // let e = new CustomEvent('pull', {
            //     type: 'BUTTON_CLICK',
            //     target: props.data.hash
            // })
            // document.dispatchEvent(e)
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