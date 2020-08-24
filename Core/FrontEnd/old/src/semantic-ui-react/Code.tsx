import * as React from 'react'
// import * as Blockly from '../blockly/blockly_compressed.js'
// import * as Blocks from '../blockly/blocks_compressed.js'
// import * as Python from '../blockly/python_compressed.js'
// export default class Code extends React.Component<{ data: any }, {}> {
//     constructor(props: any) {
//         super(props);
//     }
//     componentDidMount() {
//         var workspace = Blockly.inject(
//             'blocklyDiv',
//             { toolbox: document.getElementById('toolbox') }
//         );
//     }
//     render() {
//         return <>
//             <div
//                 id="blocklyDiv"
//                 style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0
//                 }}>
//             </div>
//             <div dangerouslySetInnerHTML={{
//                 __html: `
//                 <xml id="toolbox" style="display: none">
//                 <block type="controls_if"></block>
//                 <block type="controls_repeat_ext"></block>
//                 <block type="logic_compare"></block>
//                 <block type="math_number"></block>
//                 <block type="math_arithmetic"></block>
//                 <block type="text"></block>
//                 <block type="text_print"></block>
//               </xml>
//             `
//             }}></div>
//         </>

//     }
// }