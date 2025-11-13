// ============================================
// TypeScript 內建物件 (Built-in Objects)
// ============================================
// TypeScript 核心函式庫定義檔包含了所有瀏覽器環境需要用到的型別
// 並且預置了所有內建物件的型別

console.log('=== TypeScript 內建物件介紹 ===\n');

// ============================================
// 1. ECMAScript 標準內建物件
// ============================================

// Boolean
const isDone: Boolean = new Boolean(true); // 使用大寫 Boolean (物件) 型別
const isActive: boolean = false; // 推薦用小寫 boolean (基本型別)
console.log('1. Boolean:', isDone.valueOf(), isActive);

// Number
const decimal: Number = new Number(6);
const pi: number = 3.14159; // 推薦用小寫 number
console.log('2. Number:', decimal.valueOf(), pi);

// String
const greeting: String = new String('Hello');
const userName: string = 'TypeScript'; // 推薦用小寫 string
console.log('3. String:', greeting.valueOf(), userName);

// Date - 日期物件
const today: Date = new Date();
const birthday: Date = new Date('2000-01-01');
console.log('4. Date:', today.toLocaleDateString(), birthday.getFullYear());

// RegExp - 正則表達式
const pattern: RegExp = /[a-z]+/g;
const pattern2: RegExp = new RegExp('[0-9]+', 'i');
console.log('5. RegExp:', pattern.test('hello'), pattern2.source);

// Error - 錯誤物件
const error: Error = new Error('Something went wrong');
console.log('6. Error:', error.message);

// ============================================
// 2. Array 相關
// ============================================

// 陣列的多種寫法
const numbers: number[] = [1, 2, 3, 4, 5];
const strings: Array<string> = ['a', 'b', 'c'];
const mixed: (number | string)[] = [1, 'two', 3];

console.log('\n=== Array 陣列 ===');
console.log('numbers:', numbers);
console.log('mapped:', numbers.map(n => n * 2));
console.log('filtered:', numbers.filter(n => n > 2));
console.log('reduced:', numbers.reduce((sum, n) => sum + n, 0));

// ============================================
// 3. Promise - 非同步操作
// ============================================

console.log('\n=== Promise 非同步 ===');

// Promise<T> 泛型，T 是 resolve 的值型別
const promise1: Promise<number> = new Promise((resolve) => {
    setTimeout(() => resolve(42), 100);
});

promise1.then((value: number) => {
    console.log('Promise resolved:', value);
});

// async/await
async function fetchData(): Promise<string> {
    return 'Data loaded';
}
// function fetchData(): Promise<string> {
//     return Promise.resolve('Data loaded');  // 自動包成 Promise
// }
fetchData().then(data => console.log('Async result:', data));

// ============================================
// 4. Map 和 Set - ES6 集合
// ============================================

console.log('\n=== Map & Set ===');

// Map<K, V> - 鍵值對集合，會有記憶體洩漏的問題，不會主動清除垃圾
const userMap: Map<number, string> = new Map();
userMap.set(1, 'Alice');
userMap.set(2, 'Bob');
console.log('Map size:', userMap.size); // 2
console.log('Get key 1:', userMap.get(1)); // Alice

// Set<T> - 唯一值集合
const uniqueNumbers: Set<number> = new Set([1, 2, 2, 3, 3, 4]);
uniqueNumbers.add(4); // 已存在，不會重複加入
console.log(typeof uniqueNumbers); // object,uniqueNumbers = {1,2,3,4}
console.log('Set (去重後):', Array.from(uniqueNumbers)); // [1, 2, 3, 4]

// ============================================
// 5. Symbol - ES6 唯一識別符
// ============================================

const sym1: symbol = Symbol('key1');
const sym2: symbol = Symbol('key1');
console.log('\n=== Symbol ===');
console.log('Symbol 相等?', sym1 === sym2); // false，每個都是唯一的

// ============================================
// 6. JSON - 資料序列化
// ============================================

console.log('\n=== JSON ===');

interface User {
    name: string;
    age: number;
}

const user: User = { name: 'Gary', age: 30 };
const jsonString: string = JSON.stringify(user);
console.log(typeof jsonString); // string
console.log('JSON.stringify:', jsonString); // {"name":"Gary","age":30}

const parsedUser: User = JSON.parse(jsonString);
console.log(typeof parsedUser); // object
console.log('JSON.parse:', parsedUser);

// ============================================
// 7. Math - 數學運算
// ============================================

console.log('\n=== Math 數學 ===');
console.log('Math.PI:', Math.PI);
console.log('Math.random():', Math.random());
console.log('Math.max(1,5,3):', Math.max(1, 5, 3));
console.log('Math.round(4.7):', Math.round(4.7));
console.log('Math.floor(4.7):', Math.floor(4.7));
console.log('Math.ceil(4.1):', Math.ceil(4.1));

// ============================================
// 8. Object 物件操作
// ============================================

console.log('\n=== Object 操作 ===');

const obj = { a: 1, b: 2, c: 3 };
console.log('Object.keys:', Object.keys(obj));
console.log('Object.values:', Object.values(obj));
console.log('Object.entries:', Object.entries(obj)); // 意思是將物件轉成鍵值對陣列

const copy = Object.assign({}, obj, { d: 4 }); // 創建一個空物件，淺複製 obj 並新增 d 屬性，若d已存在則覆蓋
console.log('Object.assign:', copy); // 

// ============================================
// 9. WeakMap 和 WeakSet - 弱引用集合
// ============================================

console.log('\n=== WeakMap & WeakSet ===');

// WeakMap - 鍵必須是物件，不會阻止垃圾回收~記憶體自動釋放
// 無法知道有幾個項目
// 無法跌代，只能查詢特定的鍵
const weakMap: WeakMap<object, string> = new WeakMap();
const key = { id: 1 };
weakMap.set(key, 'value');
weakMap.has(key);           // 檢查 → true
// weakMap.delete(key);        // 刪除 → true
console.log('WeakMap get:', weakMap.get(key));

// WeakSet - 只能存物件
const weakSet: WeakSet<object> = new WeakSet();
weakSet.add(key);
// weakSet.delete(key);  // 刪除 → true
console.log('WeakSet has:', weakSet.has(key));

// ============================================
// 10. ArrayBuffer 和 TypedArray - 二進位資料
// ============================================

console.log('\n=== ArrayBuffer & TypedArray ===');

// ArrayBuffer - 固定長度的原始二進位資料緩衝區
const buffer: ArrayBuffer = new ArrayBuffer(16); // 16 bytes
console.log('Buffer byteLength:', buffer.byteLength);

// Int32Array - 32位元整數陣列
const int32View: Int32Array = new Int32Array(buffer);
int32View[0] = 42;
console.log('Int32Array[0]:', int32View[0]);

// Uint8Array - 8位元無號整數陣列 (常用於處理二進位資料)
const uint8View: Uint8Array = new Uint8Array(buffer);
console.log('Uint8Array length:', uint8View.length);

// ============================================
// 11. Proxy 和 Reflect - 元編程
// ============================================

console.log('\n=== Proxy & Reflect ===');

const target = { name: 'Original' };
const handler = {
    get(obj: any, prop: string) {
        console.log(`  存取屬性: ${prop}`);
        return prop in obj ? obj[prop] : 'Not found';
    }
};

const proxy: any = new Proxy(target, handler);
console.log('Proxy result:', proxy.name);
console.log('Proxy result:', proxy.age);

// Reflect - 提供攔截 JS 操作的方法
console.log('Reflect.has:', Reflect.has(target, 'name'));

// ============================================
// 12. Intl - 國際化 API
// ============================================

console.log('\n=== Intl 國際化 ===');

// 日期格式化
const dateFormatter = new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
console.log('日期格式:', dateFormatter.format(new Date()));

// 數字格式化
const numberFormatter = new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD'
});
console.log('貨幣格式:', numberFormatter.format(12345.67));

// ============================================
// 13. 型別斷言與內建物件
// ============================================

console.log('\n=== 型別斷言 ===');

// 當需要更精確的型別時
const someValue: any = 'this is a string';
const strLength1: number = (someValue as string).length;
const strLength2: number = (<string>someValue).length; // JSX 中不可用
console.log('String length:', strLength1, strLength2);

// ============================================
// 重點提醒
// ============================================

console.log('\n=== 重點提醒 ===');
console.log('✅ 優先使用小寫基本型別: string, number, boolean');
console.log('✅ 大寫物件型別用於物件包裝: String, Number, Boolean (較少用)');
console.log('✅ TypeScript 會自動推斷大部分型別');
console.log('✅ 內建物件都有完整的型別定義在 lib.d.ts');
console.log('✅ 可用 lib 選項控制要載入哪些內建型別定義');

// ============================================
// tsconfig.json 的 lib 設定範例
// ============================================
/*
{
  "compilerOptions": {
    "lib": [
      "ES2020",        // ECMAScript 2020 功能
      "DOM",           // 瀏覽器 DOM API
      "DOM.Iterable",  // DOM 集合的迭代器
      "WebWorker"      // Web Worker API (可選)
    ]
  }
}
*/

// DOM 和 BOM 提供的內建物件有：
// Document、HTMLElement、Event、NodeList 等。
// let body: HTMLElement = document.body;
// let allDiv: NodeList = document.querySelectorAll('div');
// console.log(body)