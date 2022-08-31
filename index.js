const NUMBARS = 100;
const MINNUM = 1;
const MAXNUM = 100;
const HEIGHTFACTOR = 5;
const DEFAULTCOLOR = "rgb(86, 177, 239)";
const SWAPCOLOR = "rgb(153, 182, 82)";
const COMPARECOLOR = "grey";
const COMPAREDELAY = 5;
const SWAPDELAY = 10;
const units = "px";
const arr = new Array(NUMBARS);
let visual = [];

const selector = document.getElementById("algorithms");
const barsContainer = document.getElementById("bars-container");

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const numGenerator = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

const createRandomArray = () => {
    for (let i = 0; i < NUMBARS; i++) {
        arr[i] = numGenerator(MINNUM, MAXNUM);
    }
    render();
};

const swap = (i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

const bubbleSort = () => {
    visual = [];
    for (let i = 0; i < NUMBARS - 1; i++) {
        for (let j = 0; j < NUMBARS - i - 1; j++) {
            visual.push([j, j + 1]);
            if (arr[j] > arr[j + 1]) {
                swap(j, j + 1);
                visual.push([
                    [j, arr[j]],
                    [j + 1, arr[j + 1]],
                ]);
            }
        }
    }
};

const insertionSort = () => {
    visual = [];
    for (let i = 1; i < NUMBARS; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            visual.push([j + 1, arr[j + 1]]);
            j--;
        }
        arr[j + 1] = key;
        visual.push([j + 1, arr[j + 1]]);
    }
};

const mergeSort = (l, r, visual) => {
    if (l < r) {
        let m = Math.floor((l + r) / 2);
        mergeSort(l, m, visual);
        mergeSort(m + 1, r, visual);
        merge(l, m, r, visual);
    }
};

const merge = (l, m, r, visual) => {
    let n1 = m - l + 1;
    let n2 = r - m;
    let left = [];
    let right = [];
    for (let i = 0; i < n1; i++) {
        left.push(arr[l + i]);
    }
    for (let i = 0; i < n2; i++) {
        right.push(arr[m + 1 + i]);
    }
    let i = 0;
    let j = 0;
    let k = l;
    while (i < n1 && j < n2) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        visual.push([k, arr[k]]);
        k++;
    }
    while (i < n1) {
        arr[k] = left[i];
        visual.push([k, arr[k]]);
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = right[j];
        visual.push([k, arr[k]]);
        j++;
        k++;
    }
};

const quickSort = (low, high, visual) => {
    if (low < high) {
        let pi = partition(low, high, visual);
        quickSort(low, pi - 1, visual);
        quickSort(pi + 1, high, visual);
    }
};

const partition = (low, high, visual) => {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        visual.push([j, high]);
        if (arr[j] < pivot) {
            i++;
            swap(i, j);
            visual.push([
                [i, arr[i]],
                [j, arr[j]],
            ]);
        }
    }
    swap(i + 1, high);
    visual.push([
        [i + 1, arr[i + 1]],
        [high, arr[high]],
    ]);
    return i + 1;
};

const selectionSort = () => {
    visual = [];
    for (let i = 0; i < NUMBARS - 1; i++) {
        let min = i;
        for (let j = i + 1; j < NUMBARS; j++) {
            visual.push([j, min]);
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        swap(i, min);
        visual.push([
            [i, arr[i]],
            [min, arr[min]],
        ]);
    }
};

const visualize = async (type) => {
    const bars = document.getElementsByClassName("bars");
    // ;
    for (let i = 0; i < visual.length; i++) {
        if (!isNaN(visual[i][0])) {
            if (type === "insertion" || type === "merge") {
                bars[visual[i][0]].style.backgroundColor = SWAPCOLOR;
                bars[visual[i][0]].style.height =
                    visual[i][1] * HEIGHTFACTOR + units;

                await sleep(SWAPDELAY);
                bars[visual[i][0]].style.backgroundColor = DEFAULTCOLOR;
            } else {
                bars[visual[i][0]].style.backgroundColor = COMPARECOLOR;
                bars[visual[i][1]].style.backgroundColor = COMPARECOLOR;

                await sleep(COMPAREDELAY);
                bars[visual[i][0]].style.backgroundColor = DEFAULTCOLOR;
                bars[visual[i][1]].style.backgroundColor = DEFAULTCOLOR;
            }
        } else {
            bars[visual[i][0][0]].style.backgroundColor = SWAPCOLOR;
            bars[visual[i][1][0]].style.backgroundColor = SWAPCOLOR;
            bars[visual[i][0][0]].style.height =
                visual[i][0][1] * HEIGHTFACTOR + units;
            bars[visual[i][1][0]].style.height =
                visual[i][1][1] * HEIGHTFACTOR + units;

            await sleep(SWAPDELAY);
            bars[visual[i][0][0]].style.backgroundColor = DEFAULTCOLOR;
            bars[visual[i][1][0]].style.backgroundColor = DEFAULTCOLOR;
        }
    }
    console.log("done");
};

const sort = () => {
    const sortAlg = selector.options[selector.selectedIndex].value;
    console.log(arr);
    switch (sortAlg) {
        case "bubble":
            bubbleSort();
            visualize(sortAlg);
            break;
        case "insertion":
            insertionSort();
            visualize(sortAlg);
            break;
        case "merge":
            visual = [];
            mergeSort(0, NUMBARS - 1, visual);
            visualize(sortAlg);
            console.log(arr);
            break;
        case "quick":
            visual = [];
            quickSort(0, NUMBARS - 1, visual);
            visualize(sortAlg);
            break;
        case "selection":
            selectionSort();
            visualize(sortAlg);
            break;
    }
};

const render = () => {
    barsContainer.innerHTML = "";
    arr.forEach((i) => {
        const bar = document.createElement("div");
        bar.classList.add("bars");
        bar.style.height = i * HEIGHTFACTOR + units;
        barsContainer.appendChild(bar);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    createRandomArray();
    render();
});
