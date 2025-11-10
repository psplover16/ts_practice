"use strict";
// ===== Symbol 型別完整解說 =====
// Symbol 是 ES6 引入的新原始資料型別，用來建立唯一的識別符
console.log("=== 1. Symbol 基本概念 ===");
// 建立 Symbol
let sym1 = Symbol();
let sym2 = Symbol();
let sym3 = Symbol("description"); // 可選的描述
console.log("sym1:", sym1);
console.log("sym2:", sym2);
console.log("sym3:", sym3);
// 關鍵特性：每個 Symbol 都是唯一的
console.log("sym1 === sym2:", sym1 === sym2); // false - 即使沒有描述也不相等
console.log("Symbol('test') === Symbol('test'):", Symbol('test') === Symbol('test')); // false
console.log("\n=== 2. Symbol 的主要用途 ===");
// 用途1：作為物件的唯一屬性鍵
const ID = Symbol('id');
const SECRET = Symbol('secret');
// 建立可以接受 Symbol 屬性的物件
const user = {
    name: "張三",
    age: 25
};
// 用 Symbol 作為屬性鍵，避免屬性名稱衝突
user[ID] = "user_12345";
user[SECRET] = "top_secret_data";
console.log("user:", user);
console.log("user[ID]:", user[ID]);
console.log("user[SECRET]:", user[SECRET]);
// Symbol 屬性不會出現在 for...in 迴圈中
console.log("一般屬性:");
for (let key in user) {
    if (typeof key === 'string') {
        console.log(`  ${key}: ${user[key]}`);
    }
}
console.log("\n=== 3. Symbol.for() - 全域 Symbol 註冊 ===");
// Symbol.for() 會在全域註冊表中查找或建立 Symbol
let globalSym1 = Symbol.for('app.id');
let globalSym2 = Symbol.for('app.id');
console.log("globalSym1 === globalSym2:", globalSym1 === globalSym2); // true!
// Symbol.keyFor() 可以獲取全域 Symbol 的鍵
console.log("Symbol.keyFor(globalSym1):", Symbol.keyFor(globalSym1));
console.log("\n=== 4. 內建的知名 Symbol ===");
// TypeScript/JavaScript 有許多內建的 Symbol
const arr = [1, 2, 3];
// Symbol.iterator - 定義物件的預設迭代器
console.log("arr[Symbol.iterator]:", typeof arr[Symbol.iterator]);
// 自訂迭代器範例
const iterableObj = {
    data: ['a', 'b', 'c'],
    [Symbol.iterator]: function* () {
        for (let item of this.data) {
            yield `自訂: ${item}`;
        }
    }
};
console.log("自訂迭代器結果:");
for (let item of iterableObj) {
    console.log("  ", item);
}
console.log("\n=== 5. 實際應用場景 ===");
// 場景1：避免第三方程式庫的屬性衝突
const PRIVATE_METHOD = Symbol('privateMethod');
class MyClass {
    constructor() {
        this.name = "MyClass";
    }
    // 用 Symbol 建立「私有」方法
    [PRIVATE_METHOD]() {
        return "這是私有方法";
    }
    callPrivate() {
        return this[PRIVATE_METHOD]();
    }
}
const instance = new MyClass();
console.log("instance.name:", instance.name);
console.log("呼叫私有方法:", instance.callPrivate());
// console.log(instance[PRIVATE_METHOD]());  // 外部無法直接存取
// 場景2：建立常數枚舉
const Colors = {
    RED: Symbol('red'),
    GREEN: Symbol('green'),
    BLUE: Symbol('blue')
};
function processColor(color) {
    switch (color) {
        case Colors.RED:
            return "處理紅色";
        case Colors.GREEN:
            return "處理綠色";
        case Colors.BLUE:
            return "處理藍色";
        default:
            return "未知顏色";
    }
}
console.log(processColor(Colors.RED));
console.log(processColor(Colors.GREEN));
console.log("\n=== 6. Symbol vs 其他型別比較 ===");
// Symbol vs String
const strKey = "id";
const symKey = Symbol("id");
const obj = {
    [strKey]: "字串鍵",
    [symKey]: "Symbol鍵"
};
console.log("obj[strKey]:", obj[strKey]);
console.log("obj[symKey]:", obj[symKey]);
console.log("Object.keys(obj):", Object.keys(obj)); // 只顯示字串鍵
console.log("Object.getOwnPropertySymbols(obj):", Object.getOwnPropertySymbols(obj));
console.log("\n=== 7. Symbol 的型別註解 ===");
// TypeScript 中的 Symbol 型別註解
let mySymbol;
const uniqueSymbol = Symbol(); // unique symbol 型別必須用 const
// unique symbol 在編譯時就確定唯一性
const CONSTANT_SYMBOL = Symbol('constant');
const config = {
    [CONSTANT_SYMBOL]: "唯一值",
    name: "設定檔"
};
console.log("config:", config);
console.log("\n=== Symbol 總結 ===");
console.log("1. Symbol 建立唯一識別符，防止屬性名稱衝突");
console.log("2. Symbol 屬性不會被 for...in 遍歷到");
console.log("3. Symbol.for() 可建立全域共享的 Symbol");
console.log("4. 適合用於程式庫開發和 API 設計");
console.log("5. TypeScript 支援 unique symbol 型別");
