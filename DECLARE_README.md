# TypeScript `declare` 簡明教學

## 核心概念

`declare` = 告訴 TypeScript「這東西已經存在」,只定義型別,不建立實體

---

## 三種用法

### 1. `declare const` - 宣告變數

```typescript
// index.d.ts
declare const APP_CONFIG: {
    apiUrl: string;
    version: string;
};
```

### 2. `declare function` - 宣告函數

```typescript
// index.d.ts
declare function greet(name: string, age?: number): string;
```

### 3. `declare namespace` - 宣告命名空間

```typescript
// index.d.ts
declare namespace MyLib {
    function init(): void;
    const VERSION: string;
}
```

---

## 實際應用

### 步驟 1: 建立全域變數 (模擬外部載入)

```typescript
// index.ts
(globalThis as any).APP_CONFIG = {
    apiUrl: 'https://api.example.com',
    version: '1.0.0'
};

(globalThis as any).greet = function(name: string, age?: number) {
    return age ? `${name}, ${age}歲` : `你好, ${name}`;
};
```

### 步驟 2: 使用 (TypeScript 從 .d.ts 知道型別)

```typescript
const APP_CONFIG = (globalThis as any).APP_CONFIG;
console.log(APP_CONFIG.apiUrl);  // ✅ 有型別提示
```

---

## 常見場景

| 場景 | 說明 |
|------|------|
| **jQuery (CDN)** | `declare const $: any;` |
| **全域設定** | `declare const config: {...};` |
| **Node.js** | `declare const process: any;` |

---

## 執行範例

```bash
npm run dev
```

輸出:
```
1. APP_CONFIG: https://api.example.com
2. greet: 小明, 25歲
3. MyLib: 2.0.0
MyLib 已初始化
```

---

## 重點

- ✅ 只定義型別,不產生程式碼
- ✅ 用於已存在的全域變數/函數
- ✅ 編譯後會被移除
- ✅ 提供型別檢查和智能提示
