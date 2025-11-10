// https://willh.gitbook.io/typescript-tutorial/basics/type-of-array
let fibonacci1: number[] = [1, 1, 2, 3, 5];
let fibonacci2: Array<number> = [1, 1, 2, 3, 5]; // 陣列泛型

// 介面表示陣列
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];

console.log("基本陣列範例:");
console.log("fibonacci1:", fibonacci1);
console.log("fibonacci2:", fibonacci2);
console.log("fibonacci interface:", fibonacci);

// ============================================
// 類別陣列 (Typed Arrays) 完整教學
// ============================================
console.log("\n=== 類別陣列 (Typed Arrays) 教學 ===");

/**
 * 什麼是類別陣列？
 * 1. TypeScript 中的陣列型別定義方式
 * 2. 確保陣列中的元素都是指定的型別
 * 3. 提供編譯時期的型別檢查和 IDE 智能提示
 */

// ============================================
// 1. 基本類別陣列語法
// ============================================
console.log("\n1. 基本類別陣列語法：");

// 方式一：使用方括號語法 (推薦)
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];
let flags: boolean[] = [true, false, true];

console.log("數字陣列:", numbers);
console.log("字串陣列:", names);
console.log("布林陣列:", flags);

// 方式二：使用 Array<T> 泛型語法
let scores: Array<number> = [85, 92, 78, 96];
let cities: Array<string> = ["台北", "台中", "高雄"];

console.log("成績陣列 (泛型):", scores);
console.log("城市陣列 (泛型):", cities);

// ============================================
// 2. 物件陣列 - 最常用的類別陣列
// ============================================
console.log("\n2. 物件陣列範例：");

/**
 * 學生介面定義
 * 用來描述學生物件的結構
 */
interface StudentInfo {
    id: number;
    name: string;
    age: number;
    grade: number;
    subjects: string[];
}

// 學生陣列 - 每個元素都必須符合 StudentInfo 介面
let students: StudentInfo[] = [
    {
        id: 1,
        name: "張小明",
        age: 16,
        grade: 10,
        subjects: ["數學", "英文", "物理"]
    },
    {
        id: 2,
        name: "李小華",
        age: 17,
        grade: 11,
        subjects: ["化學", "生物", "歷史"]
    },
    {
        id: 3,
        name: "王小美",
        age: 16,
        grade: 10,
        subjects: ["地理", "公民", "國文"]
    }
];

console.log("學生陣列:");
students.forEach((student, index) => {
    console.log(`${index + 1}. ${student.name} (${student.age}歲) - 年級: ${student.grade}`);
    console.log(`   修課科目: ${student.subjects.join(", ")}`);
});

// ============================================
// 3. 多維陣列 (二維、三維等)
// ============================================
console.log("\n3. 多維陣列：");

// 二維陣列 - 陣列的陣列
let matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log("二維數字矩陣:");
matrix.forEach((row, i) => {
    console.log(`第 ${i + 1} 列: [${row.join(", ")}]`);
});

// 三維陣列 - 更複雜的結構
let cube: number[][][] = [
    [[1, 2], [3, 4]],
    [[5, 6], [7, 8]]
];

console.log("三維陣列:", cube);

// 字串的二維陣列 - 實用範例
let schedule: string[][] = [
    ["數學", "英文", "體育"],      // 星期一課表
    ["物理", "化學", "歷史"],      // 星期二課表
    ["生物", "地理", "音樂"]       // 星期三課表
];

console.log("課程表 (二維字串陣列):");
const days = ["星期一", "星期二", "星期三"];
schedule.forEach((dayClasses, index) => {
    console.log(`${days[index]}: ${dayClasses.join(" → ")}`);
});

// ============================================
// 4. 聯合型別陣列 (Union Type Arrays)
// ============================================
console.log("\n4. 聯合型別陣列：");

// 可以包含多種型別的陣列
let mixedArray: (number | string)[] = [1, "hello", 2, "world", 3];
let mixedData: (boolean | number | string)[] = [true, 42, "TypeScript", false];

console.log("混合型別陣列:", mixedArray);
console.log("多重混合陣列:", mixedData);

// 實用範例：API 回應可能是不同型別
type ApiResponse = string | number | { error: string };
let apiResults: ApiResponse[] = [
    "成功",
    404,
    { error: "找不到資源" },
    200,
    "處理完成"
];

console.log("API 回應陣列:");
apiResults.forEach((result, index) => {
    if (typeof result === "string") {
        console.log(`回應 ${index + 1}: 訊息 - ${result}`);
    } else if (typeof result === "number") {
        console.log(`回應 ${index + 1}: 狀態碼 - ${result}`);
    } else {
        console.log(`回應 ${index + 1}: 錯誤 - ${result.error}`);
    }
});

// ============================================
// 5. 唯讀陣列 (ReadOnly Arrays)
// ============================================
console.log("\n5. 唯讀陣列：");

// 唯讀陣列 - 無法修改內容
let readonlyNumbers: readonly number[] = [1, 2, 3, 4, 5];
let readonlyNames: ReadonlyArray<string> = ["固定名單A", "固定名單B"];

console.log("唯讀數字陣列:", readonlyNumbers);
console.log("唯讀名稱陣列:", readonlyNames);

// ❌ 以下操作會在編譯時期報錯
// readonlyNumbers.push(6);        // 錯誤：唯讀陣列不能修改
// readonlyNumbers[0] = 10;        // 錯誤：不能指派值給索引
// readonlyNames.splice(0, 1);     // 錯誤：不能刪除元素

console.log("唯讀陣列確保資料不被意外修改，適合設定檔或常數資料");

// ============================================
// 6. 元組 (Tuples) - 固定長度和型別的陣列
// ============================================
console.log("\n6. 元組 (Tuples)：");

// 元組 - 每個位置都有固定的型別
let person: [string, number, boolean] = ["張三", 25, true];
let coordinate: [number, number] = [10.5, 20.3];
let rgbColor: [number, number, number] = [255, 128, 0];

console.log("個人資訊元組 [姓名, 年齡, 是否已婚]:", person);
console.log("座標元組 [x, y]:", coordinate);
console.log("RGB 顏色元組 [紅, 綠, 藍]:", rgbColor);

// 解構賦值搭配元組
let [personName, personAge, isMarried] = person;
let [x, y] = coordinate;
let [red, green, blue] = rgbColor;

console.log(`解構後: ${personName} 今年 ${personAge} 歲, 已婚: ${isMarried}`);
console.log(`座標: X=${x}, Y=${y}`);
console.log(`顏色: R=${red}, G=${green}, B=${blue}`);

// 可選元組元素
let optionalTuple: [string, number, boolean?] = ["測試", 123]; // 第三個元素可選
console.log("可選元組:", optionalTuple);

// ============================================
// 7. 陣列方法與型別安全
// ============================================
console.log("\n7. 陣列方法與型別安全：");

let productPrices: number[] = [100, 250, 80, 150, 300];

// map - 轉換每個元素，保持型別安全
let discountedPrices: number[] = productPrices.map(price => price * 0.8);
console.log("原價:", productPrices);
console.log("八折價:", discountedPrices);

// filter - 過濾元素，保持型別
let expensiveProducts: number[] = productPrices.filter(price => price > 200);
console.log("高價商品 (>200):", expensiveProducts);

// reduce - 累積計算
let totalPrice: number = productPrices.reduce((sum, price) => sum + price, 0);
let averagePrice: number = totalPrice / productPrices.length;
console.log(`總價: ${totalPrice}, 平均價格: ${averagePrice.toFixed(2)}`);

// find - 尋找元素 (可能回傳 undefined)
let foundPrice: number | undefined = productPrices.find(price => price === 150);
console.log("找到價格 150:", foundPrice ?? "未找到");

// ============================================
// 8. 實戰範例：購物車系統
// ============================================
console.log("\n8. 實戰範例 - 購物車系統：");

/**
 * 商品介面
 */
interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}

/**
 * 購物車項目介面
 */
interface CartItem {
    product: Product;
    quantity: number;
}

/**
 * 購物車類別
 */
class ShoppingCart {
    private items: CartItem[] = [];

    // 新增商品到購物車
    addProduct(product: Product, quantity: number = 1): void {
        const existingItem = this.items.find(item => item.product.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ product, quantity });
        }
    }

    // 移除商品
    removeProduct(productId: number): void {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    // 取得所有商品
    getItems(): CartItem[] {
        return [...this.items]; // 回傳拷貝，避免外部修改
    }

    // 計算總金額
    getTotalAmount(): number {
        return this.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    }

    // 取得商品分類統計
    getCategoryStats(): { [category: string]: number } {
        const stats: { [category: string]: number } = {};
        
        this.items.forEach(item => {
            const category = item.product.category;
            stats[category] = (stats[category] || 0) + item.quantity;
        });

        return stats;
    }
}

// 使用購物車系統
const cart = new ShoppingCart();

// 建立商品陣列
const products: Product[] = [
    { id: 1, name: "筆記型電腦", price: 25000, category: "電子產品" },
    { id: 2, name: "無線滑鼠", price: 800, category: "電子產品" },
    { id: 3, name: "咖啡豆", price: 350, category: "食品" },
    { id: 4, name: "T恤", price: 500, category: "服飾" }
];

// 新增商品到購物車
cart.addProduct(products[0], 1); // 筆記型電腦 x1
cart.addProduct(products[1], 2); // 無線滑鼠 x2
cart.addProduct(products[2], 3); // 咖啡豆 x3

console.log("購物車內容:");
cart.getItems().forEach(item => {
    const subtotal = item.product.price * item.quantity;
    console.log(`- ${item.product.name} x${item.quantity} = $${subtotal}`);
});

console.log(`\n總金額: $${cart.getTotalAmount()}`);
console.log("分類統計:", cart.getCategoryStats());

console.log("\n=== 類別陣列教學完成！===");
console.log("💡 重點回顧：");
console.log("1. 使用 type[] 或 Array<type> 定義陣列型別");
console.log("2. 介面陣列讓複雜資料結構更清晰");
console.log("3. 多維陣列適合矩陣、表格等結構");
console.log("4. 聯合型別陣列處理混合資料");
console.log("5. 唯讀陣列防止意外修改");
console.log("6. 元組提供固定長度和型別的陣列");
console.log("7. 型別安全讓陣列操作更可靠");

// 導出相關型別和類別
export type { StudentInfo, Product, CartItem };
export { ShoppingCart };


