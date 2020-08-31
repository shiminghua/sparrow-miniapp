
function simple(template, data) {
  console.log(template);
  return template.replace(/\{\{([\w\.]*)\}\}/g, function (str, key) {
    console.log(str);
    console.log(key);
    console.log(arguments);
    var keys = key.split('.');
    let value = data[keys.shift()];
    for (let i = 0; i < keys.length; i++) {
      value = value[keys[i]];
    }
    return (typeof value !== 'undefined' && value !== null) ? value : '';
  });
}