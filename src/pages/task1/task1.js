const array1 = [
  ["name", "id", "age", "weight", "job"],
  ["Mohammed", "3", "20", "120", "developer"],
  ["John", "1", "21", "150", "designer"],
  ["Ali", "2", "23", "90", "doctor"],
  ["Mariam", "4", "20", "100", "lawyer"]
];

const array2 = [
  ["name", "id", "height"],
  ["Ali", "2", "50"],
  ["John", "1", "45"],
  ["Mariam", "4", "43"],
  ["Mohammed", "3", "48"],
  ["Tony", "5", "96"]
];

const array3 = [
  ["name", "id", "parent"],
  ["Ali", "2", "yes"],
  ["John", "1", "yes"],
  ["Tony", "5", "yes"]
];

const array4 = [
  ["name", "id", "hobby"],
  ["Mariam", "4", "video games"],
  ["Ali", "2", "kickboxing"],
  ["Tony", "5", "football"]
];

const array5 = [
  ["id", "status"],
  ["1", "active"],
  ["2", "inactive"],
  ["3", "active"],
  ["4", "active"],
  ["5", "active"]
];

/* 
  Combine the arrays into one table. 
  You may find console.table()
  useful for monitoring your progress
  You may not install any external libraries.
*/

// Solution
function mergeUnique(arr1, arr2, cellLength = 0) {
  const empty = [];
  for (let i = 0; i < (cellLength - arr1.length); i++) {
    empty.push(Array(Math.floor(Math.random() * 100)).join(' '));
  }

  let res = [...arr1, ...(arr2 || empty)]

  return [...new Set([...res])]
}

function findRowById(arr = [[]], id = '', idIndex = Infinity) {
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i];
    if (row[idIndex] === id) {
      return row;
    }
  }

  return undefined;
}

function mergeTables(arr1 = [[]], arr2 = [[]]) {
  const logCondition = (arr2[0][1] === 'status');
  let mainTable;
  let subTable;
  if (arr1.length >= arr2.length) {
    mainTable = [...arr1];
    subTable = [...arr2];
  } else {
    mainTable = [...arr2];
    subTable = [...arr1];
  }

  const idIndex1 = arr1[0].findIndex((v) => v === 'id');
  const idIndex2 = arr2[0].findIndex((v) => v === 'id');
  let rowLength;
  
  mainTable.forEach((row, i) => {
    // for headers
    if (i === 0) {
      mainTable[0] = mergeUnique(mainTable[0], subTable[0]);
      return;
    }
    rowLength = mainTable[0].length;

    const rowId = mainTable[i][idIndex1];
    const row2 = findRowById(subTable, rowId, idIndex2);
    mainTable[i] = mergeUnique(mainTable[i], row2, rowLength);
  })

  return mainTable;
}

const res = [array1, array2, array3, array3, array4, array5].reduce((a1, a2) => mergeTables(a1, a2));
console.table(res);

const obj = {}
[1, 2, 3, 1, 1, 2].forEach((i) => {
  if (obj[i]) {
    obj[i] += 1;
  } else {
    obj[i] = 1;
  }
})
Object.keys(obj).forEach((key) => {
  console.log(key, obj[key])
})