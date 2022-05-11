let ws;

let KEYS = {
    "A": {'keyCode':32, 'which':32, 'key': ' '},
    "B": {'keyCode':32, 'which':32, 'key': ' '},
    "D": {'keyCode':32, 'which':32, 'key': ' '},

    "2": {'keyCode':40, 'which':40, 'key': 'ArrowDown'},
    "4": {'keyCode':37, 'which':37, 'key': 'ArrowLeft'},
    "6": {'keyCode':39, 'which':39, 'key': 'ArrowRight'},
    "8": {'keyCode':38, 'which':38, 'key': 'ArrowUp'},

    /*
    "1": {'keyCode':49, 'which':49, 'key': '1'},
    "2": {'keyCode':50, 'which':50, 'key': '2'},
    "3": {'keyCode':51, 'which':51, 'key': '3'},
    "4": {'keyCode':52, 'which':52, 'key': '4'},
    "5": {'keyCode':53, 'which':53, 'key': '5'},
    "6": {'keyCode':54, 'which':54, 'key': '6'},
    "7": {'keyCode':55, 'which':55, 'key': '7'},
    "8": {'keyCode':56, 'which':56, 'key': '8'},
    "9": {'keyCode':57, 'which':57, 'key': '9'},
    */
    "*": {'keyCode':106, 'which':106, 'key': '*'},
    "0": {'keyCode':48, 'which':48, 'key': '0'},
    "#": {'keyCode':51, 'which':51, 'key': '#'},
}

function connect() {
    ws = new WebSocket('ws://192.168.1.150:81');
    ws.onopen = function () {

    };

    ws.onmessage = function (ev) {
        let cmd = ev.data;
        console.log(cmd);
        //let $key = document.querySelector("[data-key='" + cmd.charAt(1) + "']")
        let kd = KEYS[cmd.charAt(1)];
        console.debug(kd);

        if (cmd.charAt(0) == "d") {
            // $key.classList.add("pressed");

            let ke = new KeyboardEvent('keydown', kd);
            document.dispatchEvent(ke)
        } else {
            // $key.classList.remove("pressed");

            let ke = new KeyboardEvent('keyup', kd);
            document.dispatchEvent(ke)
        }
    };

    ws.onclose = function (e) {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        setTimeout(function () {
            connect();
        }, 1000);
    };

    ws.onerror = function (err) {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        ws.close();
    };
}

connect();

