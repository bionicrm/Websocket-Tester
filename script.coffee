ws = undefined;

$ ->
  $('#server-form').on 'submit', ->
    ws = new WebSocket $('#server').val()

    $('#log').html ''

    ws.onopen = ->
      $('#ws-status').html '<span class="green">Connected</span>'

    ws.onclose = ->
      $('#ws-status').html '<span class="red">Not connected</span>'

    ws.onmessage = (message) ->
      $('#log').prepend '<span class="green bold">' + timestamp() + '</span> ' + message.data + '<br/>'

    false

  $('#disconnect').on 'click', ->
    ws.close()

  $('#console-form').on 'submit', ->
    ws.send $('#console').val()

    false

timestamp = ->
  date = new Date

  hours = date.getHours()
  minutes = date.getMinutes()
  seconds = date.getSeconds()

  hours = '0' + hours if hours < 10
  minutes = '0' + minutes if minutes < 10
  seconds = '0' + seconds if seconds < 10

  hours + ':' + minutes + ':' + seconds