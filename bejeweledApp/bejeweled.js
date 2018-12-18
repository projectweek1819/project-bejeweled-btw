let grid = []
let colors = ["purple", "red", "yellow", "green", "blue", "white", "orange"];
let colWidth;
let rowHeight;

let selected;
let score;
let img = [];

function widthGrid(grid) {
    return grid[0].length;
}

function heightGrid(grid) {
    return grid.length;
}

function setup() {
    score = 0;
    purpleGem = loadImage("img\\purpleGem.png");
    redGem = loadImage("img\\redGem.png");
    yellowGem = loadImage("img\\yellowGem.png");
    greenGem = loadImage("img\\greenGem.png");
    blueGem = loadImage("img\\blueGem.png");
    whiteGem = loadImage("img\\whiteGem.png");
    orangeGem = loadImage("img\\orangeGem.png");
    img.push(purpleGem,redGem,yellowGem,greenGem,blueGem,whiteGem,orangeGem);
    selected = null;
    frameRate(3);
    createCanvas(500, 500);
    for (let i = 0; i < 8; i++) {
        let col = []
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
    let left = 0;
    let right = 0;

    let ty = position.y;
    let tx = position.x + 1;

    while (true) {
        if (isInside(grid, {x: tx, y: ty}) && grid[ty][tx] === color) {
            right++;
            tx++;
        } else {
            break;
        }
    }


    ty = position.y;
    tx = position.x - 1;
    while (true) {
        if (isInside(grid, {x: tx, y: ty}) && grid[ty][tx] === color) {
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
    let up = 0;
    let down = 0;

    let ty = position.y - 1;
    let tx = position.x;

    while (true) {
        if (isInside(grid, {x: tx, y: ty}) && grid[ty][tx] === color) {
            up++;
            ty--;
        } else {
            break;
        }
    }


    ty = position.y + 1;
    tx = position.x;
    while (true) {
        if (isInside(grid, {x: tx, y: ty}) && grid[ty][tx] === color) {
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
    for (let i = 0; i < toRemove.length; i++) {
        grid[toRemove[i].y][toRemove[i].x] = "";
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
        if (!(horizontalChainAt(grid,p) >= 3|| horizontalChainAt(grid,q) >= 3 || verticalChainAt(grid,p) >= 3|| verticalChainAt(grid,q) >= 3)){
            console.log("no line");
            temp = grid[p.y][p.x];
            grid[p.y][p.x] = grid[q.y][q.x];
            grid[q.y][q.x] = temp;
        }
    }
    selected = null;
}


function draw() {
    background(55);

    reFill(grid);
    for (let i = 0; i < widthGrid(grid); i++) {
        for (let j = 0; j < heightGrid(grid); j++) {
            let color = grid[j][i];

            let x =  (i * colWidth);
            let y =  (j * rowHeight);

            let index = -1;
            if (color === colors[0]) {
                index = 0;
            } else if (color === colors[1]) {
                index = 1;
            } else if (color === colors[2]) {
                index = 2;
            } else if (color === colors[3]) {
                index =3;
            } else if (color === colors[4]) {
                index = 4;
            } else if (color === colors[5]) {
                index = 5;
            } else if (color === colors[6]) {
                index = 6;
            }

            image(img[index],x,y);

        }
    }

    removeChains(grid);
    collapse(grid);

}