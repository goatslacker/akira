var watch = require('nodewatch');
var spawn = require('child_process').exec;

function makeparser() {
  process.stdout.write('*****************************************\n\n');
  var s = spawn('cake', ['parser']);
  s.stdout.on('data', function (data) { console.log(data.toString()) });
  s.stderr.on('data', function (data) { console.log(data.toString()) });
  s.on('exit', function (code) { console.log(code); });
}

watch.add('./lib/grammar.js').onChange(makeparser);
