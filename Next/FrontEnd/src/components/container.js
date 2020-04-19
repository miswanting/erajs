const React = require('../../node_modules/react')
const Block = require('../components/blocks')
module.exports = function Container(props) {
    React.useEffect(() => {
        let el = document.querySelector('.container')
        el.scrollTop = el.scrollHeight
    })
    let pages = []
    for (let i = 0; i < props.children.length; i++) {
        const p = props.children[i];
        // console.log(p);
        if (i < props.children.length - 1) {
            p.disabled = true
        }
        p.key = i
        pages.push(
            React.createElement(
                Page,
                p
            )
        )
    }
    // console.log(pages);
    return (
        React.createElement(
            'div',
            { className: 'container' },
            pages
        )
    );
}

function Page(props) {
    let p = props
    p.key = 3
    let blocks = [React.createElement(DisableMask, p)]
    console.log(p, blocks);
    for (let i = 0; i < props.children.length; i++) {
        const el = props.children[i];
        el.key = i
        blocks.push(React.createElement(Block, el))
    }
    let c = ['page']
    if (props.hasOwnProperty('disabled') && props.disabled) {
        c.push('disabled')
    }
    console.log(blocks);

    return (
        React.createElement(
            'div',
            { className: c.join(' ') },
            blocks
        )
    )
}
function DisableMask(props) {
    let c = 'disable-mask'
    if (props.hasOwnProperty('disabled') && props.disabled) {
        c += ' disabled'
    }
    return (
        React.createElement(
            'div',
            { className: c }
        )
    )
}
// function Page(props) {
//     let blocks = []
//     for (let i = 0; i < props.children.length; i++) {
//         const el = props.children[i];
//         if (props.hasOwnProperty('disabled') && props.disabled) {
//             el.disabled = true
//         }
//         blocks.push(Block(el))
//     }
//     if (props.hasOwnProperty('disabled') && props.disabled) {
//         return (
//             React.createElement(
//                 'div',
//                 { className: 'page disabled' },
//                 blocks
//             )
//         )
//     } else {
//         return (
//             React.createElement(
//                 'div',
//                 { className: 'page' },
//                 blocks
//             )
//         )
//     }

// }