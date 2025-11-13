// ============================================
// 宣告檔案 (Declaration File)
// 用途: 告訴 TS「這些東西已經存在」,只定義型別,不建立實體~
// 若沒有宣告，則無法在其他檔案看到型別提示
// 何時用?
// 場景 1: 使用外部 JavaScript 函式庫 (最常見)------------------------
// npm install --save-dev @types/lodash
// declare function clone<T>(obj: T): T; // 這個 clone 函數可以複製任何型別的物件,並且回傳相同型別的複製品
// import { clone } from 'lodash';
// clone({ name: 'test' }); 

// 場景 2: 宣告全域變數 (CDN 載入的函式庫)----------------------------
// <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
// <script src="dist/index.js"></script>
// jquery.d.ts
// declare const $: (selector: string) => any;
// declare const jQuery: (selector: string) => any;
// index.ts
// $('#app').hide();  // ✅ TypeScript 知道 $ 存在了!

// 場景 3: 開發函式庫給別人用-----------------------------------
// src/index.ts (實作)
// export function add(a: number, b: number): number {
//     return a + b;
// }
// 發布時
// dist/index.d.ts (型別定義)
// export declare function add(a: number, b: number): number;
// 別人使用
// import { add } from 'your-library';
// add(1, 2);  // ✅ 有智能提示和型別檢查

// ============================================

// 1. declare const - 宣告全域變數
declare const APP_CONFIG: {
    apiUrl: string;
    version: string;
};

// 2. declare function - 宣告全域函數
declare function greet(name: string, age?: number): string;

// 3. declare namespace - 它用來表示全域變數是一個物件，包含很多子屬性。
declare namespace MyLib {
    function init(): void;
    const VERSION: string;
    // var greet: (name: string, age?: number) => string;
    // var APP_CONFIG: { apiUrl: string; version: string };
    // var MyLib: { VERSION: string; init(): void };
}

// 巢狀的名稱空間
// 如果物件擁有深層的層級，則需要用巢狀的 namespace 來宣告深層的屬性的型別
declare namespace MyLib2 {
    function ajax(url: string, settings?: any): void;
    namespace fn {
        function extend(object: any): void;
    }
}


// 4.類型，只能定義型別
declare class Animal {
    name: string; // 表示每個 new Animal(...) 建立出的實例，都會有一個 name 屬性
    constructor(name: string); // 要建立 new Animal() 時，必須傳入一個 string 參數當作名字
    sayHi(): string; // 
}

declare enum Directions {
    Up,
    Down,
    Left,
    Right
}


// 除了全域變數之外，可能有一些型別我們也希望能暴露出來。
// 在型別宣告檔案中，我們可以直接使用 interface 或 type 來宣告一個全域的介面或型別
// 型別定義
interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any;
}
// 物件宣告，當作物件存取，不能取值用
declare namespace AjaxSettings2 {
    function ajax(url: string, settings?: AjaxSettings): void;
}