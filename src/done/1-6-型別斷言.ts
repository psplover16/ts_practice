// 型別斷言
function getLength(something: string | number): number {
    // if ((<string>something).length) {
    if ((something as string).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}


const a: number[] = [1, 2, 3, 4, 5];
const b: Array<string> = ["a", "b", "c"];



console.log(getLength("Hello TypeScript")); // 16