var cursorEffects = function(library) {
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

    // Function to create a fairy dust cursor effect
    library.fairyDustCursor = function(options) {
        let colors = options && options.colors || ["#D61C59", "#E7D84B", "#1B8798"];
        let targetElement = options && options.element;
        let container = targetElement || document.body;
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        
        const cursorPosition = { x: windowWidth / 2, y: windowWidth / 2 };
        const lastPosition = { x: windowWidth / 2, y: windowWidth / 2 };
        const particles = [];
        const canvases = [];
        let canvas, context, animationFrameId;
        
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        // Initialize the effect
        function init() {
            if (prefersReducedMotion.matches) {
                console.log("This browser has prefers reduced motion turned on, so the cursor did not init");
                return false;
            }

            // Create and configure the canvas
            ({ canvas, context } = createCanvas(container, !targetElement, (c) => handleResize(container, c, !targetElement)));

            context.font = "21px serif";
            context.textBaseline = "middle";
            context.textAlign = "center";

            // Create colored star canvases
            colors.forEach(color => {
                let textSize = context.measureText("*");
                let starCanvas = document.createElement("canvas");
                let starContext = starCanvas.getContext("2d");
                starCanvas.width = textSize.width;
                starCanvas.height = textSize.actualBoundingBoxAscent + textSize.actualBoundingBoxDescent;
                starContext.fillStyle = color;
                starContext.textAlign = "center";
                starContext.font = "21px serif";
                starContext.textBaseline = "middle";
                starContext.fillText("*", starCanvas.width / 2, textSize.actualBoundingBoxAscent);
                canvases.push(starCanvas);
            });

            // Add event listeners
            container.addEventListener("mousemove", handleMouseMove);
            container.addEventListener("touchmove", handleTouchMove, { passive: true });
            container.addEventListener("touchstart", handleTouchMove, { passive: true });
            window.addEventListener("resize", () => handleResize(container, canvas, !targetElement));
            
            // Start animation loop
            animate();
        }

        // Utility function to get a random canvas
        function getRandomCanvas() {
            return canvases[Math.floor(Math.random() * canvases.length)];
        }

        // Handle touch move events
        function handleTouchMove(event) {
            if (event.touches.length > 0) {
                for (let i = 0; i < event.touches.length; i++) {
                    createParticle(event.touches[i].clientX, event.touches[i].clientY, getRandomCanvas());
                }
            }
        }

        // Handle mouse move events
        function handleMouseMove(event) {
            window.requestAnimationFrame(() => {
                if (targetElement) {
                    const rect = container.getBoundingClientRect();
                    cursorPosition.x = event.clientX - rect.left;
                    cursorPosition.y = event.clientY - rect.top;
                } else {
                    cursorPosition.x = event.clientX;
                    cursorPosition.y = event.clientY;
                }

                if (Math.hypot(cursorPosition.x - lastPosition.x, cursorPosition.y - lastPosition.y) > 1.5) {
                    createParticle(cursorPosition.x, cursorPosition.y, getRandomCanvas());
                    lastPosition.x = cursorPosition.x;
                    lastPosition.y = cursorPosition.y;
                }
            });
        }

        // Create a new particle
        function createParticle(x, y, starCanvas) {
            particles.push(new Particle(x, y, starCanvas));
        }

        // Animation loop
        function animate() {
            if (particles.length > 0) {
                context.clearRect(0, 0, window.innerWidth, window.innerHeight);

                for (let i = 0; i < particles.length; i++) {
                    particles[i].update(context);
                }

                for (let i = particles.length - 1; i >= 0; i--) {
                    if (particles[i].lifeSpan < 0) {
                        particles.splice(i, 1);
                    }
                }

                if (particles.length === 0) {
                    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        }

        // Destroy the effect
        function destroy() {
            canvas.remove();
            cancelAnimationFrame(animationFrameId);
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("touchstart", handleTouchMove);
            window.removeEventListener("resize", () => handleResize(container, canvas, !targetElement));
        }

        // Particle class
        function Particle(x, y, starCanvas) {
            const lifeSpan = Math.floor(30 * Math.random() + 60);
            this.initialLifeSpan = lifeSpan;
            this.lifeSpan = lifeSpan;
            this.velocity = {
                x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                y: 0.7 * Math.random() + 0.9
            };
            this.position = { x, y };
            this.starCanvas = starCanvas;

            this.update = function(context) {
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
                this.lifeSpan--;
                this.velocity.y += 0.02;

                const scale = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
                context.drawImage(this.starCanvas, this.position.x - this.starCanvas.width / 2 * scale, this.position.y - this.starCanvas.height / 2, this.starCanvas.width * scale, this.starCanvas.height * scale);
            };
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

    // Function to create a rainbow cursor effect
    library.rainbowCursor = function(options) {
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

    Object.defineProperty(library, "__esModule", {
        value: true
    });
    
    return library;
}({});

window.addEventListener("load", (event) => {
    if (localStorage.getItem("cursorSetting") == "disable") {
        return;
    }

    cursorEffects.fairyDustCursor({
        colors: ["#5BCEFA", "#F5A9B8", "#FFFFFF"],
    });
    cursorEffects.rainbowCursor({
        colors: ["lightblue", "pink", "white", "pink", "lightblue"],
        length: 50,
        size: 5
    });
});

window.onload = function setUpEnableCursor() {
    // Footer toggle cursor switch    
    /** @type {HTMLInputElement} */
    let enableCursor = document.getElementById("enablecursor");
    enableCursor.checked = localStorage.getItem("cursorSetting") != "disable";
    enableCursor.onchange = function toggleCursor() {
        if (enableCursor.checked) {
            if (localStorage.getItem("cursorSetting") != null) {
                localStorage.removeItem("cursorSetting");
            }
        }
        else {
            localStorage.setItem("cursorSetting", "disable");
        }

        location.reload();
    }
}

