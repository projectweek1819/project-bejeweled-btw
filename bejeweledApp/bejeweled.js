let grid = [];
let colors = ["purple", "red", "yellow", "green", "blue", "white", "orange"];
let colWidth;
let rowHeight;

let canvas;

let selected;
let score;
let img = [];
let explosives = [];
let explosion;

let animation;

function widthGrid(grid) {
    return grid[0].length;
}

function heightGrid(grid) {
    return grid.length;
}

function setup() {
    score = 0;
    animation = false;

    explosion = loadImage("img\\explosion.png");

    purpleGem = loadImage("img\\purpleGem.png");
    redGem = loadImage("img\\redGem.png");
    yellowGem = loadImage("img\\yellowGem.png");
    greenGem = loadImage("img\\greenGem.png");
    blueGem = loadImage("img\\blueGem.png");
    whiteGem = loadImage("img\\whiteGem.png");
    orangeGem = loadImage("img\\orangeGem.png");
    img.push(purpleGem, redGem, yellowGem, greenGem, blueGem, whiteGem, orangeGem);

    purpleExplosive = loadImage("img\\explosivePurple_2_55x55.png");
    redExplosive = loadImage("img\\explosiveRed_55x55.png");
    yellowExplosive = loadImage("img\\explosiveYellow_55x55.png");
    greenExplosive = loadImage("img\\explosiveGreen_55x55.png");
    blueExplosive = loadImage("img\\explosiveBlue_55x55.png");
    whiteExplosive = loadImage("img\\explosiveWhite_55x55.png");
    orangeExplosive = loadImage("img\\explosiveOrange_55x55.png");
    explosives.push(purpleExplosive, redExplosive, yellowExplosive, greenExplosive, blueExplosive, whiteExplosive, orangeExplosive);


    selected = null;
    frameRate(3);
    canvas = createCanvas(500, 500);
    canvas.parent("myContainer");
    for (let i = 0; i < 8; i++) {
        let col = [];
        for (let j = 0; j < 8; j++) {
            let colorNmb = Math.floor(Math.random() * 7);
            col.push(colors[colorNmb]);
        }
        grid.push(col);
    }

    colWidth = width / 8;
    rowHeight = height / 8;

    console.table(grid);
}

function horizontalChainAt(grid, position) {
    let color = grid[position.y][position.x];
    if (color.includes("explosive")) {
        let temp = color.split(" ");
        color = temp[0];
    }
    let left = 0;
    let right = 0;

    let ty = position.y;
    let tx = position.x + 1;

    while (true) {
        if (isInside(grid, {x: tx, y: ty}) && grid[ty][tx].includes(color) && !grid[ty][tx].includes("temp")) {
            right++;
            tx++;
        } else {
            break;
        }
    }


    ty = position.y;
    tx = position.x - 1;
    while (true) {
        if (isInside(grid, {x: tx, y: ty}) && grid[ty][tx].includes(color) && !grid[ty][tx].includes("temp")) {
            left++;
            tx--;
        } else {
            break;
        }
    }

    return left + right + 1;
}

function isInside(grid, position) {
    let w = widthGrid(grid);
    let h = heightGrid(grid);
    if (position.x >= 0 && position.x < w) {
        if (position.y >= 0 && position.y < h) {
            return true;
        }
    }
    return false;
}

function swap(grid, p, q) {
    let temp = grid[p.y][p.x];
    grid[p.y][p.x] = grid[q.y][q.x];
    grid[q.y][q.x] = temp;
}

function verticalChainAt(grid, position) {
    let color = grid[position.y][position.x];
    if (color.includes("explosive")) {
        let temp = color.split(" ");
        color = temp[0];
    }
    let up = 0;
    let down = 0;

    let ty = position.y - 1;
    let tx = position.x;

    while (true) {
        if (isInside(grid, {x: tx, y: ty}) && grid[ty][tx].includes(color) && !grid[ty][tx].includes("temp")) {
            up++;
            ty--;
        } else {
            break;
        }
    }


    ty = position.y + 1;
    tx = position.x;
    while (true) {
        if (isInside(grid, {x: tx, y: ty}) && grid[ty][tx].includes(color) && !grid[ty][tx].includes("temp")) {
            down++;
            ty++;
        } else {
            break;
        }
    }
    return up + down + 1;
}

function removeChains(grid) {
    let toRemove = [];
    for (let x = 0; x < widthGrid(grid); x++) {
        for (let y = 0; y < heightGrid(grid); y++) {
            if (horizontalChainAt(grid, {x: x, y: y}) >= 3) {
                toRemove.push({x: x, y: y})
            }

            if (verticalChainAt(grid, {x: x, y: y}) >= 3) {
                toRemove.push({x: x, y: y})
            }
        }
    }
    horizontal4();
    vertical4();
    for (let i = 0; i < toRemove.length; i++) {
        if (!grid[toRemove[i].y][toRemove[i].x].includes("temp")) {
            if(grid[toRemove[i].y][toRemove[i].x].includes("explosive")){
                for (let tx = toRemove[i].x-1; tx <= toRemove[i].x+1 && tx < heightGrid(grid); tx++){
                    for (let ty = toRemove[i].y-1; ty <= toRemove[i].y+1 && ty < widthGrid(grid);ty++){
                        tx = (tx < 0) ? 0: tx;
                        ty = (ty < 0) ? 0: ty   ;
                        grid[ty][tx] = "";
                    }
                }
                console.table(grid);
            } else {
                grid[toRemove[i].y][toRemove[i].x] = "";
            }
        }
        for (let x = 0; x < widthGrid(grid); x++) {
            for (let y = 0; y < heightGrid(grid); y++) {
                let string = grid[y][x];
                grid[y][x] = string.replace("temp", "explosive");
            }
        }
    }
}

function collapse(grid) {
    for (let x = 0; x < widthGrid(grid); x++) {
        for (let y = 0; y < heightGrid(grid); y++) {
            if (grid[y][x] === "") {
                let ty = y;
                while (ty > 0) {
                    grid[ty][x] = grid[ty - 1][x];
                    ty--;
                }
                grid[0][x] = "";
            }
        }
    }
}

function reFill(grid) {
    for (let i = 0; i < widthGrid(grid); i++) {
        for (let j = 0; j < heightGrid(grid); j++) {
            if (grid[i][j] === "") {
                let random = Math.floor(Math.random() * 7);
                grid[i][j] = colors[random];
            }
        }
    }
}


function mouseClicked() {
    let x = mouseX;
    let y = mouseY;
    let i = 0;
    let j = 0;

    while (true) {
        x -= 500 / 8;
        if (x > 0) {
            i++
        } else {
            break;
        }
    }
    while (true) {
        y -= 500 / 8;
        if (y > 0) {
            j++;
        } else {
            break;
        }
    }

    let clickedCell = {x: i, y: j};
    console.log(selected);
    if (selected === null) {
        selected = clickedCell;
    } else {
        swap(grid, selected, clickedCell);
    }
}

function horizontal4() {
    for (let x = 0; x < widthGrid(grid); x++) {
        for (let y = 0; y < heightGrid(grid); y++) {
            if (horizontalChainAt(grid, {x: x, y: y}) === 4) {
                grid[y][x] += " temp ";
            }
        }
    }
}

function vertical4() {
    for (let x = 0; x < widthGrid(grid); x++) {
        for (let y = 0; y < heightGrid(grid); y++) {
            if (verticalChainAt(grid, {x: x, y: y}) === 4) {
                grid[y][x] += " temp";
            }
        }
    }
}

function swap(grid, p, q) {
    x1 = p.x;
    x2 = q.x;
    y1 = p.y;
    y2 = q.y;

    let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    if (distance === 1) {
        let temp = grid[p.y][p.x];
        grid[p.y][p.x] = grid[q.y][q.x];
        grid[q.y][q.x] = temp;
        if (!(horizontalChainAt(grid, p) >= 3 || horizontalChainAt(grid, q) >= 3 || verticalChainAt(grid, p) >= 3 || verticalChainAt(grid, q) >= 3)) {
            console.log("no line");
            temp = grid[p.y][p.x];
            grid[p.y][p.x] = grid[q.y][q.x];
            grid[q.y][q.x] = temp;
        }
    }
    selected = null;
}


function draw() {
    clear()
    background(0,0,0,0);

    reFill(grid);
    for (let i = 0; i < widthGrid(grid); i++) {
        for (let j = 0; j < heightGrid(grid); j++) {
            let color = grid[j][i];

            let x = (i * colWidth);
            let y = (j * rowHeight);


                let index = -1;
                if (color.includes(colors[0])) {
                    index = 0;
                } else if (color.includes(colors[1])) {
                    index = 1;
                } else if (color.includes(colors[2])) {
                    index = 2;
                } else if (color.includes(colors[3])) {
                    index = 3;
                } else if (color.includes(colors[4])) {
                    index = 4;
                } else if (color.includes(colors[5])) {
                    index = 5;
                } else if (color.includes(colors[6])) {
                    index = 6;
                }
                if (index === -1){
                    console.log(color);
                }
                if (grid[j][i].includes("explosive")) {
                    image(explosives[index], x, y);
                } else {
                    image(img[index], x, y);
                }

            }
        }
    removeChains(grid);
    collapse(grid);
}