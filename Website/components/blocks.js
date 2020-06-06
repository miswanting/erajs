function Block(props) {
    let block = null
    if (props.type == 'line') {
        block = Line(props)
    }
    return (
        block
    )
}

function Line(props) {
    let inlines = []
    for (let i = 0; i < props.children.length; i++) {
        const el = props.children[i];
        if (props.hasOwnProperty('disabled') && props.disabled) {
            el.disabled = true
        }
        inlines.push(Inline(el))
    }
    if (inlines.length == 0) {
        inlines.push(React.createElement('br'))
    }
    return (
        React.createElement(
            'div',
            {
                className: 'line',
                style: props.style
            },
            inlines
        )
    );
}