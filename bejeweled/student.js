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
        if (isInside(grid,{x: tx, y: ty}) && grid[ty][tx] === color) {
            right++;
            tx++;
        } else {
            break;
        }
    }


    ty = position.y;
    tx = position.x - 1;
    while (true) {
        if (isInside(grid,{x: tx, y: ty}) && grid[ty][tx] === color) {
            left++;
            tx--;
        } else {
            break;
        }
    }

    return [left + right + 1,left,right];
}

function verticalChainAt(grid,position){
    let color = grid[position.y][position.x];
    let up = 0;
    let down = 0;

    let ty = position.y-1;
    let tx = position.x;

    while (true) {
        if (isInside(grid,{x: tx, y: ty}) && grid[ty][tx] === color) {
            up++;
            ty--;
        } else {
            break;
        }
    }


    ty = position.y+1;
    tx = position.x;
    while (true) {
        if (isInside(grid,{x: tx, y: ty}) && grid[ty][tx] === color) {
            down++;
            ty++;
        } else {
            break;
        }
    }
    return [up + down + 1,up,down];
}

function removeChains(grid){

    let maxX = width(grid);
    let maxY = width(grid);
    let result =
    for (let x = 0; x < maxX; x++){
        for (let y = 0; y < maxY; y++){
            if (horizontalChainAt({x:x,y:y})[0] >= 3){
                let left = horizontalChainAt({x:x,y:y})[1];
                let right = horizontalChainAt({x:x,y:y})[2];
                grid[y][x] = "";
                while (left > 0){
                    grid[y][x-left] = "";
                    left--;
                }
                while (right > 0){
                    gird[y][x+right] = "";
                    right--;
                }
            }
            if if (horizontalChainAt({x:x,y:y})[0] >= 3){
        }
    }
}