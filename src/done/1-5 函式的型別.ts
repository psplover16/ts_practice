function sum(x: number, y: number): number {
    return x + y;
}
// sum(1, 2, 3);
sum(1, 2);

// 函數型別介面
interface Person {
  (name: string, age: number, gender?: string): string;
}
// 可選引數必須接在必需引數後面。換句話說，可選引數後面不允許再出現必需引數了
// 指定great型別為 person介面，參數要符合介面定義
// genders?: string = "123" 這樣寫會報錯，因為帶有預設值的參數會被視為可選參數，但可選參數不能有預設值
const greet: Person = (name, age, genders: string = "123") => {
    if(genders) {
        console.log(genders);
    }
    return `${name} 今年 ${age} 歲`;
}
console.log(greet("小明", 25));  // "小明 今年 25 歲"

// ...b?:any 這樣寫會報錯，因為剩餘參數不能是可選的
function getItem(a:string, ...b:any): number|string {
    console.log(a);
    console.log(b);
    return a;
}
getItem("apple",false,2,3,4,5);

// 索引簽名介面
interface NumberArr {
 [inder:number]: number;
}
// 物件結構介面
interface StudentInfo {
    readonly id: number;
    name: string;
    subjects: string[];
    age?: number;
}