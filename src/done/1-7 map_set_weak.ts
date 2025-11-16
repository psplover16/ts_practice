// ============================================
// Map / Set 與 WeakMap / WeakSet 差異與常用情境精簡版
// ============================================
// 目的：示範四種集合的差異、API、選用場景。

console.log('\n=== Map / Set vs WeakMap / WeakSet ===');

// ------------------------------------------------------------
// 差異總覽 (概念註解)
// ------------------------------------------------------------
//               | Map              | WeakMap                | Set               | WeakSet
// 型別限制      | 鍵任意型別        | 鍵必須是物件            | 值任意型別          | 值必須是物件
// 可迭代        | ✅ for..of/forEach | ❌ 不可迭代              | ✅ for..of/forEach  | ❌ 不可迭代
// size/clear    | ✅ size/clear     | ❌ 無 size/clear         | ✅ size/clear       | ❌ 無 size/clear
// 快速列出內容  | ✅ keys/values     | ❌ 無法列出              | ✅ values            | ❌ 無法列出
// 垃圾回收       | ❌ 保留強引用       | ✅ 失去外部引用會釋放      | ❌ 保留強引用         | ✅ 失去外部引用會釋放
// 典型用途       | 索引/快取統計       | 綁定物件私有資料/安全快取    | 去重集合/集合運算      | 也會去重/標記是否已處理/追蹤狀態
// ------------------------------------------------------------
// 記憶口訣：Weak = 弱引用、不迭代、無 size，只能針對單一物件查詢。

// ------------------------------------------------------------
// 1. Map 基本用法：鍵值對，可迭代
// set/get/has/delete/clear/size/keys/values/entries/forEach
// set('key', value) 賦值
// get('key') 取值
// has('key') 檢查是否存在
// delete('key') 刪除指定鍵
// clear() 清空全部
// size 獲取大小
// keys() 列出所有鍵
// values() 列出所有值
// entries() 列出所有鍵值對
// forEach 遍歷所有項目
// ------------------------------------------------------------
const userMap: Map<string, { age: number }> = new Map();
console.log(typeof userMap); // object
userMap.set('gary', { age: 30 });
userMap.set('bob', { age: 25 });
console.log('Map size:', userMap.size);

const userMap2: Map<string, { age: number }> = new Map([['Alice', { age: 28 }]]); // 另一種賦予及初始化方式
// userMap2.get('Alice') // 會回傳 { age: number } | undefined
// userMap2.get('Alice')?.age 可選鏈接存取屬性 若不存在回傳 undefined
// userMap2.get('Alice')!.age 非空斷言存取屬性 若不存在會拋錯 (確定一定存在時用非空斷言)
console.log('userMap2.Alice.age', userMap2.get('Alice')!.age); // get取值 // 28

console.log(userMap.has('gary')); // true，檢查是否存在

// keys/values/entries 列出內容，回傳的內容是可迭代物件，可用展開運算子轉成陣列
console.log('Map keys:', [...userMap.keys()]); // keys 列出所有鍵 // ['gary', 'bob']
console.log('Map values:', [...userMap.values()]); // values 列出所有值 // [ { age: 30 }, { age: 25 } ]
console.log('Map entries:', [...userMap.entries()]); // entries 列出所有鍵值對 // [ ['gary', { age: 30 }], ['bob', { age: 25 }] ]

// forEach 遍歷所有項目 // map 內建的 forEach 方法 // 參數是 (value, key, map 本身)
// 不能用 break / continue / return 直接中止外層迭代
// forEach 內用 async 不會「等待」前一筆完成（回呼平行啟動），不適合序列非同步
// forEach 可傳第二個參數 thisArg
userMap.forEach((value, key) => {
    console.log('Map forEach:', key, value.age);
    // forEach 不能用 break / continue / return 直接中止外層迭代
});
// for..of 迭代 // map 物件本身是可迭代的，迭代結果是 entries 鍵值對 //  [key, value]
// for...in 不能用於 Map 迭代，因為它會遍歷物件的可列舉屬性名稱，而 Map 的鍵值對不是物件的屬性
// 性能較好~
// 可用async function包起來使用 await
// 可用 break / continue / return / throw 控制迭代流程
// for..of 不提供 thisArg；需自行用箭頭函式/閉包
for (const [name, info] of userMap) {
	console.log('Map iterate:', name, info.age);
    // for..of 可以用 break / continue / return / throw
}

userMap.delete('bob'); // 刪除指定鍵
console.log('Map size after delete:', userMap.size);
userMap.clear(); // 清空全部
console.log('Map size after clear:', userMap.size);


// ------------------------------------------------------------
// 2. Set 基本用法：唯一值集合，去重
// add/has/delete/clear/size/values/entries/forEach
// add(value) 加入值
// has(value) 檢查是否存在
// delete(value) 刪除指定值
// clear() 清空全部
// size 獲取大小
// values() 列出所有值
// entries() 列出所有值 (key 與 value 相同)
// forEach 遍歷所有項目
// ------------------------------------------------------------
const tags: Set<string> = new Set(['js', 'ts', 'js']); // 自動去重
tags.add('node');
console.log('Set size:', tags.size, 'values:', [...tags]);
// 集合運算範例：交集
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5]);
const intersection = new Set([...setA].filter(x => setB.has(x))); // 3,4
console.log('Set intersection:', [...intersection]); // [3, 4]

for (const name of setA) {
	console.log('set iterate:', name); // 1,2,3,4
}
// ------------------------------------------------------------
// 3. WeakMap 典型用法：綁定私有資料 / 快取結果，不阻止垃圾回收
// set/get/has/delete
// set(obj, value) 賦值 (obj 必須是物件)
// get(obj) 取值
// has(obj) 檢查是否存在
// delete(obj) 刪除指定鍵
// 不可疊代、無 size/clear、不可列出內容
// ------------------------------------------------------------
// 建立一個 WeakMap 來存放物件的私有資料,避免外部直接存取。私有物件包含 secret(隨機ID) 和 count 屬性。
const privateData = new WeakMap<object, { secret: string; count: number }>();
class Person {
    // public name: string; 表示公開屬性，公開屬性可以被外部存取
    // constructor 表示建構子函式，在建立物件時會被呼叫
	constructor(public name: string) {
        // this是指當前物件的實例
        // 建構時初始化私有資料，把私有資料存到 WeakMap 裡
		privateData.set(this, { secret: 'ID-' + Math.random(), count: 0 });
	}
	touch() {
		const data = privateData.get(this);
		if (data) data.count++;
	}
	info() {
        // 假設privateData 沒有export
        // 外部(假設該模組是在別的檔案)無法直接存取，只能透過方法得到privateData
		return privateData.get(this); 
	}
}
let gary = new Person('Gary');
gary.touch();
console.log('WeakMap private info:', gary.info());
gary = null as any; // 物件釋放後，privateData 對應記憶體可被 GC 清除

// 快取計算：避免重複昂貴操作，物件失效自動釋放
const calcCache = new WeakMap<object, number>();
function expensive(obj: object): number {
	if (calcCache.has(obj)) return calcCache.get(obj)!;
	const result = Math.floor(Math.random() * 1000); // 模擬重計算
	calcCache.set(obj, result);
	return result;
}
const payload = { data: [1, 2, 3] };
console.log('Expensive first:', expensive(payload));
console.log('Expensive cached:', expensive(payload));

// ------------------------------------------------------------
// 4. WeakSet 典型用法：標記是否已處理 / 防重複
// set(obj) 加入物件 (obj 必須是物件)
// has(obj) 檢查是否存在
// delete(obj) 刪除指定物件
// 不可疊代、無 size/clear、不可列出內容
// ------------------------------------------------------------
const processed = new WeakSet<object>();
function handle(obj: object) {
	if (processed.has(obj)) {
		console.log('Already processed');
		return;
	}
	processed.add(obj);
	console.log('Processing...');
}
const job1 = { id: 1 };
handle(job1); // Processing...
handle(job1); // Already processed

// ------------------------------------------------------------
// 5. 選用建議
// ------------------------------------------------------------
// Map：需要全部列出 / 統計 / 序列化 / 鍵不一定是物件。
// Set：需要唯一值集合、去重、集合運算。
// WeakMap：關聯額外資料但不希望延長物件生命週期 (DOM、快取、私有狀態)。
// WeakSet：只需標記物件是否已處理 / 已註冊，不需要遍歷或計數。

// ------------------------------------------------------------
// 6. 常見錯誤示例
// ------------------------------------------------------------
// weakMap.set('x', 1);      // ❌ 錯誤：鍵不是物件
// weakSet.add('x');         // ❌ 錯誤：值不是物件
// [...weakMap];             // ❌ 不可迭代
// weakMap.size;             // ❌ 無 size 屬性

// ------------------------------------------------------------
// 7. 總結記憶
// ------------------------------------------------------------
// Map/Set = 完整功能 + 可遍歷 + 有 size。
// WeakMap/WeakSet = 只做關聯或標記，不遍歷，讓 GC 自然清理，避免記憶體洩漏。

console.log('\n=== Done: Map / Set vs WeakMap / WeakSet Demo ===');

