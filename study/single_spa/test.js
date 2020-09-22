let nums = [2, 7, 11, 15, 20];
let target = 9;

let numsSort = nums.sort((a, b) => a - b);
console.log(numsSort);

let numsLength = numsSort.length;

let length = Math.floor(numsLength / 2);
console.log(length);

// let i = Math.floor(numsLength / 2);

let map = new Map();
// 转成字典map
for (let i = 0; i < numsLength; i++) {
  map.set(nums[i], i);
}


