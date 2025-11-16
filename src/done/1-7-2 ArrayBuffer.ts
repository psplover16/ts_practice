// ============================================
// ArrayBuffer(記憶體緩衝區) 和 TypedArray(工具箱) - 二進位資料完整教學
// ============================================
// 白話說明：
// ArrayBuffer = 一個固定大小的「空箱子」（原始記憶體空間）
// TypedArray = 「操作箱子的工具」（決定如何讀寫箱子裡的資料）(把空箱子當成不同格式的資料陣列，所以還是必須按照格式來讀寫)
// 
// 核心概念：
// 1. ArrayBuffer 本身不能直接讀寫，必須透過 TypedArray「視圖」來操作
// 2. 多個 TypedArray 可以同時看同一個 ArrayBuffer（共享記憶體）
// 3. 用於處理二進位資料：檔案、圖片、音訊、網路傳輸等
// ============================================

console.log('\n=== ArrayBuffer & TypedArray 完整教學 ===\n');

// ------------------------------------------------------------
// 1. ArrayBuffer 基礎概念
// bit（位元，縮寫 b）：只能是 0 或 1。
// nibble（半位元組）：4 bits。
// byte（位元組，縮寫 B）：8 bits = 2 nibbles。
// 十六進位字元：1 個 hex 字元 = 4 bits（半 byte）。
// 2 個十六進位字元 = 1 byte（例如 FF = 255）。
// ------------------------------------------------------------
console.log('--- 1. ArrayBuffer 是什麼？---');

// ArrayBuffer = 固定長度的原始二進位資料緩衝區（raw binary data buffer）
// 就像一個「空的置物箱」，裡面沒有格式，只是一塊連續的記憶體空間

// 1 byte = 8 bits（位元）= 一個 0–255 的無號整數 = 一個 Uint8 = 一個 ASCII 字元（僅限基本 ASCII） = 一個常見 8 位色彩「通道」
// 顏色通道(color channel)：RGBA 中的單一成分 (R / G / B / A)，典型 Web 圖像每通道 8 bits => 1 byte。
// #RGB / #RGBA 是縮寫：#RGB 展開成 #RRGGBB；#RGBA 展開成 #RRGGBBAA。
// 範例：#RRGGBB （6 個十六進位字元）= 3 bytes（R,G,B 三通道）；#RRGGBBAA （8 個十六進位字元）= 4 bytes（再加 Alpha）。

const buffer1: ArrayBuffer = new ArrayBuffer(16); // 建立 16 bytes 的記憶體空間，建立32 個十六進位字元
console.log('型別', typeof buffer1); // object
// console.log('長度', buffer1.length); // undefined，沒有該屬性
console.log('箱子大小（bytes）:', buffer1.byteLength); // 16

// ❌ 無法直接讀寫 ArrayBuffer
// buffer1[0] = 10;  // 錯誤！ArrayBuffer 沒有索引存取
// console.log(buffer1[0]);  // undefined

// ✅ 必須透過「視圖」(TypedArray) 來操作
console.log('ArrayBuffer 本身只是記憶體空間，需要視圖才能操作\n');

// ------------------------------------------------------------
// 2. TypedArray 常用類型總覽
// ------------------------------------------------------------
console.log('--- 2. TypedArray 工具箱 ---');
console.log('每種 TypedArray 就是一種「讀寫格式」\n');

// 建立一個 8 bytes 的箱子來示範
const buffer2: ArrayBuffer = new ArrayBuffer(8); // 8ytes 箱子

// 🔧 工具 1：Int32Array（每格 4 bytes，帶號整數）
const int32Tool = new Int32Array(buffer2);
console.log('Int32Array 格數:', int32Tool.length); // 8÷4 = 2 格
console.log('每格大小:', Int32Array.BYTES_PER_ELEMENT, 'bytes'); // 4
console.log('值範圍: -2,147,483,648 ~ 2,147,483,647\n');

// 🔧 工具 2：Uint8Array（每格 1 byte，無號整數）
const uint8Tool = new Uint8Array(buffer2); // buffer2箱子使用Uint8Array 工具
// const uint8Tool2 = new Uint8Array(8); // 建立一個長度為8的Uint8Array
console.log('每格大小:', Uint8Array.BYTES_PER_ELEMENT, 'bytes'); // 1格需要1byte
console.log('Uint8Array 格數:', uint8Tool.length); // 8÷1 = 8 格
// console.log('uint8Tool2: 長度', uint8Tool2.length); // 8
// uint8Tool 可以儲存8個無號整數（0~255）
console.log('值範圍: 0 ~ 255（最常用！）\n'); // 1byte = 8bits，1byte 為2的8次方 = 256種可能，範圍是0~255

// 🔧 工具 3：Float32Array（每格 4 bytes，浮點數）
const buffer3 = new ArrayBuffer(8);
const float32Tool = new Float32Array(buffer3);
console.log('Float32Array 格數:', float32Tool.length); // 8÷4 = 2 格
console.log('每格大小:', Float32Array.BYTES_PER_ELEMENT, 'bytes'); // 4
console.log('可存小數，例如 3.14159\n');

// ------------------------------------------------------------
// TypedArray 完整對照表
// ------------------------------------------------------------
// console.log('--- TypedArray 完整對照表 ---');
// console.log('類型'.padEnd(20), '每格大小', '值範圍'.padEnd(30), '常用場景');
// console.log('─'.repeat(80));
// console.log('Int8Array'.padEnd(20), '1 byte', '-128 ~ 127'.padEnd(30), '小整數');
// console.log('Uint8Array'.padEnd(20), '1 byte', '0 ~ 255'.padEnd(30), '⭐ 二進位資料、檔案、圖片');
// console.log('Uint8ClampedArray'.padEnd(20), '1 byte', '0 ~ 255 (截斷)'.padEnd(30), 'Canvas 像素操作');
// console.log('Int16Array'.padEnd(20), '2 bytes', '-32,768 ~ 32,767'.padEnd(30), '音訊樣本');
// console.log('Uint16Array'.padEnd(20), '2 bytes', '0 ~ 65,535'.padEnd(30), '音訊樣本');
// console.log('Int32Array'.padEnd(20), '4 bytes', '-2³¹ ~ 2³¹-1'.padEnd(30), '大整數');
// console.log('Uint32Array'.padEnd(20), '4 bytes', '0 ~ 2³²-1'.padEnd(30), '大整數');
// console.log('Float32Array'.padEnd(20), '4 bytes', '±3.4×10³⁸'.padEnd(30), '⭐ 圖形、音訊、科學運算');
// console.log('Float64Array'.padEnd(20), '8 bytes', '±1.8×10³⁰⁸'.padEnd(30), '高精度運算');
// console.log('');

// ------------------------------------------------------------
// 3. 基本操作範例
// ------------------------------------------------------------
console.log('--- 3. 基本操作 ---\n');

// 範例 1：建立並寫入資料
const myBuffer = new ArrayBuffer(12); // 12 bytes 箱子
// console.log('每格大小:', Int32Array.BYTES_PER_ELEMENT, 'bytes'); // 一格需要4 bytes
const myView = new Int32Array(myBuffer); // 用 Int32 工具（12÷4 = 3 格）

myView[0] = 100;
myView[1] = 200;
myView[2] = 300;

console.log('寫入資料:', myView); // Int32Array [100, 200, 300]
console.log('第 0 格:', myView[0]); // 100
console.log('第 1 格:', myView[1]); // 200
console.log('陣列長度:', myView.length); // 3
console.log('');

// 範例 2：直接建立 TypedArray（不需先建 ArrayBuffer）
const quickArray = new Uint8Array(5); // 自動建立 5 bytes 的 buffer
quickArray[0] = 10;
quickArray[1] = 20;
quickArray[2] = 30;

console.log('快速建立:', quickArray); // Uint8Array [10, 20, 30, 0, 0]
console.log('底層 buffer 大小:', quickArray.buffer.byteLength, 'bytes\n'); // 5

// 範例 3：從陣列初始化
const fromArray = new Uint8Array([255, 128, 64, 32, 16]);
console.log('從陣列建立:', fromArray); // Uint8Array [255, 128, 64, 32, 16]
console.log('');

// ------------------------------------------------------------
// 4. 共享記憶體（重要概念！）
// ------------------------------------------------------------
console.log('--- 4. 共享記憶體：多個視圖看同一個箱子 ---\n');

const sharedBuffer = new ArrayBuffer(4); // 4 bytes 箱子

// 視圖 1：當成 1 個大整數（4 bytes）
const bigView = new Int32Array(sharedBuffer);
bigView[0] = 1000;

console.log('視圖 1 寫入 1000');
console.log('bigView[0]:', bigView[0]); // 1000

// 視圖 2：當成 4 個小整數（每個 1 byte）
const smallView = new Uint8Array(sharedBuffer);
console.log('smallView 看到的:', smallView); // Uint8Array [232, 3, 0, 0]
console.log('↑ 1000 被拆成 4 個 byte: 232 + 3×256 = 1000\n');

// 改變小視圖
smallView[0] = 100;
console.log('修改 smallView[0] = 100');
console.log('bigView[0] 變成:', bigView[0]); // 不再是 1000，變成 868
console.log('smallView:', smallView); // Uint8Array [100, 3, 0, 0]
console.log('↑ 因為它們共享同一塊記憶體！\n');

// ------------------------------------------------------------
// 5. 實際應用場景
// ------------------------------------------------------------
console.log('--- 5. 實際應用場景 ---\n');

// 場景 1：製作 RGB 顏色資料
console.log('▸ 場景 1：製作 RGB 顏色');
function createColor(r: number, g: number, b: number): Uint8Array {
    const color = new Uint8Array(3);
    color[0] = r; // 紅色 (0-255)
    color[1] = g; // 綠色 (0-255)
    color[2] = b; // 藍色 (0-255)
    return color;
}

const red = createColor(255, 0, 0);
const green = createColor(0, 255, 0);
const purple = createColor(128, 0, 128);

console.log('紅色:', red);      // [255, 0, 0]
console.log('綠色:', green);    // [0, 255, 0]
console.log('紫色:', purple);   // [128, 0, 128]
console.log('');

// 場景 2：檢查檔案類型（魔術數字 Magic Number）
console.log('▸ 場景 2：檢查檔案類型');
// 模擬一個 PNG 圖片的前 8 bytes
const pngHeader = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);

function isPNG(bytes: Uint8Array): boolean {
    // PNG 檔案的前 8 bytes 是固定的「魔術數字」
    return bytes[0] === 137 && 
           bytes[1] === 80 && 
           bytes[2] === 78 && 
           bytes[3] === 71;
}

console.log('是 PNG 圖片嗎?', isPNG(pngHeader)); // true
console.log('檔案前 8 bytes:', pngHeader);
console.log('');

// 場景 3：二進位資料操作
console.log('▸ 場景 3：二進位資料操作（位元運算）');
const binaryData = new Uint8Array(3);
binaryData[0] = 0b11110000; // 二進位 11110000 = 240
binaryData[1] = 0b00001111; // 二進位 00001111 = 15
binaryData[2] = 0b10101010; // 二進位 10101010 = 170

console.log('二進位資料:', binaryData); // [240, 15, 170]
console.log('第 0 byte (二進位):', binaryData[0].toString(2).padStart(8, '0')); // 11110000
console.log('第 1 byte (十六進位):', '0x' + binaryData[1].toString(16)); // 0xf
console.log('');

// 場景 4：浮點數陣列（圖形/音訊）
console.log('▸ 場景 4：浮點數陣列（圖形座標）');
const vertices = new Float32Array([
    0.0, 0.5, 0.0,    // 頂點 1 (x, y, z)
    -0.5, -0.5, 0.0,  // 頂點 2
    0.5, -0.5, 0.0    // 頂點 3
]);

console.log('3D 座標:', vertices);
console.log('頂點 1:', [vertices[0], vertices[1], vertices[2]]);
console.log('');

// 場景 5：複製與切片
console.log('▸ 場景 5：複製與切片');
const original = new Uint8Array([10, 20, 30, 40, 50]);

// slice：建立新的副本（不共享記憶體）
const sliced = original.slice(1, 4);
console.log('原始:', original);   // [10, 20, 30, 40, 50]
console.log('切片:', sliced);     // [20, 30, 40]

sliced[0] = 99;
console.log('修改切片後:', sliced);      // [99, 30, 40]
console.log('原始不受影響:', original);   // [10, 20, 30, 40, 50]
console.log('');

// subarray：建立視圖（共享記憶體）
const subView = original.subarray(1, 4);
console.log('子視圖:', subView);  // [20, 30, 40]

subView[0] = 88;
console.log('修改子視圖後:', subView);    // [88, 30, 40]
console.log('原始會改變:', original);     // [10, 88, 30, 40, 50] ← 受影響！
console.log('');

// ------------------------------------------------------------
// 6. TypedArray 的方法
// ------------------------------------------------------------
console.log('--- 6. TypedArray 可用的方法 ---\n');

const numArray = new Uint8Array([5, 10, 15, 20, 25]);

// ✅ 有這些方法（類似普通陣列）
console.log('map:', numArray.map(x => x * 2));           // [10, 20, 30, 40, 50]
console.log('filter:', numArray.filter(x => x > 12));    // [15, 20, 25]
console.log('reduce:', numArray.reduce((sum, x) => sum + x, 0)); // 75
console.log('find:', numArray.find(x => x > 12));        // 15
console.log('indexOf:', numArray.indexOf(15));           // 2
console.log('includes:', numArray.includes(20));         // true

// ❌ 沒有這些方法（長度固定）
// numArray.push(30);     // 錯誤！沒有 push，意思是加到最後面
// numArray.pop();        // 錯誤！沒有 pop，pop意思是拿掉最後一個元素
// numArray.shift();      // 錯誤！沒有 shift，意思是拿掉第一個元素
// numArray.unshift(1);   // 錯誤！沒有 unshift，意思是加到最前面

console.log('');

// ------------------------------------------------------------
// 7. 與普通陣列的轉換
// ------------------------------------------------------------
console.log('--- 7. 與普通陣列的轉換 ---\n');

// TypedArray → 普通陣列
const typed = new Uint8Array([1, 2, 3, 4, 5]);
// Array.from 意思是從一個類陣列或可迭代物件建立一個新的陣列實例
// Array.from 可以用在 map、set、string、typed array 等等
const normalArray1 = Array.from(typed); // Array.from 方法，轉成普通陣列
const normalArray2 = [...typed]; // 展開運算子

console.log('TypedArray:', typed); // Uint8Array [1, 2, 3, 4, 5]
console.log('轉成普通陣列 (Array.from):', normalArray1); // [1, 2, 3, 4, 5]
console.log('轉成普通陣列 (展開):', normalArray2); // [1, 2, 3, 4, 5]
console.log('');

// 普通陣列 → TypedArray
const jsArray = [10, 20, 30, 40];
const typedFromArray = new Uint8Array(jsArray);

console.log('普通陣列:', jsArray);
console.log('轉成 TypedArray:', typedFromArray);
console.log('');

// ------------------------------------------------------------
// 8. 效能比較
// ------------------------------------------------------------
console.log('--- 8. TypedArray vs 普通陣列 ---\n');

console.log('特性'.padEnd(20), 'TypedArray'.padEnd(20), '普通陣列');
console.log('─'.repeat(60));
console.log('長度'.padEnd(20), '固定'.padEnd(20), '可變動');
console.log('型別'.padEnd(20), '單一數字型別'.padEnd(20), '可混合型別');
console.log('記憶體'.padEnd(20), '連續記憶體'.padEnd(20), '不連續');
console.log('效能'.padEnd(20), '⚡ 快（直接操作記憶體）'.padEnd(20), '一般');
console.log('方法'.padEnd(20), '部分陣列方法'.padEnd(20), '完整陣列方法');
console.log('用途'.padEnd(20), '二進位、大量數字'.padEnd(20), '通用資料');
console.log('');

// ------------------------------------------------------------
// 9. 常見錯誤示範
// ------------------------------------------------------------
console.log('--- 9. 常見錯誤 ---\n');

const errorDemo = new Uint8Array(3);

// ❌ 錯誤 1：超出範圍會被截斷
errorDemo[0] = 300; // Uint8 範圍是 0-255
console.log('存入 300，實際:', errorDemo[0]); // 44 (300 % 256)

// ❌ 錯誤 2：負數變成很大的正數
errorDemo[1] = -10;
console.log('存入 -10，實際:', errorDemo[1]); // 246 (256 - 10)

// ✅ 正確：使用 Int8Array 存負數
const signedArray = new Int8Array(3);
signedArray[0] = -10;
console.log('Int8Array 存 -10:', signedArray[0]); // -10（正確）
console.log('');

// ------------------------------------------------------------
// 10. 實用工具函式
// ------------------------------------------------------------
console.log('--- 10. 實用工具函式 ---\n');

// 將 TypedArray 轉成十六進位字串
function toHexString(bytes: Uint8Array): string {
    // b.toString(16) 把每個 byte 轉成十六進位字串,也就是把數字轉成16進位表示法
    // 255..toString(16) => 'ff' // ..的原因是因為數字後面接點號會被當成小數點
    // 一個byte = 8 bits = 2個十六進位字元 = 2個hex字元
    // padStart(2, '0') 確保每個 byte 都是兩位數,不足補零，例如 '0a'
    return Array.from(bytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join(' ');
}

const hexDemo = new Uint8Array([255, 128, 64, 32, 16]);
console.log('十六進位:', toHexString(hexDemo)); // ff 80 40 20 10

// 將字串轉成 Uint8Array（UTF-8 編碼）
function stringToBytes(str: string): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(str);
}

const textBytes = stringToBytes('Hello');
console.log('文字轉 bytes:', textBytes); // [72, 101, 108, 108, 111]
console.log('十六進位:', toHexString(textBytes)); // 48 65 6c 6c 6f

// 將 Uint8Array 轉回字串
function bytesToString(bytes: Uint8Array): string {
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
}

console.log('bytes 轉文字:', bytesToString(textBytes)); // Hello
console.log('');

// ------------------------------------------------------------
// 11. 進階：DataView（更靈活的視圖）
// ------------------------------------------------------------
console.log('--- 11. 進階：DataView ---\n');
console.log('DataView 可以在同一個 buffer 裡混合讀寫不同型別，而不需要建立多個不同的 TypedArray 視圖\n');

const dvBuffer = new ArrayBuffer(8);
const dv = new DataView(dvBuffer); // DataView

// 在不同位置寫入不同型別
dv.setInt32(0, 1000);        // 位置 0：寫入 Int32
dv.setFloat32(4, 3.14);      // 位置 4：寫入 Float32

console.log('讀取 Int32 (位置 0):', dv.getInt32(0));      // 1000
console.log('讀取 Float32 (位置 4):', dv.getFloat32(4));  // 3.14
console.log('');

// ------------------------------------------------------------
// 12. 總結與使用建議
// ------------------------------------------------------------
console.log('--- 12. 總結 ---\n');
console.log('✅ 什麼時候用 ArrayBuffer / TypedArray：');
console.log('   • 處理檔案、圖片、音訊、影片');
console.log('   • WebSocket 二進位傳輸');
console.log('   • Canvas、WebGL 圖形處理');
console.log('   • 加密解密、雜湊運算');
console.log('   • 大量數字運算（效能要求高）');
console.log('');
console.log('❌ 什麼時候不用（用普通陣列）：');
console.log('   • 一般資料處理、業務邏輯');
console.log('   • 需要動態增刪元素');
console.log('   • 資料型別不固定');
console.log('');
console.log('🎯 最常用的 TypedArray：');
console.log('   1️⃣  Uint8Array - 處理二進位資料、檔案、網路傳輸');
console.log('   2️⃣  Float32Array - 圖形座標、音訊樣本、科學運算');
console.log('   3️⃣  Int32Array - 大量整數運算');
console.log('');
console.log('💡 記憶口訣：');
console.log('   ArrayBuffer = 空箱子（記憶體空間）');
console.log('   TypedArray = 工具（讀寫格式）');
console.log('   多個工具可以同時看同一個箱子（共享記憶體）');
console.log('');

console.log('\n=== 教學完成！執行看看結果吧 ===\n');
