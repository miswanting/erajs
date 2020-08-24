/**
 * push→this→pull
 */
class DisplayManager extends EventEmitter {
    init() { }
    start = () => {
        document.addEventListener('pull', (data) => { this.pull(data) })
        // document.addEventListener('push', (e, data) => {
        //     this.update(e.detail)
        // })
    }
    pull = (data) => {
        this.emit('pull', data)
        // let event = new CustomEvent('pull', { detail: data })
        // document.dispatchEvent(event)
    }
    push = (data) => { this.update(data) }
    update(data) {
        ReactDOM.render(
            VerticalFrame(data),
            document.getElementById('root')
        )
    }
}
function VerticalFrame(props) {
    return (
        React.createElement(
            'div',
            { className: 'vertical-frame' },
            React.createElement(
                HorizontalFrame,
                props
            )
        )
    )
}
function HorizontalFrame(props) {
    return (
        React.createElement(
            'div',
            { className: 'horizontal-frame' },
            React.createElement(
                Window,
                props
            )
        )
    )
}
function Window(props) {
    return (
        React.createElement(
            'div',
            { className: 'window' },
            React.createElement(
                Header,
                props
            ), React.createElement(
                Container,
                props
            ), React.createElement(
                Footer,
                props
            )
        )
    )
}