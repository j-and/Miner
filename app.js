(function () {

    $(document).on("DOMContentLoaded", init, event);
    var table;
    var cellIdArray = [];
    var counter;

    function init() {
        table = $('#table');
        showTable();

        var button = $('#button');
        button.on('click', switchTableColors);
        $('table').on('dblclick', 'td', changeColor);
        $('table').on('click', 'td', onCellClick);

    }

    function showTable() {
        var cell;
        for (var j = 0; j < 9; j++) {
            var row = document.createElement('tr');
            for (var i = 0; i < 9; i++) {
                cell = document.createElement('td');
                row.appendChild(cell);
                cell.id = 'i' + i + 'j' + j;
                cell.setAttribute('id', cell.id);
                id = cell.id;
                cellIdArray.push(id);
            }
            table.append(row);
        }
        fillFieldWithMines();
        for (var j = 0; j < 9; j++) {
            for (var i = 0; i < 9; i++) {
                newId = 'i' + i + 'j' + j;
                fillFieldWithCounter(newId);
            }
        }
    }


    function fillFieldWithMines() {
        var obj = {};
        var random;
        var randomArray = [];
        do {
            random = Math.round(Math.random() * (cellIdArray.length - 1));
            obj[cellIdArray[random]] = true;
            randomArray.push(cellIdArray[random]);
        }
        while (Object.keys(obj).length < 10);
        for (var i = 0; i < Object.keys(obj).length; i++) {
            $('#' + Object.keys(obj)[i]).html('b');
            $('#' + Object.keys(obj)[i]).addClass('mine');
        }
    }

    function fillFieldWithCounter() {
        var minesCount;
        if ($('#' + newId).hasClass('mine') == false) {
            countMines(newId);
            $('#' + newId).html(counter);
        }
    }

    function onCellClick() {
        var cellColumn = ($(this)[0].cellIndex);
        var cellRow = ($(this)[0].parentElement.rowIndex);
        showCellValue(cellRow, cellColumn);
    }

    function showCellValue(cellRow, cellColumn) {
        var cell = table[0].rows[cellRow].cells[cellColumn];
        if (cell.getAttribute('class') == 'c1') {
            return;
        }
        cell.setAttribute('class', 'c1');
        if (cell.innerHTML == 'b') {
            console.log('bomb');
        }
        if (cell.innerHTML == 0) {
            var rowStart = (cellRow - 1) >= 0 ? (cellRow - 1) : 0;
            var rowEnd = (cellRow + 1) <= 8 ? (cellRow + 1) : cellRow;
            var colStart = (cellColumn - 1) >= 0 ? (cellColumn - 1) : 0;
            var colEnd = (cellColumn + 1) <= 8 ? (cellColumn + 1) : cellColumn;

            for (var row = rowStart; row <= rowEnd; row++) {
                for (var column = colStart; column <= colEnd; column++) {
                    if (!((cellRow == row) && (cellColumn == column))) {
                        showCellValue(row, column);
                    }
                }
            }
        }
    }


    function countMines(id) {
        counter = 0;
        cellColumn = Number(id.substr(1, 1));
        cellRow = Number(id.substr(3, 1));
        for (var j = cellRow - 1; j <= cellRow + 1; j++) {
            for (var i = cellColumn - 1; i <= cellColumn + 1; i++) {
                minesCount = $('#' + ('i' + i + 'j' + j))
                if (minesCount) {
                    if (minesCount.hasClass('mine')) {
                        counter++;
                    }
                }
            }
        }
        return counter;
    }

    function changeColor() {
        var source = $(this);
        source.toggleClass('c1');
    }

    function switchTableColors() {
        table.toggleClass('invert');
    }

})
();

