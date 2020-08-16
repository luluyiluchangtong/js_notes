function Fn(array) {
    const random = Math.floor(Math.random() * array.length)
    console.log(random)
    // return array[random]
}
const arr1 = [1, 2, 3, 4]
const arr2 = [11, 22, 33, 44]
Fn(arr1)
// console.log(Fn(arr2))