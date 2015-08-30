help();

var ws;

$(function() {
    $('#server-form').on('submit', function() {
        var url = $('#server').val();

        connect(url);

        return false;
    });

    $('#disconnect').on('click', function() {
        disconnect();
    });

    $('#clear').on('click', function() {
        clearLog();
    });

    $('#console-form').on('submit', function() {
        var msg = $('#console').val();

        send(msg);

        return false;
    });
});

function newLogEntry(msg, incoming) {
    var time = moment().format('HH:mm:ss.SSS');

    // build HTML entry
    var timestamp = '<span class="gray bold">[' + time + ']</span>';
    var arrows = (incoming ? '&leftarrow;' : '&rightarrow;');
    var direction = '<span class="' + (incoming ? 'green' : 'gray') + ' bold">' + arrows + '</span>';

    // log entry
    console.log('[' + time + '] ' + (incoming ? '<<' : '>>') + ' ' + msg);

    // create HTML entry
    $('#log').prepend(timestamp + ' ' + direction + ' ' + msg + '<br/>');
}

/**
 * Sends some data to the connected web socket.
 *
 * @param data
 */
function send(data) {
    $('#console').val(data);

    if (ws === undefined) {
        console.log('Not connected');
    } else {
        ws.send(data);
        newLogEntry(data, false);
    }
}

/**
 * Connects to the web socket at the specified URL.
 *
 * @param url
 */
function connect(url) {
    ws = new WebSocket(url);

    $('#server').val(url);

    ws.onopen = function() {
        $('#ws-status').html('<span class="bg-green">Connected</span>');
        console.log('Connected');
    };

    ws.onclose = function() {
        $('#ws-status').html('<span class="bg-red">Not connected</span>');
        console.log('Disconnected');
        ws = undefined;
    };

    ws.onmessage = function(e) {
        newLogEntry(e.data, true);
    };
}

/**
 * Disconnects from the connected web socket.
 */
function disconnect() {
    if (ws === undefined) {
        console.log('Not connected');
    } else {
        ws.close();

        ws = undefined;
    }
}

/**
 * Clears the log.
 */
function clearLog() {
    $('#log').html(null);
    console.log('Cleared log');
}

/**
 * Shows the help message.
 */
function help() {
    console.log('<-------------------------->');
    console.log('Functions for use:');
    console.log('  > connect(url) // connects to the web socket at the specified URL');
    console.log('  > send(data)   // sends some data to the connected web socket');
    console.log('  > disconnect() // disconnects from the connected web socket');
    console.log('  > clearLog()   // clears the log');
    console.log('  > help()       // shows this help message');
    console.log('<-------------------------->');
}
