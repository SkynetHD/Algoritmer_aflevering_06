// Beregner antallet af stier fra Start til slut ved hjælp af dynamisk programmering
// Starter fra slutningen
function beregneStier() {
    const rows = 5;
    const cols = 12;
    let dp = [];
    for (let i = 0; i < rows; i++) {
        dp[i] = [];
        for (let j = 0; j < cols; j++) {
            dp[i][j] = 0;
        }
    }
    const walls = [
    [0, 3],  [0, 9],
    [1, 1],  [1, 5],
    [2, 2],  [2, 7],  [2, 11],
    [3, 4]
    ];
    function isWall(row, col) {
        for (let i = 0; i < walls.length; i++) {
            if (walls[i][0] === row && walls[i][1] === col) {
                return true;
            }
        }
        return false;
    }
    if (!isWall(rows - 1, cols - 1)) {
        dp[rows - 1][cols - 1] = 1;
    }

    // Fylder tabellen
    for (let i = rows - 1; i >= 0; i--) {
        for (let j = cols - 1; j >= 0; j--) {
            if (isWall(i, j)) {
                continue;
            }

            if (i === rows - 1 && j === cols - 1) {
                continue; // Allerede sat til 1
            }

            let pathsFromBelow = 0;
            if (i + 1 < rows && !isWall(i + 1, j)) {
                pathsFromBelow = dp[i + 1][j];
            }

            let pathsFromRight = 0;
            if (j + 1 < cols && !isWall(i, j + 1)) {
                pathsFromRight = dp[i][j + 1];
            }

            // Formel: dp[i][j] = dp[i+1][j] + dp[i][j+1]
            dp[i][j] = pathsFromBelow + pathsFromRight;
        }
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (!isWall(i, j)) {
                opdaterCelle(i, j, dp[i][j]);
            }
        }
    }
}

function opdaterCelle(row, col, value) {
    const cell = document.getElementById('cell-' + row + '-' + col);

    if (cell && !cell.classList.contains('wall')) {
        cell.textContent = value;

        if (row === 0 && col === 0) {
            cell.textContent = 'S=' + value;
        } else if (row === 4 && col === 11) {
            cell.textContent = 'E=' + value;
        }
    }
}