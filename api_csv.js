var fs = require('fs');
var obj;
fs.readFile('./sih_json_file.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  console.log(obj['Relative_velocity']);
});
