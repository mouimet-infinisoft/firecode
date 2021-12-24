const fs = require('fs');

function generateCode() {
    const containerDomNodeKeys = Object.keys(virtualDom);

    let innerCode = "";
    let innerImports = "import React from 'react';";
    let styleCode = "";

    for (let i = 0; i < containerDomNodeKeys.length; i++) {
        if (cssClasses[containerDomNodeKeys[i]]) {
            styleCode = `${styleCode}
${cssClasses[containerDomNodeKeys[i]]}
`;
        }

        const virtualComponent = virtualDom[containerDomNodeKeys[i]];
        let component = `<${virtualComponent.name} />`;

        if (virtualComponent.style) {
            component = `<${virtualComponent.name} className="${virtualComponent.id}"/>`;
        }
        innerImports = `${innerImports}
import {${virtualComponent.name}} from './components/${virtualComponent.name}/index.jsx';`;

        innerCode = `${innerCode}
${component}
`;
    }

    if (styleCode) {
        innerImports = `${innerImports}
import './styles.css';`;
    }

    return {
        reactCode: {
            imports: innerImports,
            code: innerCode,
            full: `${innerImports}
${innerCode}`
        },
        style: styleCode,
    };
}

function saveCode() {
    const result = generateCode()

    fs.writeFileSync('./react.jsx', result.reactCode.full);
}