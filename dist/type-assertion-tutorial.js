"use strict";
// 型別斷言 (Type Assertion) 詳解：obj as any
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasIterator = hasIterator;
exports.checkIterable = checkIterable;
console.log("=== 型別斷言 (as any) 教學 ===\n");
// ============================================
// 1. 問題：為什麼需要 as any？
// ============================================
console.log("1. 原始問題：");
const obj = { a: 1, b: 2 };
// ❌ 這樣會報錯，因為 TypeScript 知道 obj 沒有 Symbol.iterator 屬性
// console.log("物件的迭代器:", obj[Symbol.iterator]); 
// ✅ 使用 as any 告訴 TypeScript：「信任我，當作 any 型別處理」
console.log("物件的迭代器:", obj[Symbol.iterator]); // undefined
console.log("解釋：普通物件 {a: 1, b: 2} 確實沒有 Symbol.iterator 屬性");
// ============================================
// 2. 型別斷言的其他形式
// ============================================
console.log("\n2. 型別斷言的不同寫法：");
// 方式一：as 語法 (推薦)
const value1 = obj[Symbol.iterator];
console.log("as 語法:", value1);
// 方式二：尖括號語法 (較少用，因為與 JSX 衝突)
const value2 = obj[Symbol.iterator];
console.log("尖括號語法:", value2);
// ============================================
// 3. 更安全的替代方案
// ============================================
console.log("\n3. 更安全的寫法：");
// 方式一：使用 in 運算符檢查
if (Symbol.iterator in obj) {
    console.log("物件有迭代器:", obj[Symbol.iterator]);
}
else {
    console.log("物件沒有迭代器");
}
// 方式二：使用可選鏈結合型別斷言
const iteratorMethod = obj[Symbol.iterator];
console.log("安全取得迭代器:", iteratorMethod ?? "沒有迭代器");
// 方式三：建立型別守衛函數
function hasIterator(value) {
    return value != null && typeof value[Symbol.iterator] === 'function';
}
if (hasIterator(obj)) {
    console.log("物件可迭代");
}
else {
    console.log("物件不可迭代");
}
// ============================================
// 4. 型別斷言 vs 型別轉換
// ============================================
console.log("\n4. 型別斷言 vs 型別轉換：");
const numStr = "123";
// 型別斷言 - 只是告訴編譯器「當作數字看待」，不會真的轉換
// const num1 = numStr as number; // ❌ 這是錯誤的使用！
// 型別轉換 - 真的把資料轉換成另一種型別
const num2 = Number(numStr); // ✅ 正確的轉換
console.log("字串轉數字:", num2, typeof num2);
// ============================================
// 5. 常見的 as any 使用場景
// ============================================
console.log("\n5. as any 的常見使用場景：");
// 場景一：存取動態屬性
const dynamicObj = { name: "張三", age: 30 };
const propertyName = "name";
console.log("動態存取屬性:", dynamicObj[propertyName]);
const incompleteUser = { id: 1 }; // 缺少 name 屬性
// const user: User = incompleteUser; // ❌ 型別錯誤
const user = incompleteUser; // ✅ 暫時繞過（不建議長期使用）
console.log("不完整的使用者:", user);
// ============================================
// 6. as any 的風險和建議
// ============================================
console.log("\n6. 使用 as any 的風險：");
console.log("⚠️  風險：");
console.log("- 失去型別安全保護");
console.log("- 可能在執行時出錯");
console.log("- 難以重構和維護");
console.log("\n💡 建議：");
console.log("- 盡量避免使用 as any");
console.log("- 如果必須使用，加上註解說明原因");
console.log("- 考慮使用更具體的型別斷言");
console.log("- 使用型別守衛函數增加安全性");
// ============================================
// 7. 更好的替代方案範例
// ============================================
console.log("\n7. 更好的替代方案：");
const objWithType = { a: 1, b: 2 };
console.log("有型別定義的物件迭代器:", objWithType[Symbol.iterator]);
function checkIterable(value) {
    if (Symbol.iterator in value) {
        console.log("這個物件可以迭代");
        return value[Symbol.iterator];
    }
    else {
        console.log("這個物件不能迭代");
        return null;
    }
}
checkIterable(obj);
checkIterable([1, 2, 3]); // 陣列是可迭代的
console.log("\n=== 型別斷言教學完成！===");
console.log("記住：as any 是最後手段，優先考慮型別安全的方案！");
