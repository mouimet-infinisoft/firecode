export const fireMouseMoveWebView = () => `<!DOCTYPE html>
<html>

<head> </head>

<body>
    <h1>WYSYWYG Tests</h1>
dd
    <div style="display: flex; width: 95vw; height: 800px; border: 1px black solid">
        <div style="flex: 1 1 15%; height: 100%; border: 1px blue solid">
            <div style="height: 100px; width: 100px; background-color: red" id="ball">
                This element is draggable.
            </div>
        </div>

        <div style="flex: 2 1 85%; height: 100%; border: 1px red solid" id="target">
            Toolbar
        </div>
    </div>




    <script>
        var ball = document.getElementById('ball');
        ball.addEventListener('mousedown', function(event) {
            let shiftX = event.clientX - ball.getBoundingClientRect().left;
            let shiftY = event.clientY - ball.getBoundingClientRect().top;

            ball.style.position = "absolute";
            ball.style.zIndex = 1000;
            document.body.append(ball);

            moveAt(event.pageX, event.pageY);

            // moves the ball at (pageX, pageY) coordinates
            // taking initial shifts into account
            function moveAt(pageX, pageY) {
                ball.style.left = pageX - shiftX + "px";
                ball.style.top = pageY - shiftY + "px";
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            // move the ball on mousemove
            document.addEventListener("mousemove", onMouseMove);

            // drop the ball, remove unneeded handlers
            ball.addEventListener('mouseup', function() {
                document.removeEventListener("mousemove", onMouseMove);
                ball.onmouseup = null;
            });
        });

        ball.addEventListener('dragstart', function() {
            return false;
        });
    </script>
</body>

</html>
`;