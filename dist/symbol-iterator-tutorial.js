"use strict";
// Symbol.iterator 完整教學範例
// Symbol.iterator 是讓物件可以被 for...of 迴圈遍歷的關鍵
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvenNumbers = exports.ShoppingCart = exports.NumberRange = void 0;
console.log("=== Symbol.iterator 教學 ===\n");
// ============================================
// 1. 基本概念：什麼是 Symbol.iterator？
// ============================================
console.log("1. Symbol.iterator 是什麼？");
console.log("Symbol.iterator:", Symbol.iterator);
console.log("它是一個特殊的 Symbol，用來定義物件的預設迭代器\n");
// ============================================
// 2. 內建的可迭代物件
// ============================================
console.log("2. 內建可迭代物件的 Symbol.iterator：");
// 陣列有內建的 Symbol.iterator
const array = [1, 2, 3];
console.log("陣列的迭代器:", array[Symbol.iterator]);
// 字串也有內建的 Symbol.iterator
const str = "Hello";
console.log("字串的迭代器:", str[Symbol.iterator]);
// 使用內建迭代器
console.log("\n使用陣列的迭代器：");
const arrayIterator = array[Symbol.iterator]();
console.log("第一次呼叫 next():", arrayIterator.next()); // {value: 1, done: false}
console.log("第二次呼叫 next():", arrayIterator.next()); // {value: 2, done: false}
console.log("第三次呼叫 next():", arrayIterator.next()); // {value: 3, done: false}
console.log("第四次呼叫 next():", arrayIterator.next()); // {value: undefined, done: true}
// ============================================
// 3. 自訂可迭代物件 - 範例1：簡單的數字序列
// ============================================
console.log("\n3. 自訂可迭代物件 - 數字序列：");
class NumberRange {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    // 實作 Symbol.iterator 方法
    [Symbol.iterator]() {
        let current = this.start;
        const end = this.end;
        // 回傳迭代器物件
        return {
            next() {
                if (current <= end) {
                    return { value: current++, done: false };
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
}
exports.NumberRange = NumberRange;
// 使用自訂的可迭代物件
const range = new NumberRange(1, 5);
console.log("使用 for...of 迴圈：");
for (const num of range) {
    console.log(num); // 輸出: 1, 2, 3, 4, 5
}
console.log("\n手動使用迭代器：");
const rangeIterator = range[Symbol.iterator]();
let result = rangeIterator.next();
while (!result.done) {
    console.log("值:", result.value);
    result = rangeIterator.next();
}
// ============================================
// 4. 自訂可迭代物件 - 範例2：購物車
// ============================================
console.log("\n4. 實用範例 - 可迭代的購物車：");
class ShoppingCart {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    // 實作 Symbol.iterator，讓購物車可以被迭代
    [Symbol.iterator]() {
        let index = 0;
        const products = this.products;
        return {
            next() {
                if (index < products.length) {
                    return { value: products[index++], done: false };
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
}
exports.ShoppingCart = ShoppingCart;
// 建立購物車並新增商品
const cart = new ShoppingCart();
cart.addProduct({ id: 1, name: "蘋果", price: 30 });
cart.addProduct({ id: 2, name: "香蕉", price: 20 });
cart.addProduct({ id: 3, name: "橘子", price: 25 });
console.log("購物車商品：");
for (const product of cart) {
    if (product) {
        console.log(`- ${product.name}: $${product.price}`);
    }
}
// ============================================
// 5. 進階：Generator 函數簡化 Symbol.iterator
// ============================================
console.log("\n5. 使用 Generator 函數簡化：");
class EvenNumbers {
    constructor(max) {
        this.max = max;
    }
    // 使用 Generator 函數更簡潔地實作 Symbol.iterator
    *[Symbol.iterator]() {
        for (let i = 0; i <= this.max; i += 2) {
            yield i;
        }
    }
}
exports.EvenNumbers = EvenNumbers;
const evenNums = new EvenNumbers(10);
console.log("0到10的偶數：");
for (const num of evenNums) {
    console.log(num); // 0, 2, 4, 6, 8, 10
}
// ============================================
// 6. 實際應用：可以使用的其他方法
// ============================================
console.log("\n6. Symbol.iterator 讓物件支援的其他功能：");
const myRange = new NumberRange(1, 3);
// 解構賦值
console.log("解構賦值:", [...myRange]); // [1, 2, 3]
// Array.from()
console.log("Array.from():", Array.from(myRange)); // [1, 2, 3]
// 展開運算符
const rangeArray = [...myRange];
console.log("展開運算符:", Math.max(...rangeArray)); // 3
console.log("\n=== 完成！===");
