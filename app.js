(function a() {

    var table;
    var cellIdArray = [];
    var randomArray;
    var openCellsCounter = 0;
    var timer;

    function init() {
        table = $('#table');
        showTable();
        $('table').on('click', 'td', onCellClick);
        timer = new Timer({
            elem: document.getElementById('time')
        });
    }

    $(document).ready(function () {
        init();
        table.on('contextmenu', 'td', function (event) {
            event.preventDefault();
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
                var newId = 'i' + i + 'j' + j;
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
        for (var key in obj) {
            var cellBomb = $('#' + key);
            cellBomb.html('b');
            cellBomb.addClass('mine');
        }
        return randomArray;
    }

    function fillFieldWithCounter(newId) {
        var cell = $('#' + newId);
        if (!cell.hasClass('mine')) {
            var counter = countMines(newId);
            cell.html(counter);
        }
    }

    function onCellClick() {
        var cellColumn = this.cellIndex;
        var cellRow = this.parentElement.rowIndex;
        timer.start();
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
        openCellsCounter++;
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
            for (var row = rowStart; row <= rowEnd; row++) {
                for (var column = colStart; column <= colEnd; column++) {
                    if (cellRow !== row || cellColumn !== column) {
                        showCellValue(row, column);
                    }
                }
            }
        }
        if (openCellsCounter === 71) {//71 -field 9x9 contains 81cells & 10mines; => emptyCells=81-10=71;
            timer.stop();
        }
    }

    function countMines(id) {
        var counter = 0;
        var cellColumn = Number(id.substr(1, 1));
        var cellRow = Number(id.substr(3, 1));
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

    var setFlagCount = true;

    function setFlag(rowIndex, cellIndex) {
        if (setFlagCount) {
            timer.start();
        }
        var cell = $(table[0].rows[rowIndex].cells[cellIndex]);
        cell.toggleClass('flag');
        var flagsCount = table.find('td.mine.flag').length;
        if (flagsCount === 10) {
            timer.stop();
        }
        setFlagCount = false;
    }
})
();

