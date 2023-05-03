// Set up canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const gridSizeX = canvas.width / gridSize;
const gridSizeY = canvas.height / gridSize;

// Set up snake and food
let snake = [{ x: gridSizeX / 2, y: gridSizeY / 2 }];
let food = { x: getRandomInt(gridSizeX), y: getRandomInt(gridSizeY) };
let dx = 1;
let dy = 0;
let score = 0;

// Update snake position and check for collisions
function update() {
// Move snake in the current direction
const head = { x: snake[0].x + dx, y: snake[0].y + dy };
snake.unshift(head);

// Check if snake has collided with wall or itself
if (
head.x < 0 || head.x>= gridSizeX ||
    head.y < 0 || head.y>= gridSizeY ||
        snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
        gameOver();
        }

        // Check if snake has eaten food
        if (head.x === food.x && head.y === food.y) {
        score++;
        createFood();
        } else {
        snake.pop();
        }
        }

        // Draw snake and food on canvas
        function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();
        drawScore();
        }

        // Draw snake on canvas
        function drawSnake() {
        ctx.fillStyle = "green";
        snake.forEach((segment) => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });
        }

        // Draw food on canvas
        function drawFood() {
        ctx.fillStyle = "red";
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
        }

        // Draw score on canvas
        function drawScore() {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${score}`, 10, 30);
        }

        // Create new food at random position
        function createFood() {
        food = { x: getRandomInt(gridSizeX), y: getRandomInt(gridSizeY) };
        while (snake.some((segment) => segment.x === food.x && segment.y === food.y)) {
        food = { x: getRandomInt(gridSizeX), y: getRandomInt(gridSizeY) };
        }
        }

        // Game over function
        function gameOver() {
        alert(`Game over! Your score was ${score}.`);
        location.reload();
        }

        // Helper function to get random integer
        function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
        }

        // Handle keyboard input
        document.addEventListener("keydown", (event) => {
        if (event.code === "ArrowLeft" && dx !== 1) {
        dx = -1;
        dy = 0;
        } else if (event.code === "ArrowUp" && dy !== 1) {
        dx = 0;
        dy = -1;
        } else if (event.code === "ArrowRight" && dx !== -1) {
        dx = 1;
        dy = 0;
        } else if (event.code === "ArrowDown" && dy !== -1) {
        dx = 0;
        dy = 1;
        }
        });

        // Game loop
        setInterval(() => {
        update();
        draw();
        }, 100);
