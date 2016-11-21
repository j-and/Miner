// var closeBtn = $("#closeBtn");
// closeBtn.on('click', hide);
//
// function show(message,callback) {
//     console.log('message', message);
//     var modal = document.getElementById('modalMessage');
//     var div = document.createElement('div');
//     div.innerHTML = message;
//     modal.appendChild(div);
//     document.body.appendChild(modal);
// }
//
// function hide() {
//     var modalMessage=document.getElementById('modalMessage')
//     document.body.removeChild(modalMessage);
// }

function Modal(options) {
    var message = options.message;
    var callback = options.callback;

    var div = document.createElement('div');
    div.innerHTML = document.getElementById('myModal').innerHTML.replace('{{msg}}', message);
    document.body.appendChild(div);


    this.hide = function () {
        document.body.removeChild(div);
        if (callback) {
            callback()
        }
    };

    $(div).on('click', '.close-btn', this.hide);
}


Modal.show = function (message, callback) {
    var modal = new Modal({
        message: message,
        callback: callback
    });


    return modal;
};
