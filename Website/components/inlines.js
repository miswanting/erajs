function Inline(props) {
    let inline = null
    if (props.type == 'head') {
        inline = Head(props)
    } else if (props.type == 'text') {
        inline = Text(props)
    } else if (props.type == 'button') {
        inline = Button(props)
    } else if (props.type == 'link') {
        inline = Link(props)
    }
    return (
        inline
    )
}
function Head(props) {
    return (
        React.createElement(
            'span',
            {
                className: 'head',
                style: props.style
            },
            props.data.text
        )
    )
}
function Text(props) {
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
        if (!props.disabled) {
            props.data.callback()
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