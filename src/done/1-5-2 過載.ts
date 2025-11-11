// 1-5 函式的型別 過載(Overloading)，能使型別精確
// 型別宣告
function reverse(x: number): number; // 如果傳入 number,會回傳 number
function reverse(x: string): string;
// 函數實作
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    } 
    throw new Error('Invalid type');  // 應該是不會執行
}

console.log(reverse(12345));  // 輸出: 54321
console.log(reverse("hello")); // 輸出: "olleh"