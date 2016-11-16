(function a() {

    $(init);
    var table;
    var cellIdArray = [];
    var randomArray;
    var counter;
    var openCellsCounter = 0;

    function init() {
        table = $('#table');
        showTable();
        $('table').on('click', 'td', onCellClick);
    }

    $(document).ready(function () {
        document.oncontextmenu = function () {
            return false;
        };

        $('td').bind('contextmenu', function () {
            setFlag(this.parentElement.rowIndex, this.cellIndex);
        });
    });


    function showTable() {
        var cell;
        for (var j = 0; j < 9; j++) {
            var row = document.createElement('tr');
            for (var i = 0; i < 9; i++) {
                cell = document.createElement('td');
                row.appendChild(cell);
                cell.id = 'i' + i + 'j' + j;
                cellIdArray.push(cell.id);
            }
            table.append(row);
        }
        fillFieldWithMines();
        for (j = 0; j < 9; j++) {
            for (i = 0; i < 9; i++) {
                newId = 'i' + i + 'j' + j;
                fillFieldWithCounter(newId);
            }
        }
    }


    function fillFieldWithMines() {
        var obj = {};
        var random;
        randomArray = [];
        do {
            random = Math.round(Math.random() * (cellIdArray.length - 1));
            obj[cellIdArray[random]] = true;
            randomArray.push(cellIdArray[random]);
        }
        while (Object.keys(obj).length < 10);
        for (var key in Object.keys(obj)) {
            var cellBomb = $('#' + (Object.keys(obj))[key]);
            cellBomb.html('b');
            cellBomb.addClass('mine');
        }
        return randomArray;
    }

    function fillFieldWithCounter() {
        var cell = $('#' + newId);
        if (!cell.hasClass('mine')) {
            countMines(newId);
            cell.html(counter);
        }
    }

    function onCellClick() {
        var cellColumn = this.cellIndex;
        var cellRow = this.parentElement.rowIndex;
        startTimer();
        showCellValue(cellRow, cellColumn);
    }


    function showCellValue(cellRow, cellColumn) {
        var cell = $(table[0].rows[cellRow].cells[cellColumn]);
        if (cell.hasClass('c1')) {
            return;
        }
        if (!cell.hasClass('flag')) {
            cell.addClass('c1');
        }

        if (cell.html() != 0) {
            openCellsCounter++;
        }
        if (cell.hasClass('mine')) {
            cell.addClass('gamoover');
            alert('Bomb is here. Game is over');
            location.reload();

        }
        if (cell.html() == 0) {
            var rowStart = (cellRow - 1) >= 0 ? (cellRow - 1) : 0;
            var rowEnd = (cellRow + 1) <= 8 ? (cellRow + 1) : cellRow;
            var colStart = (cellColumn - 1) >= 0 ? (cellColumn - 1) : 0;
            var colEnd = (cellColumn + 1) <= 8 ? (cellColumn + 1) : cellColumn;
            openCellsCounter++;
            for (var row = rowStart; row <= rowEnd; row++) {
                for (var column = colStart; column <= colEnd; column++) {
                    if (cellRow !== row || cellColumn !== column) {
                        showCellValue(row, column);
                    }
                }
            }
        }
        if (openCellsCounter == 71) {//71 -field 9x9 contains 81cells & 10mines; => emptyCells=81-10=71;
            finishGame();
        }
    }

    function countMines(id) {
        counter = 0;
        cellColumn = Number(id.substr(1, 1));
        cellRow = Number(id.substr(3, 1));
        for (var j = cellRow - 1; j <= cellRow + 1; j++) {
            for (var i = cellColumn - 1; i <= cellColumn + 1; i++) {
                var minesCount = $('#' + ('i' + i + 'j' + j));
                if (minesCount.hasClass('mine')) {
                    counter++;
                }
            }
        }
        return counter;
    }

    function setFlag(rowIndex, cellIndex) {
        var flagsCount = 0;
        var cell = $(table[0].rows[rowIndex].cells[cellIndex]);
        cell.toggleClass('flag');
        for (var i = 0; i < randomArray.length; i++) {

            if ($('#' + randomArray[i]).hasClass('flag')) {
                flagsCount++;
            }
        }
        if (flagsCount == 1) {
            startTimer();
        }
        if (flagsCount == 10) {
            finishGame();
        }
    }

    function timer() {
        var now = new Date();
        var minutes = now.getMinutes() - start.getMinutes();
        var seconds = now.getSeconds() - start.getSeconds();
        if (seconds < 0) {
            seconds = seconds + 60;
            minutes = now.getMinutes() - start.getMinutes() - 1;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (minutes == 10) {
            document.getElementById("time").innerHTML = 'Time is over';
        } else {
            document.getElementById("time").innerHTML = minutes + ':' + seconds;
        }

        setTimeout(timer, 1000);
        return duration = minutes + ':' + seconds;
    }

    function startTimer() {
        if (openCellsCounter == 0) {
            start = new Date();
            timer(start);
        }
    }

    function finishGame() {
        alert('Finished in ' + timer() + ' seconds');
    }
})
();

