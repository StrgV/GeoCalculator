// Configure Cursor
window.addEventListener("load", (event) => {
    cursorEffect.rainbowCursor({
        colors: ["lightblue", "pink", "white", "pink", "lightblue"],
        length: 50,
        size: 5
    });
});

var cursorEffect = function(cursor) {
    "use strict";
    
    // Utility function to create and configure the canvas
    function createCanvas(container, isFixed, setDimensionsCallback) {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.style.pointerEvents = "none";
        
        if (isFixed) {
            canvas.style.position = "fixed";
            document.body.appendChild(canvas);
            setDimensionsCallback(canvas);
        } else {
            canvas.style.position = "absolute";
            container.appendChild(canvas);
            setDimensionsCallback(canvas);
        }
        return { canvas, context };
    }

    // Utility function to handle window resize
    function handleResize(container, canvas, isFixed) {
        if (isFixed) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        } else {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        }
    }
    // Function to create a rainbow cursor effect
    cursor.rainbowCursor = function(options) {
        let canvas, context, animationFrameId;
        let targetElement = options && options.element;
        let container = targetElement || document.body;
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        
        const cursorPosition = { x: windowWidth / 2, y: windowWidth / 2 };
        const trailParticles = [];
        const trailLength = options?.length || 20;
        const colors = options?.colors || ["#FE0000", "#FD8C00", "#FFE500", "#119F0B", "#0644B3", "#C22EDC"];
        const trailSize = options?.size || 3;
        let isDrawing = false;
        
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        // Initialize the effect
        function init() {
            if (prefersReducedMotion.matches) {
                console.log("This browser has prefers reduced motion turned on, so the cursor did not init");
                return false;
            }

            // Create and configure the canvas
            ({ canvas, context } = createCanvas(container, !targetElement, (c) => handleResize(container, c, !targetElement)));

            // Add event listeners
            container.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("resize", () => handleResize(container, canvas, !targetElement));
            
            // Start animation loop
            animate();
        }

        // Handle mouse move events
        function handleMouseMove(event) {
            if (targetElement) {
                const rect = container.getBoundingClientRect();
                cursorPosition.x = event.clientX - rect.left;
                cursorPosition.y = event.clientY - rect.top;
            } else {
                cursorPosition.x = event.clientX;
                cursorPosition.y = event.clientY;
            }

            if (!isDrawing) {
                isDrawing = true;
                for (let i = 0; i < trailLength; i++) {
                    trailParticles.push(new TrailParticle(cursorPosition.x, cursorPosition.y));
                }
            }
        }

        // Animation loop
        function animate() {
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            context.lineJoin = "round";
            let positions = [];
            let x = cursorPosition.x;
            let y = cursorPosition.y;

            trailParticles.forEach((particle, index, particles) => {
                let nextParticle = particles[index + 1] || particles[0];
                particle.position.x = x;
                particle.position.y = y;
                positions.push({ x, y });
                x += 0.4 * (nextParticle.position.x - particle.position.x);
                y += 0.4 * (nextParticle.position.y - particle.position.y);
            });

            colors.forEach((color, index) => {
                context.beginPath();
                context.strokeStyle = color;
                if (positions.length) {
                    context.moveTo(positions[0].x, positions[0].y + index * (trailSize - 1));
                }
                positions.forEach((pos, posIndex) => {
                    if (posIndex !== 0) {
                        context.lineTo(pos.x, pos.y + index * trailSize);
                    }
                });
                context.lineWidth = trailSize;
                context.lineCap = "round";
                context.stroke();
            });

            animationFrameId = requestAnimationFrame(animate);
        }

        // Destroy the effect
        function destroy() {
            canvas.remove();
            cancelAnimationFrame(animationFrameId);
            container.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", () => handleResize(container, canvas, !targetElement));
        }

        // TrailParticle class
        function TrailParticle(x, y) {
            this.position = { x, y };
        }

        // Handle changes in motion preferences
        prefersReducedMotion.onchange = () => {
            if (prefersReducedMotion.matches) {
                destroy();
            } else {
                init();
            }
        };

        init();

        return {
            destroy
        };
    };

    Object.defineProperty(cursor, "__esModule", {
        value: true
    });
    
    return cursor;
}({});




