// ============================================
// 泛型函數範例: clone<T>
// ============================================

// 實作 clone 函數 (帶泛型)
function clone<T>(obj: T): T {
    // 簡單的深拷貝實作
    return JSON.parse(JSON.stringify(obj)) as T;
}

// ============================================
// 測試範例
// ============================================

console.log('=== 泛型函數 clone<T> 範例 ===\n');

// 1. 複製數字
const num = 123;
const clonedNum = clone(num);
console.log('1. 數字:', num, '→', clonedNum);
console.log('   型別:', typeof clonedNum);

// 2. 複製字串
const str = "Hello TypeScript";
const clonedStr = clone(str);
console.log('\n2. 字串:', str, '→', clonedStr);

// 3. 複製物件
const user = { 
    name: "小明", 
    age: 25,
    hobbies: ["閱讀", "運動"]
};
const clonedUser = clone(user);
console.log('\n3. 物件:');
console.log('   原始:', user);
console.log('   複製:', clonedUser);
console.log('   是否為同一個物件?', user === clonedUser);  // false
clonedUser.name = "小華";  // 修改複製品
console.log('   修改後原始:', user.name);      // 小明 (不受影響)
console.log('   修改後複製:', clonedUser.name); // 小華

// 4. 複製陣列
const numbers = [1, 2, 3, 4, 5];
const clonedNumbers = clone(numbers);
console.log('\n4. 陣列:', numbers, '→', clonedNumbers);
clonedNumbers.push(6);
console.log('   原始陣列:', numbers);        // [1, 2, 3, 4, 5]
console.log('   複製陣列:', clonedNumbers);  // [1, 2, 3, 4, 5, 6]

// 5. 複製複雜物件
interface Product {
    id: number;
    name: string;
    price: number;
    tags: string[];
}

const product: Product = {
    id: 1,
    name: "筆記型電腦",
    price: 25000,
    tags: ["電子產品", "3C"]
};

const clonedProduct = clone<Product>(product);  // 明確指定 T = Product
console.log('\n5. 複雜物件:');
console.log('   原始:', product);
console.log('   複製:', clonedProduct);

// ============================================
// 泛型的好處: 型別安全
// ============================================

console.log('\n=== 型別安全展示 ===');

// TypeScript 會自動推斷型別
const original = { x: 10, y: 20 };
const copied = clone(original);

// ✅ TypeScript 知道 copied 有 x 和 y 屬性
console.log('座標:', copied.x, copied.y);

// ❌ TypeScript 會報錯 (如果取消註解)
// console.log(copied.z);  // Property 'z' does not exist

// ============================================
// 對比: 不使用泛型
// ============================================

function cloneAny(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
}

const anyResult = cloneAny({ a: 1, b: 2 });
// anyResult 的型別是 any
// ❌ 沒有智能提示
// anyResult.  // <-- 這裡不會有自動完成提示

console.log('\n=== 完成 ===');
