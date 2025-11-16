// ============================================
// Proxy 與 Reflect 超通俗 + 專業心智模型教學
// ============================================
// 目標：看完能回答：什麼是 Proxy？為什麼需要 Reflect？何時用？常見陷阱？
//
// 一、核心白話：
// Proxy = 在「原物件 target」外包一層代理，攔截外部操作（讀取、寫入、刪除、呼叫、new 等）。
// Handler = 設定攔截規則的物件。裡面的函式稱為 trap（陷阱）。
// Trap = 對某種語言行為的攔截處理函式，例如 get、set、apply、construct。
// Reflect = 一組與語言底層行為一致的工具方法，用來在 trap 中安全執行“原本操作”，保持語義與不變式(invariants)。
//
// 二、為什麼需要 Proxy？
// 1. 監控：記錄存取次數、寫入操作、除錯。
// 2. 驗證：阻擋不合法的值 (型別/範圍)。
// 3. 虛擬屬性：即取即算，不真的存在於 target。
// 4. 兼容/降級：存取不存在屬性時給預設值或提示。
// 5. 安全封裝：限制新增/刪除、強制唯讀。
// 6. 結構解析：建立“看起來很大”但實際懶加載的對象。
//
// 三、為什麼需要 Reflect？
// - 在 trap 中不要手刻低層行為（例如 obj[prop]、delete obj[prop]），改用 Reflect.get / Reflect.set / Reflect.deleteProperty。
// - Reflect 方法具一致回傳值（成功→true/值，失敗→false/throw），適合組合邏輯。
// - 避免破壞 JS 不變式（例如不可配置的屬性被錯誤地“隱藏”）。
//
// 四、常見 Reflect 方法（快速表）
// Reflect.get(obj, prop)          讀取屬性值
// Reflect.set(obj, prop, value)   寫入屬性（回傳布林成功與否）
// Reflect.has(obj, prop)          等同 'prop' in obj
// Reflect.deleteProperty(obj, p)  刪除屬性
// Reflect.defineProperty(obj, p, descriptor)  定義屬性，回傳布林
// Reflect.ownKeys(obj)            取得所有自有鍵（含 Symbol）
// Reflect.apply(fn, thisArg, args) 呼叫函式（語義 = fn.apply）
// Reflect.construct(Ctor, args)   動態 new 實例
//
// 五、基礎範例：get trap（讀屬性攔截）
const target = { name: 'Original', version: 1 };
// ProxyHandler<any>是 TypeScript 內建的介面，代表「一組可選的 trap（攔截函式）」，用來定義你這個 Proxy 要攔截哪些操作。
// <any> 是把泛型參數 T 指定為 any，表示「這個 Proxy 的目標物件 target 被當成任何型別，不做型別約束」。

// 只是「handler 物件」(攔截規則集合)，還不是 Proxy 本體 
const loggingHandler: ProxyHandler<any> = {
    // proxy 攔截了 get 動作
	get(obj, prop, receiver) {
		console.log(`[GET] 存取屬性: ${String(prop)}`); // name
        console.log(obj, prop, receiver); // { name: 'Original', version: 1 } name { name: 'Original', version: 1 }
		// 使用 Reflect.get 保留原本原型鏈、this 綁定語義
		if (!(prop in obj)) return `⚠ 屬性 "${String(prop)}" 不存在`;
		return Reflect.get(obj, prop, receiver); // 參數: 目標物件、屬性名稱、接收者（通常是 proxy 本身）
	}
};
const proxy = new Proxy(target, loggingHandler);
console.log('proxy.name =>', proxy.name);   // 觸發 get，Original
console.log('proxy.age  =>', proxy.age);    // 不存在 → 提示字串

// 六、寫入驗證：set trap
interface User {
	name: string; age: number;
}
const user: User = { name: 'Gary', age: 20 };
const validateHandler: ProxyHandler<User> = { // 表示該proxy攔截的目標型別是 User
	set(obj, prop, value, receiver) {
		if (prop === 'age') {
			if (typeof value !== 'number' || value < 0 || !Number.isInteger(value)) {
				throw new TypeError('年齡必須是非負整數 number');
			}
		}
		// 回傳 Reflect.set 的結果（布林），若為 false 可再決定是否 throw
		return Reflect.set(obj, prop, value, receiver);
	}
};
const userProxy = new Proxy(user, validateHandler);
userProxy.age = 25; // OK
// userProxy.age = -5; // 會 throw
console.log('userProxy.age =>', userProxy.age);

// 七、虛擬 / 預設屬性生成：不存在時自動建立
// Record 是 TypeScript 內建（built-in）提供的型別工具
const settings: Record<string, any> = {}; // 這個變數將會是：有任意字串鍵、值任意型別的物件
const settingsProxy = new Proxy(settings, {
	get(obj, prop) {
		if (!(prop in obj)) {
			obj[prop as string] = `default:${String(prop)}`; // 懶建立
		}
		return obj[prop as string];
	}
});
console.log('settings.theme =>', settingsProxy.theme); // default:theme
console.log('settings.theme =>', settingsProxy.theme); // 已存在

// 八、函式代理：apply trap（攔截函式呼叫）
function sum(a: number, b: number) { return a + b; }
const sumProxy = new Proxy(sum, {
    // apply(target, thisArg, args): 專門攔截「函式被呼叫」這個語言行為的 trap。
    // target: 原始函式 sum。
    // thisArg: 呼叫時的 this（例如 obj.method() 會傳 obj；若直接 sumProxy(3,5) 則通常是 undefined 或全域）。
    // args: 真正的參數陣列（這裡是 [3, 5]）。
	apply(target, thisArg, args) {
		console.log('[APPLY] 參數:', args);
        // 用 Reflect.apply(target, thisArg, args) 安全地執行原本的 sum(3,5)
        // 確保行為 = 原生呼叫（包含 this 綁定）
		const result = Reflect.apply(target, thisArg, args); 
		console.log('[APPLY] 結果:', result);
		return result * 2; // 額外處理：放大結果
	}
});
console.log('sumProxy(3,5) =>', sumProxy(3, 5)); // 原本 8 → 攔截後 16

// 九、建構子代理：construct trap（攔截 new）
// 定義一個可被 new 的建構函式（本質仍是函式）。
class Person {
	constructor(public name: string) {}
}
// 針對“當這個函式被 new 呼叫”這個語言層級行為，提供 construct trap。
const PersonProxy = new Proxy(Person, {
    // target = 原始 Person 類別
    // args = 參數陣列 
    // newTarget = 這次真正被 new 的東西（通常就是 Proxy 本身；在繼承場景可不同）。
	construct(target, args, newTarget) {
		console.log('[CONSTRUCT] 建立 Person，參數:', args);
        // Reflect.construct()，等價於原生 new target(...args)，但可正確處理繼承與 newTarget（確保原型鏈正確）。
		const instance = Reflect.construct(target, args, newTarget);
        // 額外處理：加個 createdAt 屬性
		(instance as any).createdAt = new Date();
		return instance;
	}
});
const p = new PersonProxy('Alice');
console.log('p.name =>', p.name, 'p.createdAt =>', (p as any).createdAt.toISOString());

// 十、Revocable Proxy：可撤銷代理
// 建立一個「可被之後強制失效」的 Proxy。撤銷後再存取會拋錯，方便用在「生命週期很短的安全視窗」。

// const { proxy: revProxy, revoke } = Proxy.revocable(target, handler); 
// 做一個可撤銷的 proxy，名稱為 revProxy，revoke 是一個函式，呼叫後 revProxy 就無效了
// target, handler分別代表原物件與攔截規則
const { proxy: revProxy, revoke } = Proxy.revocable({ value: 10 }, {
	get(obj, prop) { return Reflect.get(obj, prop); }
});
console.log('revProxy.value =>', revProxy.value); // 10
revoke(); // 撤銷 proxy
// console.log(revProxy.value); // 呼叫後會拋錯：Cannot perform 'get' on a proxy that has been revoked

// 十一、記錄存取次數（統計用）
// Record 是 TypeScript 內建（built-in）提供的型別工具
const stats: Record<string, number> = {}; //  // 這個變數將會是：有任意字串鍵、值任意型別的物件
const data = { a: 1, b: 2 };
const statsProxy = new Proxy(data, {
	get(obj, prop) {
		stats[prop as string] = (stats[prop as string] ?? 0) + 1;
        // 回傳 Reflect.get(obj, prop)：保持原本讀取語義（支援原型鏈、getter）。
		return Reflect.get(obj, prop);
	}
});
statsProxy.a; statsProxy.a; statsProxy.b;
console.log('stats 訪問次數 =>', stats); // { a: 2, b: 1 }

// 十二、強制唯讀 / 禁止新增 & 刪除 (禁止新增新屬性或刪除既有屬性或用 defineProperty 增加描述。)
const locked = new Proxy({ id: 1 }, {
    // 攔截 Object.defineProperty(proxy, key, descriptor) 或任何會定義/重定義屬性的行為（例如部分框架內部使用）。
	defineProperty() { throw new Error('不允許新增屬性'); }, // 新增屬性時攔截，拋錯
    // trap：攔截 delete proxy[key] 語法（執行底層 [[Delete]] 操作）。
	deleteProperty() { throw new Error('不允許刪除屬性'); }, // 刪除屬性時攔截，拋錯
	set(obj, prop, value) {
		if (!(prop in obj)) throw new Error('不允許新增新屬性');
		return Reflect.set(obj, prop, value);
	}
});
locked.id = 2; // OK // Reflect.set(locked, 'id', 2);
// Object.defineProperty(locked, 'x', { value: 10 }); // 拋錯
// delete locked.id; // 拋錯
console.log('locked.id =>', locked.id);

// Object.freeze(obj); // 可用來凍結物件，防止新增/刪除/修改屬性
// Object.seal(obj); // 可用來封閉物件，防止新增/刪除屬性，但允許修改現有屬性

// 十三、使用 Reflect.has 與原本語法對照
console.log('Reflect.has(target, "name") =>', Reflect.has(target, 'name')); // true
console.log('"name" in target =>', 'name' in target); // true

// ex.
// const base = { kind: 'base' };
// const obj = Object.create(base);
// obj.name = 'Alice';

// Reflect.has(obj, 'name'); // true （自身）
// Reflect.has(obj, 'kind'); // true （原型鏈）
// Reflect.has(obj, 'age');  // false

// 十四、常見陷阱 (Comment)：
// 1. 性能：Proxy 在大量頻繁操作下比原生存取慢，不要在熱迴圈包深層巢狀大物件。
// 2. 不變式：不可“假裝”刪除不可配置屬性；不可違反原型鏈規則；否則 runtime 拋錯。
// 3. 過度魔法：太多自動生成屬性使程式難維護；只在真正需要的邊界層使用。
// 4. JSON.stringify(proxy) 不會序列化 handler 行為，只會序列化 target 的資料。
// 5. this 綁定：在 get trap 裡手動 obj[prop] 可能破壞 getter 中的 this，使用 Reflect.get 保持語義。
// 6. set trap 必須回傳布林；若回 false 在嚴格模式可能拋錯。
//
// 十五、速記口訣：
// Target = 原物件；Handler = 規則；Trap = 攔截函式；Reflect = 安全執行原操作。
// 用途 = 監控 / 驗證 / 虛擬 / 封裝 / 統計 / 惰性。
//
// ✅ 你現在可以：
// - 寫基本 get/set trap
// - 用 Reflect 保持語義正確
// - 了解 apply/construct 的目的
// - 知道何時避開性能問題
//
console.log('\n=== Proxy & Reflect 教學示範完成 ===');

