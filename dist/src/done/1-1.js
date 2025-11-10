"use strict";
// 原始資料型別包括：boolean (布林值)、number (數值)、string (字串)、null、undefined 以及 ES6 中的新型別 Symbol。
// 1. boolean (布林值)
let isActive = true;
let isComplete = false;
// 三種建立 boolean 的方式差別：
// ❌ 錯誤：new Boolean() 建立的是物件，不是原始型別
// let createdByNewBoolean1: boolean = new Boolean(1); // 會報錯
// ✅ 正確：接受 Boolean 物件型別
let createdByNewBoolean2 = new Boolean(1); // 這是物件
// ✅ 正確：Boolean() 函式轉換，回傳原始 boolean
let createdByBoolean = Boolean(1); // 這是原始型別
// 測試差別
console.log('布林值:', isActive);
console.log('物件 Boolean:', createdByNewBoolean2);
console.log('物件的 typeof:', typeof createdByNewBoolean2); // "object"
console.log('原始 boolean:', createdByBoolean);
console.log('原始的 typeof:', typeof createdByBoolean); // "boolean"
// 比較運算的差別
console.log('Boolean(1) === true:', Boolean(1) === true); // true
console.log('new Boolean(1) === true:', new Boolean(1) === true); // false (物件不等於原始值)
console.log('new Boolean(1) == true:', new Boolean(1) == true); // true (會進行型別轉換)
// 2. number (數值)
let age = 25;
let price = 99.99;
let hexValue = 0xff; // 十六進位
let binaryValue = 0b101; // 二進位
let octalValue = 0o755; // 八進位
console.log('數值:', age);
console.log('數值:', price);
console.log('數值:', hexValue);
console.log('數值:', binaryValue);
console.log('數值:', octalValue);
// 3. string (字串)
let userName = "張三";
let message = '歡迎使用 TypeScript';
let template = `Hello, ${userName}!,你是否為${age + 1}歲??`; // 模板字串
console.log('數值:', template);
// 4. 在 TypeScript 中，可以用 void 表示沒有任何返回值的函式
function alertName() {
    console.log('My name is Tom');
}
alertName();
// 5. null vs undefined
// null 表示程序員主動賦予變數一個「空值」
let data = null;
let userInfo = null; // 可能是字串或null
// undefined 通常表示變數尚未被賦值
let result = undefined;
let optionalValue = undefined; // 可能是數字或undefined
// 在 TypeScript 中，可以使用 null 和 undefined 來定義這兩個原始資料型別
// 與 void 的區別是，undefined 和 null 是所有型別的子型別。
// 這樣也不會報錯
let u = 123456;
let numT = u;
console.log(numT);
// 7. Symbol (ES6新型別)
let id = Symbol('a');
let uniqueKey = Symbol('a');
let userAge = "age";
const user = {
    name: "John",
    [id]: "隱藏資訊",
    [userAge]: 30
};
// 當物件 key，不會跟別人衝突
console.log(user[id]); // undefined
console.log(user["a"]); // 隱藏資訊
console.log(user[userAge]); // 30
console.log(user.age); // 30
console.log(Object.keys(user)); // ["name", "age"]，symbol屬性不會被列出
// Symbol 很適合用來做「常量」或「enum」
console.log(id === uniqueKey); // false，symbol是唯一的
// Symbol() 每次都產生新 Symbol，但有時需要共用同一個 Symbol（跨檔案）。Symbol.for() 會返回同一個 symbol
let descriptionId = Symbol.for('a');
let descriptionUniqueKey = Symbol.for('a');
console.log(descriptionUniqueKey === descriptionId); // true
for (const v of [1, 2, 3]) {
    console.log(v);
}
