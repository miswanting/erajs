import * as React from 'react'

/**
 * 行
 */
export default class Text extends React.Component<{ data: any }, {}> {
    render() {
        var text_style = {}
        if (this.props.data.color != 'default') {
            text_style['color'] = this.props.data.color
        }
        if (this.props.data.color != 'default') {
            text_style['background'] = this.props.data.bcolor
        }

        var text = this.props.data.text.split(' ').join('&nbsp;')
        // console.log(this.props.data.text, text);
        return <span style={text_style} dangerouslySetInnerHTML={{ __html: text }}>
            {/* {text} */}
        </span>
    }
}