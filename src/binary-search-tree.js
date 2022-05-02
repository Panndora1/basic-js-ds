const { NotImplementedError } = require('../extensions/index.js');

//const { Node } = require('../extensions/list-tree.js');

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }
  

  add(data) {
    this.tree = addItems(this.tree, data);

    function addItems(node, data) {
      if(!node) return new Node(data); //проверяем существует ли узел, если нет, создаем с заданным значением

      if(node.data == data) return node; //проверяем есть ли точно такой же узел, если да, то возвращаем его и ничего не добавляем

      if(node.data > data) {
        node.left = addItems(node.left, data) //раз наше значение меньше корневого узла, идем в левого потомка, пока не сможем создать нового
      } else {
        node.right = addItems(node.right, data) //аналогично идем по правой стороне
      }

      return node; 
    }
  }

  has(data) {
    return searchItem(this.tree, data);
    

    function searchItem(node, data) {
      
      if (!node) {return false}//если узла нет, нечего и искать

      if (node.data === data) {return true}//нашли искомое значение, возвращаем

      return (node.data > data) ?
        searchItem(node.left, data) : //если наше значение меньше узла, идем влево заново проверяя значение
        searchItem(node.right, data) //аналогично идем вправо, если значение больше
        
    }
  }

  find(data) {
    return findItem(this.tree, data);  
    
    function findItem(node, data) {
      if (!node) {return null}; //если нет узла, ничего не ищем
      if (node.data == data) {return node};

      return (node.data > data) ?
        findItem(node.left, data) : // поиск по левым потомкам
        findItem(node.right, data) //поиск по правым потомкам
    }
  } 

  remove(data) {

    this.tree = removeItem(this.tree, data);

    function removeItem(node, data) {
      if(!node) {return null};

      if(node.data > data) {
        node.left = removeItem(node.left, data); //ведем поиск по левому краю
        return node;
      } else if(node.data < data) {
        node.right = removeItem(node.right, data); //ведем поиск по правому краю
        return node;
      } else if (node.data == data) {
        if(!node.left && !node.right) { //если нет потомков просто удаляем
          return null;
        } 
        
        if(!node.left) { //если нет левого потомка, мы вместо родителя ставим правого потомка
          node = node.right;
          return node
        }
        
          if(!node.right) { //аналогично если нет правого потомка у родителя
          node = node.left;
          return node
        }

        let minItem = node.right //создаем переменную и кладем в нее все правое дерево
        while (minItem.left) { //пока у дерева есть левые потомки продолжаем обход
        minItem = minItem.left //перемещаемся на левую ветку
        }

        node.data = minItem.data //переписываем значение удаляемого элемента на самое минимально левое
      
        node.right = removeItem(node.right, minItem.data) //находим и удаляем из правого дерева наш минимальный элемент

        return node;
      }

      return node
    }

    
  }

  min() {
    if(!this.tree) return null;

    let item = this.tree; //создаем переменную и кладем туда дерево

    while(item.left) { //пока есть левые ветки, продолжаем цикл
      item = item.left //каждый раз переходим на нового левого потомка
    }

    return item.data //возвращаем значение нашего самого маленького значения
  }

  max() { //тут тоже самое только идем по правым веткам
    if(!this.tree) return null;

    let item = this.tree;

    while(item.right) {
      item = item.right
    }

    return item.data
  }
}

module.exports = {
  BinarySearchTree
};