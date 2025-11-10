"use strict";
let tom = {
    id: 8964,
    name: 'Tom',
    age: 25, // 缺少 age 屬性會報錯
    // gender: 'male', // 多餘的屬性也會報錯
    weight: 70, // 可選屬性可以不提供
    hobby: 'reading', // 任意屬性
    work: 'engineer', // 任意屬性 
};
console.log(tom);
tom.name = 'Jerry'; // 允許修改
// tom.id = 9573; // ❌ 錯誤: 無法修改唯讀屬性
console.log(tom);
