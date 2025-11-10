"use strict";
function getLength(something) {
    // return something.length; // 錯誤：number 沒有 length 屬性
    return something.toString(); // 需共有屬性
}
console.log(getLength(123)); // "123"
