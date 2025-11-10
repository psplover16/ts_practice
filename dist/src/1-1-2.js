"use strict";
// Symbol.iterator 完整教學範例
// Symbol.iterator 是讓物件可以被 for...of 迴圈遍歷的關鍵
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskQueue = exports.FibonacciSequence = exports.GradeBook = exports.NumberRange = void 0;
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
// 物件的迭代器（沒有內建）
const obj = { a: 1, b: 2 };
console.log("物件的迭代器:", obj[Symbol.iterator]); // undefined // 告訴 TypeScript「別管型別了，當作任何型別都可以」
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
/**
 * 數字範圍迭代器
 * 功能：產生從 start 到 end 的連續數字
 * 重點：實作 Symbol.iterator 方法讓物件可被 for...of 迭代
 */
class NumberRange {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    // 🔑 關鍵方法：實作 Symbol.iterator
    // 這個方法告訴 JavaScript：「我知道如何一個一個提供我的值」
    [Symbol.iterator]() {
        let current = this.start; // 目前要提供的值
        const end = this.end; // 結束條件
        // 回傳迭代器物件，必須有 next() 方法
        return {
            next() {
                if (current <= end) {
                    // 還有值要提供：回傳當前值並遞增
                    return { value: current++, done: false };
                }
                else {
                    // 沒有更多值：標記結束
                    return { value: undefined, done: true };
                }
            }
        };
    }
}
exports.NumberRange = NumberRange;
// 🚀 使用自訂的數字範圍迭代器
const range = new NumberRange(1, 5);
console.log("使用 for...of 迴圈遍歷：");
for (const num of range) {
    console.log(`數字: ${num}`);
}
console.log("\n手動使用迭代器：");
const rangeIterator = range[Symbol.iterator]();
let result = rangeIterator.next();
while (!result.done) {
    console.log("手動取得值:", result.value);
    result = rangeIterator.next();
}
// ============================================
// 4. 自訂可迭代物件 - 範例2：學生成績簿
// ============================================
console.log("\n4. 實用範例 - 學生成績簿：");
/**
 * 成績簿類別 - 可以迭代所有學生
 * 功能：儲存學生資料並提供迭代功能
 * 特色：可以用 for...of 直接遍歷所有學生
 */
class GradeBook {
    constructor() {
        this.students = [];
    }
    // 新增學生
    addStudent(student) {
        this.students.push(student);
    }
    // 🔑 實作 Symbol.iterator 讓成績簿可被迭代
    [Symbol.iterator]() {
        let index = 0; // 目前索引位置
        const students = this.students; // 學生陣列的參考
        return {
            next() {
                if (index < students.length) {
                    // 還有學生：回傳當前學生並遞增索引
                    return { value: students[index++], done: false };
                }
                else {
                    // 沒有更多學生：標記結束
                    return { value: undefined, done: true };
                }
            }
        };
    }
    // 額外功能：取得總數
    getTotal() {
        return this.students.length;
    }
}
exports.GradeBook = GradeBook;
// 🚀 使用成績簿
const gradeBook = new GradeBook();
gradeBook.addStudent({ id: 1, name: "小明", score: 85 });
gradeBook.addStudent({ id: 2, name: "小華", score: 92 });
gradeBook.addStudent({ id: 3, name: "小美", score: 78 });
console.log(`成績簿總共有 ${gradeBook.getTotal()} 位學生：`);
for (const student of gradeBook) {
    if (student) { // TypeScript 安全檢查
        console.log(`${student.name} (ID: ${student.id}) - 分數: ${student.score}`);
    }
}
// ============================================
// 5. 進階範例：使用 Generator 函數簡化迭代器
// ============================================
console.log("\n5. Generator 函數簡化版本：");
/**
 * 費波那契數列產生器
 * 功能：產生費波那契數列 (0, 1, 1, 2, 3, 5, 8, 13...)
 * 特色：使用 Generator 函數讓程式碼更簡潔
 */
class FibonacciSequence {
    constructor(maxCount) {
        this.maxCount = maxCount;
    }
    // 🌟 使用 Generator 函數 (* 符號) 簡化 Symbol.iterator
    // Generator 會自動處理 next() 和 return 的邏輯
    *[Symbol.iterator]() {
        let count = 0;
        let a = 0, b = 1;
        while (count < this.maxCount) {
            yield a; // yield = 提供一個值並暫停
            [a, b] = [b, a + b]; // 計算下一個費波那契數
            count++;
        }
    }
}
exports.FibonacciSequence = FibonacciSequence;
// 🚀 使用費波那契數列
const fibonacci = new FibonacciSequence(8);
console.log("前8個費波那契數：");
for (const num of fibonacci) {
    console.log(num);
}
// ============================================
// 6. 更多應用：迭代器支援的其他功能
// ============================================
console.log("\n6. 自訂迭代器支援的其他 JavaScript 功能：");
const myRange = new NumberRange(1, 3);
// 解構賦值 - 把迭代器的值展開到陣列
console.log("解構賦值:", [...myRange]);
// Array.from() - 從迭代器建立陣列
console.log("Array.from():", Array.from(myRange));
// 展開運算符配合其他函數
const rangeNumbers = [...myRange];
console.log("數字總和:", rangeNumbers.reduce((sum, num) => sum + num, 0));
console.log("最大值:", Math.max(...rangeNumbers));
// ============================================
// 7. 實戰範例：任務佇列迭代器
// ============================================
console.log("\n7. 實戰範例 - 任務佇列：");
/**
 * 任務佇列 - 可以迭代未完成的任務
 * 功能：只迭代未完成的任務，已完成的會跳過
 * 實用性：在實際專案中經常需要過濾特定條件的資料
 */
class TaskQueue {
    constructor() {
        this.tasks = [];
    }
    addTask(task) {
        this.tasks.push(task);
    }
    // 標記任務完成
    completeTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = true;
        }
    }
    // 🔑 只迭代未完成的任務
    *[Symbol.iterator]() {
        for (const task of this.tasks) {
            if (!task.completed) { // 只提供未完成的任務
                yield task;
            }
        }
    }
    // 取得所有任務（包含已完成）
    getAllTasks() {
        return [...this.tasks];
    }
}
exports.TaskQueue = TaskQueue;
// 🚀 使用任務佇列
const taskQueue = new TaskQueue();
taskQueue.addTask({ id: 1, title: "寫程式", completed: false });
taskQueue.addTask({ id: 2, title: "測試程式", completed: true });
taskQueue.addTask({ id: 3, title: "部署程式", completed: false });
console.log("所有任務:", taskQueue.getAllTasks());
console.log("\n待完成任務：");
for (const task of taskQueue) {
    console.log(`- ${task.title} (ID: ${task.id})`);
}
console.log("\n完成一個任務後...");
taskQueue.completeTask(1);
console.log("剩餘待完成任務：");
for (const task of taskQueue) {
    console.log(`- ${task.title} (ID: ${task.id})`);
}
console.log("\n=== 自訂迭代器教學完成！===");
console.log("💡 重點回顧：");
console.log("1. Symbol.iterator 讓物件可被 for...of 迭代");
console.log("2. 迭代器必須回傳有 next() 方法的物件");
console.log("3. next() 回傳 {value, done} 格式");
console.log("4. Generator 函數 (*) 可簡化迭代器實作");
console.log("5. 迭代器支援解構賦值、Array.from、展開運算符等功能");
const a = {
    data: {
        a: 1,
        b: 2
    },
    // a沒有疊代器,需要自訂
    [Symbol.iterator]() {
        let i = 0;
        return {
            next: () => ({
                value: Object.values(this.data)[i++],
                done: i > Object.keys(this.data).length
            })
        };
    }
};
for (const num of a) {
    console.log(num);
}
