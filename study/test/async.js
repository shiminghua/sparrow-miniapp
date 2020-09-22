console.log(1);
setTimeout(() => {
  console.log('set1');
  new Promise((resolve, reject) => {
    console.log('pr1');
    resolve();
  }).then(() => {
    console.log('then1');
  }).catch(() => {
    console.log('catch2');
  });
}, 0);

new Promise((resolve, reject) => {
  console.log('pr2');
  reject();
}).then(() => {
  console.log('then2');
}).then(() => {
  console.log('then4')
}).catch(() => {
  console.log('catch2')
});

console.log(2);