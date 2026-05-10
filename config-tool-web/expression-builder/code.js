const TEMPLATES = {
    button_hold: {
        name: 'When Button Held',
        workspace: {
            blocks: {
                languageVersion: 0,
                blocks: [{
                    type: 'input_state', x: 150, y: 80,
                    fields: { OP: 'input_state_binary' },
                    inputs: { USAGE: { block: { type: 'usage_all', fields: { USAGE: '000700e0' } } } }
                }]
            }
        }
    },
    scale_mouse: {
        name: 'Scale Mouse Speed',
        workspace: {
            blocks: {
                languageVersion: 0,
                blocks: [{
                    type: 'arithmetic', x: 150, y: 80,
                    fields: { OP: 'mul' },
                    inputs: {
                        A: { block: { type: 'input_state', fields: { OP: 'input_state' }, inputs: { USAGE: { block: { type: 'usage_all', fields: { USAGE: '00010030' } } } } } },
                        B: { block: { type: 'number', fields: { NUM: 0.5 } } }
                    }
                }]
            }
        }
    },
    invert_axis: {
        name: 'Invert Mouse Y',
        workspace: {
            blocks: {
                languageVersion: 0,
                blocks: [{
                    type: 'arithmetic', x: 150, y: 80,
                    fields: { OP: 'mul' },
                    inputs: {
                        A: { block: { type: 'input_state', fields: { OP: 'input_state' }, inputs: { USAGE: { block: { type: 'usage_all', fields: { USAGE: '00010031' } } } } } },
                        B: { block: { type: 'number', fields: { NUM: -1 } } }
                    }
                }]
            }
        }
    },
    if_then_else: {
        name: 'If Button Then Value',
        workspace: {
            blocks: {
                languageVersion: 0,
                blocks: [{
                    type: 'ifte', x: 150, y: 80,
                    inputs: {
                        X: { block: { type: 'input_state', fields: { OP: 'input_state_binary' }, inputs: { USAGE: { block: { type: 'usage_all', fields: { USAGE: '000700e0' } } } } } },
                        Y: { block: { type: 'number', fields: { NUM: 100 } } },
                        Z: { block: { type: 'number', fields: { NUM: 0 } } }
                    }
                }]
            }
        }
    },
    clamp_value: {
        name: 'Clamp to Range',
        workspace: {
            blocks: {
                languageVersion: 0,
                blocks: [{
                    type: 'clamp', x: 150, y: 80,
                    fields: { Y: 0, Z: 255 },
                    inputs: {
                        X: { block: { type: 'input_state', fields: { OP: 'input_state' }, inputs: { USAGE: { block: { type: 'usage_all', fields: { USAGE: '00010030' } } } } } }
                    }
                }]
            }
        }
    },
    two_keys_and: {
        name: 'Two Keys Combo (AND)',
        workspace: {
            blocks: {
                languageVersion: 0,
                blocks: [{
                    type: 'andor', x: 150, y: 80,
                    fields: { OP: 'mul' },
                    inputs: {
                        A: { block: { type: 'input_state', fields: { OP: 'input_state_binary' }, inputs: { USAGE: { block: { type: 'usage_all', fields: { USAGE: '000700e0' } } } } } },
                        B: { block: { type: 'input_state', fields: { OP: 'input_state_binary' }, inputs: { USAGE: { block: { type: 'usage_all', fields: { USAGE: '000700e1' } } } } } }
                    }
                }]
            }
        }
    },
    compare_threshold: {
        name: 'Axis Above Threshold',
        workspace: {
            blocks: {
                languageVersion: 0,
                blocks: [{
                    type: 'comparison', x: 150, y: 80,
                    fields: { OP: 'gt' },
                    inputs: {
                        A: { block: { type: 'input_state', fields: { OP: 'input_state' }, inputs: { USAGE: { block: { type: 'usage_all', fields: { USAGE: '00010030' } } } } } },
                        B: { block: { type: 'number', fields: { NUM: 50 } } }
                    }
                }]
            }
        }
    },
};

const toolbox = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category',
            name: 'Input',
            colour: '260',
            contents: [
                { kind: 'label', text: 'Read a button or axis value' },
                {
                    kind: 'block', type: 'input_state',
                    inputs: { USAGE: { shadow: { type: 'usage_all', fields: { USAGE: '00010030' } } } }
                },
                { kind: 'sep', gap: '24' },
                { kind: 'label', text: 'All inputs (mouse, keys, gamepad)' },
                { kind: 'block', type: 'usage_all' },
                { kind: 'sep', gap: '24' },
                { kind: 'label', text: 'Filter by device' },
                { kind: 'block', type: 'usage_mouse' },
                { kind: 'block', type: 'usage_kbmods' },
                { kind: 'block', type: 'usage_gamepad' },
                { kind: 'block', type: 'usage_button' },
                { kind: 'sep', gap: '24' },
                { kind: 'label', text: 'Custom HID Usage Code' },
                { kind: 'block', type: 'usage', fields: { USAGE: '00010030' } },
            ]
        },
        {
            kind: 'category',
            name: 'Logic',
            colour: '340',
            contents: [
                { kind: 'label', text: 'Conditions' },
                { kind: 'block', type: 'ifte' },
                { kind: 'sep', gap: '16' },
                { kind: 'label', text: 'Compare Values' },
                { kind: 'block', type: 'comparison' },
                { kind: 'sep', gap: '16' },
                { kind: 'label', text: 'Combine Conditions' },
                { kind: 'block', type: 'andor' },
                { kind: 'block', type: 'not' },
            ]
        },
        {
            kind: 'category',
            name: 'Math',
            colour: '120',
            contents: [
                { kind: 'label', text: 'Values' },
                { kind: 'block', type: 'number', fields: { NUM: 0 } },
                { kind: 'sep', gap: '16' },
                { kind: 'label', text: 'Arithmetic' },
                { kind: 'block', type: 'arithmetic' },
                { kind: 'sep', gap: '16' },
                { kind: 'label', text: 'Limits & Rounding' },
                { kind: 'block', type: 'minmax' },
                { kind: 'block', type: 'clamp', fields: { Y: 0, Z: 255 } },
                { kind: 'block', type: 'round' },
                { kind: 'block', type: 'abssign' },
            ]
        },
        {
            kind: 'category',
            name: 'Memory',
            colour: '210',
            contents: [
                { kind: 'label', text: 'Save a value to use later' },
                { kind: 'block', type: 'store', fields: { REGISTER: 1 } },
                { kind: 'sep', gap: '16' },
                { kind: 'label', text: 'Load a saved value' },
                { kind: 'block', type: 'recall', fields: { REGISTER: 1 } },
            ]
        },
        {
            kind: 'category',
            name: 'Time',
            colour: '45',
            contents: [
                { kind: 'label', text: 'Current time' },
                { kind: 'block', type: 'time' },
            ]
        },
        {
            kind: 'category',
            name: 'Trig / Advanced',
            colour: '180',
            contents: [
                { kind: 'block', type: 'sincos' },
                { kind: 'block', type: 'atan2' },
                { kind: 'block', type: 'sqrt' },
                { kind: 'block', type: 'squared' },
            ]
        },
    ]
};

Blockly.defineBlocksWithJsonArray([
    {
        "type": "input_state",
        "message0": "%1 of %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "OP",
                "options": [
                    ["state", "input_state"],
                    ["previous state", "prev_input_state"],
                    ["0/1 state", "input_state_binary"],
                    ["previous 0/1 state", "prev_input_state_binary"],
                ],
            },
            {
                "type": "input_value",
                "name": "USAGE",
                "check": "Usage",
            },
        ],
        "colour": 260,
        "output": 'Number',
        "inputsInline": true,
        "tooltip": "Read the current value of an input (button, axis, etc.)",
    },
    {
        "type": "store",
        "message0": "set register %1 to %2",
        "args0": [
            {
                "type": "field_number",
                "name": "REGISTER",
                "min": 1,
                "max": 32,
                "precision": 1,
            },
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "Number",
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 210,
        "tooltip": "Save a value into a register (1-32) for later use",
    },
    {
        "type": "recall",
        "message0": "register %1",
        "args0": [
            {
                "type": "field_number",
                "name": "REGISTER",
                "min": 1,
                "max": 32,
                "precision": 1,
            },
        ],
        "colour": 210,
        "output": "Number",
        "tooltip": "Fetch a previously stored value from a register",
    },
    {
        'type': 'number',
        'message0': '%1',
        'args0': [
            {
                'type': 'field_number',
                'name': 'NUM',
                'value': 0,
            },
        ],
        "colour": 120,
        "output": "Number",
        "tooltip": "A constant number value",
    },
    {
        'type': 'usage',
        'message0': '0x%1',
        'args0': [
            {
                'type': 'field_input',
                'name': 'USAGE',
                'value': 0,
            },
        ],
        "colour": 260,
        "output": 'Usage',
        "tooltip": "A custom HID usage code in hex (e.g. 00070004 = keyboard A)",
    },
    {
        "type": "usage_all",
        "message0": "%1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "USAGE",
                "options": [
                    ["Cursor X", "00010030"],
                    ["Cursor Y", "00010031"],
                    ["V Scroll", "00010038"],
                    ["H Scroll", "000c0238"],
                    ["Left Click", "00090001"],
                    ["Right Click", "00090002"],
                    ["Middle Click", "00090003"],
                    ["Back", "00090004"],
                    ["Forward", "00090005"],
                    ["Left Ctrl", "000700e0"],
                    ["Left Shift", "000700e1"],
                    ["Left Alt", "000700e2"],
                    ["Left Win", "000700e3"],
                    ["Right Ctrl", "000700e4"],
                    ["Right Shift", "000700e5"],
                    ["Right Alt", "000700e6"],
                    ["Right Win", "000700e7"],
                    ["Left Stick X", "00010032"],
                    ["Left Stick Y", "00010035"],
                    ["R Stick X", "00010033"],
                    ["R Stick Y", "00010034"],
                    ["D-pad Left", "fff90001"],
                    ["D-pad Right", "fff90002"],
                    ["D-pad Up", "fff90003"],
                    ["D-pad Down", "fff90004"],
                    ["Button 6", "00090006"],
                    ["Button 7", "00090007"],
                    ["Button 8", "00090008"],
                ],
            },
        ],
        "colour": 260,
        "output": 'Usage',
        "tooltip": "Pick any common input - mouse, keyboard, or gamepad",
    },
    {
        "type": "usage_mouse",
        "message0": "%1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "USAGE",
                "options": [
                    ["Cursor X", "00010030"],
                    ["Cursor Y", "00010031"],
                    ["V scroll", "00010038"],
                    ["H scroll", "000c0238"],
                    ["Left button", "00090001"],
                    ["Right button", "00090002"],
                    ["Middle button", "00090003"],
                    ["Back", "00090004"],
                    ["Forward", "00090005"],
                ],
            },
        ],
        "colour": 260,
        "output": 'Usage',
        "tooltip": "Select a mouse input",
    },
    {
        "type": "usage_gamepad",
        "message0": "%1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "USAGE",
                "options": [
                    ["Button 1", "00090001"],
                    ["Button 2", "00090002"],
                    ["Button 3", "00090003"],
                    ["Button 4", "00090004"],
                    ["Button 5", "00090005"],
                    ["Button 6", "00090006"],
                    ["Button 7", "00090007"],
                    ["Button 8", "00090008"],
                    ["Button 9", "00090009"],
                    ["Button 10", "0009000a"],
                    ["Button 11", "0009000b"],
                    ["Button 12", "0009000c"],
                    ["Button 13", "0009000d"],
                    ["Button 14", "0009000e"],
                    ["Button 15", "0009000f"],
                    ["Button 16", "00090010"],
                    ["Left stick X", "00010030"],
                    ["Left stick Y", "00010031"],
                    ["Right stick X", "00010032"],
                    ["Right stick Y", "00010035"],
                    ["D-pad left", "fff90001"],
                    ["D-pad right", "fff90002"],
                    ["D-pad up", "fff90003"],
                    ["D-pad down", "fff90004"],
                    ["L2 axis", "00010033"],
                    ["R2 axis", "00010034"],
                ],
            },
        ],
        "colour": 260,
        "output": 'Usage',
        "tooltip": "Select a gamepad input",
    },
    {
        "type": "usage_kbmods",
        "message0": "%1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "USAGE",
                "options": [
                    ["Left Control", "000700e0"],
                    ["Left Shift", "000700e1"],
                    ["Left Alt", "000700e2"],
                    ["Left GUI", "000700e3"],
                    ["Right Control", "000700e4"],
                    ["Right Shift", "000700e5"],
                    ["Right Alt", "000700e6"],
                    ["Right GUI", "000700e7"],
                ],
            },
        ],
        "colour": 260,
        "output": 'Usage',
        "tooltip": "Select a keyboard modifier key",
    },
    {
        'type': 'usage_button',
        'message0': 'Button %1',
        'args0': [
            {
                'type': 'field_number',
                'name': 'NUM',
                'value': 1,
                "min": 1,
                "max": 65535,
                "precision": 1,
            },
        ],
        "colour": 260,
        "output": 'Usage',
        "tooltip": "A button by its number",
    },
    {
        'type': 'arithmetic',
        'message0': '%1 %2 %3',
        'args0': [
            {
                'type': 'input_value',
                'name': 'A',
                'check': 'Number',
            },
            {
                'type': 'field_dropdown',
                'name': 'OP',
                'options': [
                    ['%{BKY_MATH_ADDITION_SYMBOL}', 'add'],
                    ['%{BKY_MATH_SUBTRACTION_SYMBOL}', 'sub'],
                    ['%{BKY_MATH_MULTIPLICATION_SYMBOL}', 'mul'],
                    ['%{BKY_MATH_DIVISION_SYMBOL}', 'div'],
                    ['%', 'mod'],
                ],
            },
            {
                'type': 'input_value',
                'name': 'B',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        'output': "Number",
        "colour": 120,
        "tooltip": "Arithmetic: add, subtract, multiply, divide, or modulo",
    },
    {
        'type': 'comparison',
        'message0': '%1 %2 %3',
        'args0': [
            {
                'type': 'input_value',
                'name': 'A',
                'check': 'Number',
            },
            {
                'type': 'field_dropdown',
                'name': 'OP',
                'options': [
                    ['=', 'eq'],
                    ['<', 'lt'],
                    ['>', 'gt'],
                ],
            },
            {
                'type': 'input_value',
                'name': 'B',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        'output': "Number",
        "colour": 340,
        "tooltip": "Compare two values: returns 1 if true, 0 if false",
    },
    {
        'type': 'andor',
        'message0': '%1 %2 %3',
        'args0': [
            {
                'type': 'input_value',
                'name': 'A',
                'check': 'Number',
            },
            {
                'type': 'field_dropdown',
                'name': 'OP',
                'options': [
                    ['and', 'mul'],
                    ['or', 'bitwise_or'],
                ],
            },
            {
                'type': 'input_value',
                'name': 'B',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        'output': "Number",
        "colour": 340,
        "tooltip": "Combine two conditions with AND or OR",
    },
    {
        'type': 'not',
        'message0': 'not %1',
        'args0': [
            {
                'type': 'input_value',
                'name': 'VALUE',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        'output': "Number",
        "colour": 340,
        "tooltip": "Invert: returns 1 if input is 0, otherwise 0",
    },
    {
        'type': 'ifte',
        'message0': 'if %1 then %2 else %3',
        'args0': [
            {
                'type': 'input_value',
                'name': 'X',
                'check': 'Number',
            },
            {
                'type': 'input_value',
                'name': 'Y',
                'check': 'Number',
            },
            {
                'type': 'input_value',
                'name': 'Z',
                'check': 'Number',
            },
        ],
        'output': "Number",
        "colour": 340,
        "tooltip": "If condition is non-zero, return 'then' value, otherwise return 'else' value",
    },
    {
        'type': 'minmax',
        'message0': '%1 %2,%3',
        'args0': [
            {
                'type': 'field_dropdown',
                'name': 'OP',
                'options': [
                    ['minimum of', 'min'],
                    ['maximum of', 'max'],
                ],
            },
            {
                'type': 'input_value',
                'name': 'A',
                'check': 'Number',
            },
            {
                'type': 'input_value',
                'name': 'B',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        'output': "Number",
        "colour": 120,
        "tooltip": "Return the smaller or larger of two values",
    },
    {
        'type': 'sincos',
        'message0': '%1(%2)',
        'args0': [
            {
                'type': 'field_dropdown',
                'name': 'OP',
                'options': [
                    ['sin', 'sin'],
                    ['cos', 'cos'],
                ],
            },
            {
                'type': 'input_value',
                'name': 'VALUE',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        'output': "Number",
        "colour": 180,
    },
    {
        'type': 'atan2',
        'message0': 'atan2(%1,%2)',
        'args0': [
            {
                'type': 'input_value',
                'name': 'A',
                'check': 'Number',
            },
            {
                'type': 'input_value',
                'name': 'B',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        'output': "Number",
        "colour": 180,
    },
    {
        'type': 'abssign',
        'message0': '%1 %2',
        'args0': [
            {
                'type': 'field_dropdown',
                'name': 'OP',
                'options': [
                    ['absolute value of', 'abs'],
                    ['sign of', 'sign'],
                ],
            },
            {
                'type': 'input_value',
                'name': 'VALUE',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        'output': "Number",
        "colour": 120,
    },
    {
        'type': 'sqrt',
        'message0': 'square root of %1',
        'args0': [
            {
                'type': 'input_value',
                'name': 'VALUE',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        'output': "Number",
        "colour": 180,
    },
    {
        'type': 'squared',
        'message0': 'squared %1',
        'args0': [
            {
                'type': 'input_value',
                'name': 'VALUE',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        'output': "Number",
        "colour": 180,
    },
    {
        'type': 'round',
        'message0': 'rounded %1',
        'args0': [
            {
                'type': 'input_value',
                'name': 'VALUE',
                'check': 'Number',
            },
        ],
        'inputsInline': true,
        'output': "Number",
        "colour": 120,
    },
    {
        'type': 'clamp',
        'message0': 'constrain %1\nbetween %2 and %3',
        'args0': [
            {
                'type': 'input_value',
                'name': 'X',
                'check': 'Number',
            },
            {
                'type': 'field_number',
                'name': 'Y',
            },
            {
                'type': 'field_number',
                'name': 'Z',
            },
        ],
        'output': "Number",
        "colour": 120,
        "tooltip": "Constrain a value within a minimum and maximum range",
    },
    {
        'type': 'time',
        'message0': 'time in %1',
        'args0': [
            {
                'type': 'field_dropdown',
                'name': 'OP',
                'options': [
                    ['seconds', 'time_sec'],
                    ['milliseconds', 'time'],
                ],
            },
        ],
        'output': "Number",
        "colour": 45,
        "tooltip": "Current time since device started",
    },
]);

const expressionGenerator = new Blockly.Generator('Expression');

expressionGenerator.scrub_ = function (block, code, thisOnly) {
    const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
        return code + '\n' + expressionGenerator.blockToCode(nextBlock);
    }
    return code;
};

expressionGenerator.forBlock['input_state'] = function (block, generator) {
    const op = block.getFieldValue('OP');
    const usage = generator.valueToCode(block, 'USAGE', 0);
    return [`${usage}${op}\n`, 0];
};

expressionGenerator.forBlock['store'] = function (block, generator) {
    const register_number = block.getFieldValue('REGISTER');
    const value_code = generator.valueToCode(block, 'VALUE', 0);
    return `${value_code}${register_number} store\n`;
};

expressionGenerator.forBlock['recall'] = function (block, generator) {
    const register_number = block.getFieldValue('REGISTER');
    return [`${register_number} recall\n`, 0];
};

expressionGenerator.forBlock['number'] = function (block, generator) {
    const num = block.getFieldValue('NUM');
    return [`${num}\n`, 0];
};

function usage_generator(block, generator) {
    const usage = block.getFieldValue('USAGE');
    return [`0x${usage} `, 0];
};

expressionGenerator.forBlock['usage'] = usage_generator;
expressionGenerator.forBlock['usage_all'] = usage_generator;
expressionGenerator.forBlock['usage_mouse'] = usage_generator;
expressionGenerator.forBlock['usage_gamepad'] = usage_generator;
expressionGenerator.forBlock['usage_kbmods'] = usage_generator;

expressionGenerator.forBlock['usage_button'] = function (block, generator) {
    const num = block.getFieldValue('NUM');
    const usage = (0x00090000 + num).toString(16).padStart(8, "0");
    return [`0x${usage} `, 0];
};

function binary_op_generator(block, generator) {
    const op = block.getFieldValue('OP');
    const a_code = generator.valueToCode(block, 'A', 0);
    const b_code = generator.valueToCode(block, 'B', 0);
    return [`${a_code}${b_code}${op}\n`, 0];
};

function unary_op_generator(block, generator) {
    const op = block.getFieldValue('OP');
    const value_code = generator.valueToCode(block, 'VALUE', 0);
    return [`${value_code}${op}\n`, 0];
};

function unary_single_op_generator(op) {
    return function (block, generator) {
        const value_code = generator.valueToCode(block, 'VALUE', 0);
        return [`${value_code}${op}\n`, 0];
    }
};

function ternary_single_op_generator(op) {
    return function (block, generator) {
        const x_code = generator.valueToCode(block, 'X', 0);
        const y_code = generator.valueToCode(block, 'Y', 0);
        const z_code = generator.valueToCode(block, 'Z', 0);
        return [`${x_code}${y_code}${z_code}${op}\n`, 0];
    }
};

expressionGenerator.forBlock['arithmetic'] = binary_op_generator;
expressionGenerator.forBlock['comparison'] = binary_op_generator;
expressionGenerator.forBlock['andor'] = binary_op_generator;
expressionGenerator.forBlock['minmax'] = binary_op_generator;
expressionGenerator.forBlock['sincos'] = unary_op_generator;
expressionGenerator.forBlock['abssign'] = unary_op_generator;

expressionGenerator.forBlock['not'] = unary_single_op_generator('not');
expressionGenerator.forBlock['sqrt'] = unary_single_op_generator('sqrt');
expressionGenerator.forBlock['squared'] = unary_single_op_generator('dup mul');
expressionGenerator.forBlock['round'] = unary_single_op_generator('round');

expressionGenerator.forBlock['ifte'] = ternary_single_op_generator('ifte');

expressionGenerator.forBlock['clamp'] = function (block, generator) {
    const x_code = generator.valueToCode(block, 'X', 0);
    const y_code = block.getFieldValue('Y');
    const z_code = block.getFieldValue('Z');
    return [`${x_code}${y_code} ${z_code} clamp\n`, 0];
};

expressionGenerator.forBlock['atan2'] = function (block, generator) {
    const a_code = generator.valueToCode(block, 'A', 0);
    const b_code = generator.valueToCode(block, 'B', 0);
    return [`${a_code}${b_code}atan2\n`, 0];
};

expressionGenerator.forBlock['time'] = function (block, generator) {
    const op = block.getFieldValue('OP');
    return [`${op}\n`, 0];
};

let darkTheme;
try {
    darkTheme = Blockly.Theme.defineTheme('dark', {
        base: Blockly.Themes.Classic,
        componentStyles: {
            workspaceBackgroundColour: '#1a1a2e',
            toolboxBackgroundColour: '#16213e',
            toolboxForegroundColour: '#e0e0e0',
            flyoutBackgroundColour: '#1e2a4a',
            flyoutForegroundColour: '#e0e0e0',
            flyoutOpacity: 1,
            scrollbarColour: '#4a4a6a',
            scrollbarOpacity: 0.6,
            insertionMarkerColour: '#fff',
            insertionMarkerOpacity: 0.3,
            cursorColour: '#d0d0d0',
        },
        fontStyle: {
            family: '"Segoe UI", Roboto, sans-serif',
            size: 11,
        },
    });
} catch (e) {
    darkTheme = undefined;
}

const workspaceConfig = {
    media: 'blockly/media/',
    toolbox: toolbox,
    collapse: true,
    grid: {
        spacing: 25,
        length: 3,
        colour: '#2d2d44',
        snap: true,
    },
    move: {
        scrollbars: {
            vertical: true,
            horizontal: true,
        },
    },
};

if (darkTheme) {
    workspaceConfig.theme = darkTheme;
}

const workspace = Blockly.inject('blocklyDiv', workspaceConfig);

const supportedEvents = new Set([
    Blockly.Events.BLOCK_CHANGE,
    Blockly.Events.BLOCK_CREATE,
    Blockly.Events.BLOCK_DELETE,
    Blockly.Events.BLOCK_MOVE,
]);

function updateCode(event) {
    if (workspace.isDragging()) return;
    if (!supportedEvents.has(event.type)) return;

    const code = expressionGenerator.workspaceToCode(workspace);
    document.getElementById('code').value = code;
}

workspace.addChangeListener(updateCode);

function loadTemplate(key) {
    const template = TEMPLATES[key];
    if (!template) return;
    Blockly.serialization.workspaces.load(template.workspace, workspace);
}

const KNOWN_USAGES = new Set([
    '00010030','00010031','00010038','000c0238',
    '00090001','00090002','00090003','00090004','00090005',
    '000700e0','000700e1','000700e2','000700e3',
    '000700e4','000700e5','000700e6','000700e7',
    '00010032','00010033','00010034','00010035',
    'fff90001','fff90002','fff90003','fff90004',
    '00090006','00090007','00090008',
]);

function parseExpressionToWorkspace(exprText) {
    if (!exprText || !exprText.trim()) return false;
    const tokens = exprText.trim().split(/\s+/);
    const stack = [];
    const inputOps = ['input_state','prev_input_state','input_state_binary','prev_input_state_binary'];

    try {
        for (let i = 0; i < tokens.length; i++) {
            const t = tokens[i];

            if (/^0x[0-9a-fA-F]{4,8}$/.test(t)) {
                const code = t.slice(2).toLowerCase().padStart(8, '0');
                stack.push(KNOWN_USAGES.has(code)
                    ? { type: 'usage_all', fields: { USAGE: code } }
                    : { type: 'usage', fields: { USAGE: code } });
                continue;
            }

            if (/^-?\d+(\.\d+)?$/.test(t)) {
                stack.push({ type: 'number', fields: { NUM: parseFloat(t) } });
                continue;
            }

            if (inputOps.includes(t)) {
                if (stack.length < 1) return false;
                stack.push({ type: 'input_state', fields: { OP: t }, inputs: { USAGE: { block: stack.pop() } } });
                continue;
            }

            if (t === 'dup') {
                if (stack.length < 1) return false;
                stack.push(JSON.parse(JSON.stringify(stack[stack.length - 1])));
                continue;
            }

            if (['add','sub','mul','div','mod'].includes(t)) {
                if (stack.length < 2) return false;
                const b = stack.pop(), a = stack.pop();
                stack.push({ type: 'arithmetic', fields: { OP: t }, inputs: { A: { block: a }, B: { block: b } } });
                continue;
            }

            if (['eq','lt','gt'].includes(t)) {
                if (stack.length < 2) return false;
                const b = stack.pop(), a = stack.pop();
                stack.push({ type: 'comparison', fields: { OP: t }, inputs: { A: { block: a }, B: { block: b } } });
                continue;
            }

            if (t === 'bitwise_or') {
                if (stack.length < 2) return false;
                const b = stack.pop(), a = stack.pop();
                stack.push({ type: 'andor', fields: { OP: 'bitwise_or' }, inputs: { A: { block: a }, B: { block: b } } });
                continue;
            }

            if (t === 'not') {
                if (stack.length < 1) return false;
                stack.push({ type: 'not', inputs: { VALUE: { block: stack.pop() } } });
                continue;
            }

            if (t === 'ifte') {
                if (stack.length < 3) return false;
                const z = stack.pop(), y = stack.pop(), x = stack.pop();
                stack.push({ type: 'ifte', inputs: { X: { block: x }, Y: { block: y }, Z: { block: z } } });
                continue;
            }

            if (t === 'min' || t === 'max') {
                if (stack.length < 2) return false;
                const b = stack.pop(), a = stack.pop();
                stack.push({ type: 'minmax', fields: { OP: t }, inputs: { A: { block: a }, B: { block: b } } });
                continue;
            }

            if (t === 'clamp') {
                if (stack.length < 3) return false;
                const z = stack.pop(), y = stack.pop(), x = stack.pop();
                stack.push({ type: 'clamp',
                    fields: { Y: y.type === 'number' ? y.fields.NUM : 0, Z: z.type === 'number' ? z.fields.NUM : 255 },
                    inputs: { X: { block: x } }
                });
                continue;
            }

            if (t === 'sin' || t === 'cos') {
                if (stack.length < 1) return false;
                stack.push({ type: 'sincos', fields: { OP: t }, inputs: { VALUE: { block: stack.pop() } } });
                continue;
            }

            if (t === 'abs' || t === 'sign') {
                if (stack.length < 1) return false;
                stack.push({ type: 'abssign', fields: { OP: t }, inputs: { VALUE: { block: stack.pop() } } });
                continue;
            }

            if (t === 'atan2') {
                if (stack.length < 2) return false;
                const b = stack.pop(), a = stack.pop();
                stack.push({ type: 'atan2', inputs: { A: { block: a }, B: { block: b } } });
                continue;
            }

            if (t === 'sqrt') {
                if (stack.length < 1) return false;
                stack.push({ type: 'sqrt', inputs: { VALUE: { block: stack.pop() } } });
                continue;
            }

            if (t === 'round') {
                if (stack.length < 1) return false;
                stack.push({ type: 'round', inputs: { VALUE: { block: stack.pop() } } });
                continue;
            }

            if (t === 'time' || t === 'time_sec') {
                stack.push({ type: 'time', fields: { OP: t } });
                continue;
            }

            if (t === 'store') {
                if (stack.length < 2) return false;
                const regNum = stack.pop(), value = stack.pop();
                stack.push({ type: 'store',
                    fields: { REGISTER: regNum.type === 'number' ? regNum.fields.NUM : 1 },
                    inputs: { VALUE: { block: value } }
                });
                continue;
            }

            if (t === 'recall') {
                if (stack.length < 1) return false;
                const regNum = stack.pop();
                stack.push({ type: 'recall', fields: { REGISTER: regNum.type === 'number' ? regNum.fields.NUM : 1 } });
                continue;
            }

            return false;
        }

        if (stack.length === 0) return false;

        const blocks = [];
        let y = 80;
        for (const item of stack) {
            blocks.push({ ...item, x: 150, y });
            y += 150;
        }
        Blockly.serialization.workspaces.load({ blocks: { languageVersion: 0, blocks } }, workspace);
        return true;
    } catch (e) {
        return false;
    }
}

function download_json() {
    const element = document.createElement('a');
    const state = Blockly.serialization.workspaces.save(workspace);
    element.setAttribute('href', 'data:application/json,' + encodeURIComponent(JSON.stringify(state, null, 4)));
    element.setAttribute('download', 'expression-builder.json');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function upload_json() {
    document.getElementById("file_input").click();
}

function file_uploaded() {
    const reader = new FileReader();
    reader.onload = function (e) {
        const state = JSON.parse(e.target.result);
        Blockly.serialization.workspaces.load(state, workspace);
    };

    const file = document.getElementById("file_input").files[0];
    if (file !== undefined) {
        reader.readAsText(file);
    }

    document.getElementById("file_input").value = '';
}

document.getElementById("save_button").addEventListener("click", download_json);
document.getElementById("load_button").addEventListener("click", upload_json);
document.getElementById("file_input").addEventListener("change", file_uploaded);
