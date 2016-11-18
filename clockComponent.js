function Timer(options) {
    var timer, start;
    var elem = options.elem;

    elem.innerHTML = '00:00';

    function render() {
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
        if (minutes == 20) {
            elem.innerHTML = 'Time is over';
        } else {
            elem.innerHTML = minutes + ':' + seconds;
        }
    }


    this.stop = function () {
        clearInterval(timer);
        start = null;
    };

    this.start = function () {
        if (start) {
            return;
        }
        start = new Date();
        timer = setInterval(render, 1000);
    };
}

