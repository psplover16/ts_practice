// 陣列的型別
// 基本
let array1: number[] = [1,2,3,4,5];
let array2: Array<number> = [1,2,3];

interface NumberArr {
 [inder:number]: number;
}
let array3:NumberArr = [1,2,3,4,5]

console.log("array1",array1);
console.log("array2",array2);
console.log("array3",array3);

interface StudentInfo {
    readonly id: number;
    name: string;
    subjects: string[];
    age?: number;
}
let students: StudentInfo[] = [
    {
        id: 1,
        name: "張小明",
        age: 16,
        subjects: ["數學", "英文", "物理"]
    },
    {
        id: 2,
        name: "李小華",
        subjects: ["化學", "生物", "歷史"]
    }
];
console.log("students:",students);

// 多維陣列
let matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log("matrix:",matrix);

// 聯合型別陣列
let mixedArray: (number | string)[] = [1, "hello", 2, "world", 3];
console.log("mixedArray:",mixedArray);

type ApiResponse2 = string | number | { error: string }; // 定義聯合型別，字串 / 數字 / 包含error屬性的物件
let apiResults: ApiResponse2[] = [
    "成功",
    404,
    { error: "找不到資源" },
    200,
    "處理完成"
];
console.log("apiResults:",apiResults);

// 唯讀陣列 - 無法修改內容
let readonlyNumbers: readonly number[] = [1, 2, 3, 4, 5];
let readonlyNames: ReadonlyArray<string> = ["固定名單A", "固定名單B"];

console.log("唯讀數字陣列:", readonlyNumbers);
console.log("唯讀名稱陣列:", readonlyNames);

// 固定位置陣列
let person: [string, number, boolean] = ["張三", 25, true];
console.log("個人資訊元組 [姓名, 年齡, 是否已婚]:", person);

// 解構賦值搭配元組
let [personName, personAge, isMarried] = person;
console.log(`解構後: ${personName} 今年 ${personAge} 歲, 已婚: ${isMarried}`);