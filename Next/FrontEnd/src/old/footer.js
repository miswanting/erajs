const React = require('../../node_modules/react')
module.exports = function Footer (props) {
  return (
    React.createElement(
      'div',
      { className: 'footer' },
      props.footer
    )
  )
}
