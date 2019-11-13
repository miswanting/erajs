import Blockly from 'blockly'
import React, { useState } from 'react';
export function Code(props) {
    let blocklyArea = document.getElementById('blocklyArea');
    let blocklyDiv = document.getElementById('blocklyDiv');

    let toolbox = '<xml>';
    toolbox += '  <block type="controls_if"></block>';
    toolbox += '  <block type="controls_whileUntil"></block>';
    toolbox += '</xml>';
    let workspace = Blockly.inject(blocklyDiv, { toolbox: toolbox });
    return (
        <>
            <main id="blocklyArea">
                <div id="blocklyDiv">

                </div>
            </main>
        </>
    )
}