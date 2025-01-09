// TODO: Check WebAssembly on ping1

function ajaxGet(url, errElem) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true /*async*/);
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 /*DONE*/) {
      return;
    }

    if (xhr.status != 200) {
      var msg = 'ERROR requesting ' + url + ': ' + xhr.status + ' ' +
                xhr.statusText;
      if (errElem) {
        appendMessage(errElem, msg);
      }
      return;
    }
  };
  xhr.send();
}

function ping(t) {
  return function() {
    var url = '/a?u=' + window.location.pathname + '&t=' + t + '&w=' + wasmResult;
    ajaxGet(url);  // set error element for debugging
  }
}

var wasmResult = 0;

//var times = [1, 2, 3];
var times = [1, 10, 100, 1000];
for (var i = 0; i < times.length; ++i) {
  var t = times[i];
  setTimeout(ping(t), t * 1000);  // milliseconds
}

function wasmPing() {
  var wasmCode = new Uint8Array([0,97,115,109,1,0,0,0,1,133,128,128,128,0,1,96,0,1,127,3,130,128,128,128,0,1,0,4,132,128,128,128,0,1,112,0,0,5,131,128,128,128,0,1,0,1,6,129,128,128,128,0,0,7,145,128,128,128,0,2,6,109,101,109,111,114,121,2,0,4,109,97,105,110,0,0,10,138,128,128,128,0,1,132,128,128,128,0,0,65,42,11]);
  var m = new WebAssembly.Instance(new WebAssembly.Module(wasmCode));
  wasmResult = m.exports.main();
}

wasmPing();
