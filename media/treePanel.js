const _list = document.getElementById("componentListContainer");
const _canvas = document.getElementById("canvasContainer");
const treeListMap = {};
const virtualDom = {};
const cssClasses = {};

function elementTreeNode(_element) {
    _element.addEventListener("click", (event) => {
        const newElement = event.target.cloneNode(true);
        const newId = randomId(`instance`);
        newElement.dataset.componentId = newElement.dataset.id
        newElement.dataset.id = newId;
        newElement.textContent = `NEW ${newElement.textContent}`;
        _canvas.appendChild(elementHOC(newElement));
        // virtualDom.push(treeListMap[event.target.dataset.id]);
        virtualDom[newElement.dataset.id] = treeListMap[event.target.dataset.id];
        virtualDom[newElement.dataset.id].id = newId;
        window.postMessage({ command: 'codeUpdate', data: '' })
    });

    return _element;
}

function elementHOC(_element) {
    _element.addEventListener("mousedown", function(event) {
        var _target = _element;
        let shiftX = event.clientX - _target.getBoundingClientRect().left;
        let shiftY = event.clientY - _target.getBoundingClientRect().top;

        _target.style.position = "absolute";
        _target.style.zIndex = 1000;
        _canvas.append(_target);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            _target.style.left = pageX - shiftX + "px";
            _target.style.top = pageY - shiftY + "px";
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        _target.addEventListener("mousemove", onMouseMove);

        _target.addEventListener("mouseup", function() {
            _target.removeEventListener("mousemove", onMouseMove);
            _target.onmouseup = null;
            const newStyleClass = `.${_target.dataset.id} {
${_target.style.cssText}
}`
            cssClasses[_target.dataset.id] = newStyleClass
            virtualDom[_target.dataset.id].style = newStyleClass
            window.postMessage({ command: 'codeUpdate', data: '' })
        });
    });

    _element.addEventListener("dragstart", function() {
        return false;
    });

    return _element;
}

function loadTree(nodes) {
    for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i];

        var x = document.createElement("div");
        x.style.width = "130px";
        x.style.padding = "1rem";
        x.style.margin = "8px";
        x.style.backgroundColor = "grey";
        x.dataset.id = el.id;
        var t = document.createTextNode(el.name);
        x.appendChild(t);
        _list.appendChild(elementTreeNode(x));

        treeListMap[el.id] = {
            id: el.id,
            name: el.name,
            reactCode: el.reactCode,
            style: el.style
        }
    }
}