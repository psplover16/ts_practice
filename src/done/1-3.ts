// 介面,介面一般首字母大寫
interface Person {
    readonly id: number; // 唯讀屬性，唯讀的約束存在於第一次給「物件」賦值的時候，而不是第一次給「唯讀屬性」賦值的時候
    name: string;
    age: number;
    weight?: number; // 可選屬性
    // [propName: string]: string; // 一旦定義了任意屬性，那麼確定屬性和可選屬性的型別都必須是它的型別的子集
    [propName: string]: any;
}

let tom: Person = {
    id: 8964,
    name: 'Tom',
    age: 25,  // 缺少 age 屬性會報錯
    // gender: 'male', // 多餘的屬性也會報錯
    weight: 70,  // 可選屬性可以不提供
    hobby: 'reading', // 任意屬性
    work: 'engineer', // 任意屬性 
};
console.log(tom);
tom.name = 'Jerry'; // 允許修改
// tom.id = 9573; // ❌ 錯誤: 無法修改唯讀屬性
console.log(tom);