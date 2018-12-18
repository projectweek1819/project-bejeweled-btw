// Schrijf hier je code

function width(grid) {
    return grid[0].length;
}

function height(grid) {
    return grid.length;
}

function isInside(grid, position) {
    let w = width(grid);
    let h = height(grid);
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
    let colorCount = [0, 0, 0];
    let colors = ["red", "green", "blue"];
    for (let x = 0; x < width(grid); x++) {
        for (let y = 0; y < height(grid); y++) {
            if (horizontalChainAt(grid, {x: x, y: y}) >= 3) {
                let color = grid[y][x];
                for (let i = 0; i < colors.length; i++) {
                    if (color === colors[i]) {
                        colorCount[i] += 1;
                        toRemove.push({x: x, y: y})
                    }
                }
            }
            if (verticalChainAt(grid, {x: x, y: y}) >= 3) {
                let color = grid[y][x];
                for (let i = 0; i < colors.length; i++) {
                    if (color === colors[i]) {
                        colorCount[i] += 1;
                        toRemove.push({x: x, y: y})
                    }
                }
            }
        }
    }
    for (let i = 0; i < toRemove.length; i++) {
        grid[toRemove[i].y][toRemove[i].x] = "";
    }

    let result = {};
    if (colorCount[0] > 0) {
        result.red = colorCount[0];
    }
    if (colorCount[1] > 0) {
        result.green = colorCount[1];
    }
    if (colorCount[2] > 0) {
        result.blue = colorCount[2];
    }

    return result;

}

function collapse(grid) {
    for (let x = 0; x < width(grid); x++) {
        for (let y = 0; y < height(grid); y++) {
            if (grid[y][x] === ""){
                let ty = y;
                while (ty > 0){
                    grid[ty][x] = grid[ty-1][x];
                    ty--;
                }
                grid[0][x] = "";
            }
        }
    }
}