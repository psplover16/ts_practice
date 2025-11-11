// ============================================
// 泛型 (Generics) 簡明教學
// ============================================

// 核心概念: 泛型 = 「型別的變數」,讓函數/類別可以處理多種型別,同時保持型別安全

// ============================================
// 1. 基本泛型語法 - Array<T>
// ============================================

// 不使用泛型 (失去型別資訊)
let anyScores: Array<any> = [85, 92, "78", true];  // ❌ 可以放任何東西
// anyScores[0].toUpperCase();  // ❌ 執行時才發現錯誤 (註解掉避免執行時報錯)

// 使用泛型 (保持型別安全)
let scores: Array<number> = [85, 92, 78, 96];  // ✅ 只能放數字
// let scores: number[] = [85, 92, 78, 96];  // ✅ 只能放數字，同上
// scores.push("100");  // ❌ TypeScript 立即報錯!

console.log('陣列泛型:', scores);

// ============================================
// 2. 泛型函數 - function<T>
// ============================================

// 範例: 不使用泛型
function getFirstAny(arr: any[]): any {
    return arr[0];
}

const firstAny = getFirstAny([1, 2, 3]);
// firstAny 的型別是 any (不知道是什麼)

// 範例: 使用泛型
function getFirst<T>(arr: T[]): T {
    return arr[0];
}

const firstNum = getFirst([1, 2, 3]);        // T = number
const firstStr = getFirst(["a", "b", "c"]); // T = string

console.log('\n泛型函數:');
console.log('第一個數字:', firstNum);  // 型別: number
console.log('第一個字串:', firstStr);  // 型別: string

// ============================================
// 3. 泛型的實際應用 - clone 函數
// ============================================

// ❌ 不使用泛型 (any 版本)
function cloneWithAny(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
}

const user1 = { name: "小明", age: 25 };
const copied1 = cloneWithAny(user1);
// copied1 的型別是 any,沒有智能提示
// copied1.xyz;  // ❌ 不會報錯,但執行時可能出問題

// ✅ 使用泛型 (保持型別)
// <T> 宣告一個泛型 T
function cloneWithGeneric<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

const user2 = { name: "小華", age: 30 };
const copied2 = cloneWithGeneric(user2);
// copied2 的型別是 { name: string; age: number }
// copied2.name;  // ✅ 有智能提示
// copied2.xyz;   // ❌ TypeScript 立即報錯

console.log('\nclone 函數:');
console.log('原始:', user2);
console.log('複製:', copied2);

// ============================================
// 4. 多個泛型參數
// ============================================
// 此處 [T,U] 表示回傳一個元組 (tuple)
// 元組 = 固定長度、每個位置型別固定的陣列
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const p1 = pair(1, "hello");        // [number, string]
const p2 = pair(true, { x: 10 });   // [boolean, { x: number }]

console.log('\n多個泛型參數:');
console.log('pair(1, "hello"):', p1);
console.log('pair(true, { x: 10 }):', p2);

// ============================================
// 5. 泛型介面
// ============================================
// 定義Box介面，包含泛型T
interface Box<T> {
    value: T; // 儲存T型別的值
    getValue(): T; // 回傳T型別的值
}

const numberBox: Box<number> = {
    value: 123,
    getValue() {
        return this.value;
    }
};

const stringBox: Box<string> = {
    value: "Hello",
    getValue() {
        return this.value;
    }
};

console.log('\n泛型介面:');
console.log('numberBox:', numberBox.getValue());
console.log('stringBox:', stringBox.getValue());

// ============================================
// 6. 泛型約束 - extends
// ============================================

// 限制 T 必須有 length 屬性
function getLength<T extends { length: number }>(item: T): number {
    return item.length;
}

console.log('\n泛型約束:');
console.log('字串長度:', getLength("hello"));        // ✅ string 有 length
console.log('陣列長度:', getLength([1, 2, 3]));      // ✅ array 有 length
// console.log(getLength(123));  // ❌ number 沒有 length,報錯!

// ============================================
// 重點總結
// ============================================

console.log('\n=== 泛型重點 ===');
console.log('1. 泛型 = 型別的參數,用 <T> 表示');
console.log('2. 保持型別安全,避免使用 any');
console.log('3. 常見用法: Array<T>, Promise<T>, function<T>');
console.log('4. 可以有多個泛型參數: <T, U, V>');
console.log('5. 可以約束泛型: <T extends Type>');

// ============================================
// 對比表
// ============================================
/*
┌─────────────────┬───────────────┬─────────────────┐
│     特性        │     any       │    泛型 <T>     │
├─────────────────┼───────────────┼─────────────────┤
│ 型別推斷        │ ❌ 無         │ ✅ 自動推斷     │
│ 智能提示        │ ❌ 無         │ ✅ 有           │
│ 型別檢查        │ ❌ 無         │ ✅ 有           │
│ 錯誤提前發現    │ ❌ 執行時     │ ✅ 編譯時       │
└─────────────────┴───────────────┴─────────────────┘
*/