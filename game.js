const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const COLS = 20;
const ROWS = 20;
const BOX_SIZE = canvas.width / COLS;
const EMPTY = '#000'; // Màu nền trống

let snake = [{ x: 9 * BOX_SIZE, y: 10 * BOX_SIZE }];
let direction = 'RIGHT';
let food = {
    x: Math.floor(Math.random() * COLS) * BOX_SIZE,
    y: Math.floor(Math.random() * ROWS) * BOX_SIZE
};
let score = 0;

// Điều khiển rắn
document.addEventListener("keydown", directionControl);

function directionControl(event) {
    if (event.keyCode == 37 && direction != "RIGHT") direction = "LEFT";
    else if (event.keyCode == 38 && direction != "DOWN") direction = "UP";
    else if (event.keyCode == 39 && direction != "LEFT") direction = "RIGHT";
    else if (event.keyCode == 40 && direction != "UP") direction = "DOWN";
}

// Kiểm tra va chạm
function collision(newHead) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x == snake[i].x && newHead.y == snake[i].y) return true;
    }
    return false;
}

// Vẽ trò chơi
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ thức ăn
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, BOX_SIZE, BOX_SIZE);

    // Vẽ rắn
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "lime" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, BOX_SIZE, BOX_SIZE);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, BOX_SIZE, BOX_SIZE);
    }

    // Di chuyển rắn
    let head = { x: snake[0].x, y: snake[0].y };
    if (direction == "LEFT") head.x -= BOX_SIZE;
    if (direction == "UP") head.y -= BOX_SIZE;
    if (direction == "RIGHT") head.x += BOX_SIZE;
    if (direction == "DOWN") head.y += BOX_SIZE;

    // Kiểm tra va chạm với biên
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || collision(head)) {
        clearInterval(game);
        alert("Game Over");
    }

    // Kiểm tra va chạm với thức ăn
    if (head.x == food.x && head.y == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * COLS) * BOX_SIZE,
            y: Math.floor(Math.random() * ROWS) * BOX_SIZE
        };
    } else {
        snake.pop();
    }

    // Thêm đầu mới cho rắn
    snake.unshift(head);

    // Cập nhật điểm số
    document.getElementById("score").innerHTML = "Score: " + score;
}

let game = setInterval(draw, 100);
