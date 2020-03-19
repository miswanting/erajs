function Header(props) {
    return (
        React.createElement(
            'div',
            { className: 'header' },
            React.createElement(
                Menu,
                { text: '文件' },
            ), React.createElement(
                Menu,
                { text: '编辑' },
            ), React.createElement(
                Menu,
                { text: '工具' },
            ), React.createElement(
                Menu,
                { text: '帮助' },
            ), React.createElement(
                Menu,
                { text: '+' },
            ), React.createElement(
                Title,
                { text: props.title },
            ), React.createElement(
                Min,
            ), React.createElement(
                Max,
            ), React.createElement(
                Close,
            ),
        )
    )
}
function Menu(props) {
    return (
        React.createElement(
            'span',
            { className: 'menu' },
            props.text
        )
    )
}
function Title(props) {
    return (
        React.createElement(
            'span',
            { className: 'title' },
            props.text
        )
    )
}
function Min() {
    return (
        React.createElement(
            'span',
            { className: 'min' },
            '●'
        )
    )
}
function Max() {
    return (
        React.createElement(
            'span',
            { className: 'max' },
            '●'
        )
    )
}
function Close() {
    return (
        React.createElement(
            'span',
            { className: 'close' },
            '●'
        )
    )
}