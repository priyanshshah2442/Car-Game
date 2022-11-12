let player_car;
const GameArea = document.getElementById("GameArea");
const startScreen = document.querySelector(".startScreen");
const endScreen = document.querySelector(".endScreen");
var game = "";
const height = document.body.offsetHeight;
let score = document.getElementById("score")


startScreen.addEventListener("click", start);
endScreen.addEventListener("click", start);
const player = {
    speed: 5,
    score: 0
};

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}
window.addEventListener('keydown', KeyDown);
window.addEventListener('keyup', KeyUp);

function KeyDown(e) {
    e.preventDefault();
    if (e.key == "ArrowUp") {
        keys.ArrowUp = true;
    }
    else if (e.key == "ArrowDown") {
        keys.ArrowDown = true;
    }
    else if (e.key == "ArrowLeft") {
        keys.ArrowLeft = true;
    }
    else if (e.key == "ArrowRight") {
        keys.ArrowRight = true;
    }
}
function KeyUp(e) {
    e.preventDefault();
    if (e.key == "ArrowUp") {
        keys.ArrowUp = false;
    }
    else if (e.key == "ArrowDown") {
        keys.ArrowDown = false;
    }
    else if (e.key == "ArrowLeft") {
        keys.ArrowLeft = false;
    }
    else if (e.key == "ArrowRight") {
        keys.ArrowRight = false;
    }
}

function movelines() {
    let road = document.querySelectorAll(".road");
    road.forEach(function (item) {
        if (item.y >= height) {
            item.y = -50;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}
function isCollided(a, b) {
    let arect = a.getBoundingClientRect();
    let brect = b.getBoundingClientRect();
    return !((arect.top > brect.bottom) || (arect.bottom < brect.top) || (arect.right < brect.left) || (arect.left > brect.right));
}
function moveEnemy(player_car) {
    let enemy_car = document.querySelectorAll(".enemy");
    enemy_car.forEach(function (item) {
        if (item.y >= height) {
            // item.y=0;

            item.y = -300;
            item.x = Math.floor(Math.random() * 350);
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
        item.style.left = item.x + "px";
        if (isCollided(player_car, item)) {
            player.start = false;
            endScreen.classList.remove("hide");
        }
    })
}

function start() {
    startScreen.classList.add("hide");
    endScreen.classList.add("hide")
    GameArea.innerHTML = "";
    player_car = document.createElement("img");
    player_car.setAttribute("src", "car1.png");
    player_car.setAttribute("id", "player_car");
    GameArea.appendChild(player_car);
    player.start = true;
    player.score = 0;
    player.x = player_car.offsetLeft;
    player.y = player_car.offsetTop;
    for (let i = 0; i < 4; i++) {
        let enemy = document.createElement("div");
        let enemy_car = document.createElement("img");
        enemy.classList.add("enemy")
        enemy_car.classList.add("enemy_car");
        enemy_car.setAttribute('src', 'car2.png')
        enemy.x = Math.floor(Math.random() * 350);
        enemy_car.style.left = Math.floor(Math.random() * 350) + "px";
        enemy.y = ((i + 1) * 350) * -1;
        enemy.appendChild(enemy_car);
        GameArea.appendChild(enemy);
    }
    for (let i = 0; i < 5; i++) {
        let roadline = document.createElement("div");
        roadline.classList.add("road");
        roadline.y = 50 + (i * 120)
        roadline.style.top = roadline.y + "px";
        GameArea.appendChild(roadline);
    }
    window.requestAnimationFrame(playGame);

}

function playGame() {
    if (player.start) {
        movelines();
        moveEnemy(player_car);
        if (keys.ArrowUp) {
            if (player.y > 150) {
                player.y -= player.speed;
            }
        }
        if (keys.ArrowDown) {
            if (player.y < height - 70) {
                player.y += player.speed;
            }
        }
        if (keys.ArrowLeft) {
            if (player.x > 0) {
                player.x -= player.speed;
            }
        }
        if (keys.ArrowRight) {
            if (player.x < 350) {
                player.x += player.speed;
            }
        }

        player_car.style.top = player.y + "px";
        player_car.style.left = player.x + "px";
        game = window.requestAnimationFrame(playGame);
        score.innerHTML = `Your Score is : <b>${player.score}</b>`
        player.score++;
    }
}

// window.requestAnimationFrame(start)