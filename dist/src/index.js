"use strict";
// https://willh.gitbook.io/typescript-tutorial/basics/declaration-files
// ============================================
// 步驟 1: 建立全域變數和函數 (模擬外部載入)
// ============================================
// 建立 APP_CONFIG
globalThis.APP_CONFIG = {
    apiUrl: 'https://api.example.com',
    version: '1.0.0'
};
// 建立 greet 函數
globalThis.greet = function (name, age) {
    return age ? `${name}, ${age}歲` : `你好, ${name}`;
};
// 建立 MyLib 命名空間
globalThis.MyLib = {
    VERSION: '2.0.0',
    init: function () {
        console.log('MyLib 已初始化');
    }
};
// ============================================
// 步驟 2: 使用宣告的全域變數 (TS 從 index.d.ts 知道型別)
// ============================================
// interface GlobalThis {
//     Array: typeof Array;
//     Object: typeof Object;
//     // ... 只有內建的屬性
//     // 沒有你自己加的 greet, APP_CONFIG 等
// }
// 所以要加any
const APP_CONFIG = globalThis.APP_CONFIG;
const greet = globalThis.greet;
const MyLib = globalThis.MyLib;
// ============================================
// 測試
// ============================================
console.log('1. APP_CONFIG:', APP_CONFIG.apiUrl);
console.log('2. greet:', greet('小明', 25));
console.log('3. MyLib:', MyLib.VERSION);
MyLib.init();
// 內建屬性 - TypeScript 知道，所以不需要any
console.log('\n--- 存取 GlobalThis 內建屬性 ---');
console.log('globalThis.Array:', globalThis.Array);
console.log(Array); // 直接使用也可以
// console.log(window.Array);  // 瀏覽器環境下也可以
console.log(global.Array); // 也等同於 (Node.js)
console.log('globalThis.Object:', globalThis.Object);
console.log('globalThis.String:', globalThis.String);
console.log('globalThis.Math:', globalThis.Math);
// 使用內建的構造函數
const arr = new globalThis.Array(1, 2, 3);
console.log('建立陣列:', arr);
const obj = new globalThis.Object({ name: '測試' });
console.log('建立物件:', obj);
