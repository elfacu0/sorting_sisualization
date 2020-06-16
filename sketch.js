let bars = [];
const cantNumber = 100;
let BARS_WIDTH = 0;
const duration = 300 / cantNumber;
function setup() {
    rectMode(CORNERS);
    noLoop();
    gui();
    const canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    generateInput(cantNumber);
}

function gui() {
    const button = document.querySelector('#generate-input');
    button.addEventListener('click', generateInput);
}

function normalize(array) {
    const maxNumber = Math.max(...array);
    BARS_WIDTH = width / array.length;
    const normalizedArray = array.map((e) => parseInt(e * height) / maxNumber);
    return normalizedArray;
}

function generateInput() {
    const inputSize = document.querySelector('#input-size').value;
    bars = [];
    for (let i = 0; i < inputSize; i++) {
        bars.push(parseInt(Math.random() * height));
    }
    showBars(normalize(bars));
}

function draw() {
    showBars(normalize(bars));
}

function keyPressed() {
    if (keyIsDown(83)) {
        console.log(bars);
        console.log(beadSort(bars));
    }
}

function mergeSortInit(array, l, r) {
    let middle = array.length / 2;
    let leftHalf = array.slice(0, Math.ceil(middle));
    let rightHalf = array.slice(Math.ceil(middle), array.length);
    console.log(leftHalf, rightHalf);
    if (leftHalf.length > 1) {
        leftHalf = mergeSortInit(leftHalf);
    }
    if (rightHalf.length > 1) {
        rightHalf = mergeSortInit(rightHalf);
    }
    return merge(leftHalf, rightHalf);
}

function merge(leftArray, rightArray) {
    console.log(leftArray, rightArray);
    let sortedArray = [];
    l = [...leftArray];
    r = [...rightArray];
    let n = l.length + r.length;
    while (sortedArray.length < n) {
        if (l[0] < r[0] || r[0] == undefined) {
            sortedArray.push(l[0]);
            l.shift();
        } else {
            sortedArray.push(r[0]);
            r.shift();
        }
    }
    console.log(sortedArray);
    return sortedArray;
}

function bubbleSort(arr = bars) {
    const tmpArray = [];
    const n = arr.length;
    const array = [...arr];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
            tmpArray.push([...array]);
        }
    }
    animate(tmpArray);
    return array;
}

function combSort(arr = bars) {
    let tmpArray = [];
    const array = [...arr];
    let n = array.length;
    let gap = array.length;
    while (gap >= 1) {
        for (let i = 0, j = gap; i < n - gap; i++, j++) {
            if (array[i] > array[j]) {
                [array[i], array[j]] = [array[j], array[i]];
            }
            tmpArray.push([...array]);
        }
        gap = Math.floor(gap / 1.3);
    }
    animate(tmpArray);
    return array;
}

function gnomeSort(arr = bars) {
    let tmpArray = [];
    const array = [...arr];
    let n = array.length;
    let i = 0;
    while (i < n) {
        if (array[i] > array[i + 1]) {
            [array[i], array[i + 1]] = [array[i + 1], array[i]];
            if (i > 0) i--;
        } else {
            i++;
        }
        tmpArray.push([...array]);
    }
    animate(tmpArray);
    return array;
}

function insertionSort(arr = bars) {
    let tmpArray = [];
    const array = [...arr];
    let n = array.length;
    for (let i = 1; i < n; i++) {
        let j = i - 1;
        const key = array[i];
        while (j >= 0 && key < array[j]) {
            array[j + 1] = array[j];
            j--;
            tmpArray.push([...array]);
        }
        array[j + 1] = key;
    }
    animate(tmpArray);
    return array;
}

function shellsort(arr = bars) {
    let tmpArray = [];
    const array = [...arr];
    let n = array.length;
    let gap = Math.floor(n / 2);
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            let j = i;
            const key = array[i];
            while (j >= gap && key < array[j - gap]) {
                array[j] = array[j - gap];
                j -= gap;
                tmpArray.push([...array]);
            }
            array[j] = key;
        }

        gap = Math.floor(gap / 2);
    }
    animate(tmpArray);
    return array;
}

function beadSort(arr = bars) {
    let tmpArray = [];
    const array = [...arr];
    let oldArray = [...arr];
    let n = array.length;
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < n; i++) {
            if (oldArray[i] > oldArray[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
            }
            tmpArray.push([...array]);
        }
        oldArray = [...array];
    }
    for (let i = 0; i < tmpArray.length; i++) {
        setTimeout(
            () => animateBead(tmpArray[i]),
            (200 / tmpArray[0].length) * i
        );
    }
    console.log(tmpArray.length);
    // testSort(bars, array);
    return array;
}

function animateBead(oldBars = []) {
    const max = Math.max(...oldBars);
    const normalizedArray = oldBars.map((e) => parseInt(e * width) / max);
    const BARS_HEIGHT = height / normalizedArray.length;
    background('#0b1340');
    for (let i = 0; i < normalizedArray.length; i++) {
        fill('#05F260');
        rect(
            0,
            i * BARS_HEIGHT,
            normalizedArray[i],
            i * BARS_HEIGHT + BARS_HEIGHT
        );
    }
}

class Tree {
    constructor(root) {
        this.root = root;
        this.leftChild = [];
        this.rightChild = [];
    }
}

function treeSort(arr) {
    let tmpArray = [];
    const array = [...arr];
    tmpArray.push(array);
    let n = array.length;
    let tree = new Tree(array[0]);
    for (let i = 1; i < n; i++) {
        createTree(tree, array[i]);
    }
    const sortedArray = inOrderTraversal(tree);
    tmpArray.push(sortedArray);
    testSort(bars, sortedArray);
    animate(tmpArray);
}

function createTree(tree, value) {
    if (tree.root != null) {
        if (value < tree.root) {
            if (tree.leftChild.length === 0) {
                tree.leftChild.push(new Tree(value));
            } else if (tree.leftChild.length > 0) {
                createTree(tree.leftChild[0], value);
            }
        }

        if (value >= tree.root) {
            if (tree.rightChild.length === 0) {
                tree.rightChild.push(new Tree(value));
            } else if (tree.rightChild.length > 0) {
                createTree(tree.rightChild[0], value);
            }
        }
    }
}

function inOrderTraversal(tree, arr = []) {
    if (tree.leftChild.length > 0) {
        inOrderTraversal(tree.leftChild[0], arr);
        arr.push(tree.root);
    } else if (tree.leftChild.length === 0) {
        arr.push(tree.root);
    }
    if (tree.rightChild.length > 0) {
        inOrderTraversal(tree.rightChild[0], arr);
    }
    return arr;
}

/*
function binomialDistribution(size = 1) {
    let tmpArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let array = [];
    let v = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e) => e / 10);
    console.log(v);
    for (let i = 0; i < size; i++) {
        let value = Math.random();
        for (let j = 0; j < v.length - 1; j++) {
            if (value >= v[j] && value < v[j + 1]) {
                tmpArray[j]++;
                showDistro([...tmpArray], i);
                break;
            }
        }
    }
    return (tmpArray);
}

function showDistro(distro = [], j) {
    let n = distro.length;
    background('#0b1340');
    setTimeout(() => {
        for (let i = 0; i < n; i++) {
            fill('#05F260');
            rect(
                i * (width / n),
                height,
                i * (width / n) + width / n,
                height - distro[i]
            );
        }
    }, 2 * j);
}*/

function showBars(oldBars = []) {
    background('#0b1340');
    for (let i = 0; i < oldBars.length; i++) {
        fill('#05F260');
        rect(
            i * BARS_WIDTH,
            height,
            i * BARS_WIDTH + BARS_WIDTH,
            height - oldBars[i]
        );
    }
}

function animate(tmpArray) {
    for (let i = 0; i < tmpArray.length; i++) {
        setTimeout(() => showBars(normalize(tmpArray[i])), duration * i);
    }
}

function testSort(unsortedArray, array) {
    const sortedArray = [...unsortedArray].sort((a, b) => a - b);
    if (JSON.stringify(array) === JSON.stringify(sortedArray)) {
        console.log('ARRAY IS SORTED!');
    } else {
        console.log('ERROR IN SORTING!!!!');
    }
}
