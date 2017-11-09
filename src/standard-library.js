'use strict';

/*
  Коллекция элементов.
  Поддерживает операции вставки и извлечения первого и последнего элемента,
  хранит ссылки на первый и последний элемент.
*/

var Collection = function () {
    // коллеция
    var collection = [];

    // первый элемент коллекции
    Object.defineProperty(this, 'first', {
        get: function () {
            return collection[0];
        }
    });

    // последний элемент коллекции
    Object.defineProperty(this, 'last', {
        get: function () {
            return collection[collection.length - 1];
        }
    });

    // количество элементов в коллекции
    Object.defineProperty(this, 'length', {
        get: function () {
            return collection.length;
        }
    });

    // true, если коллекция пуста
    Object.defineProperty(this, 'isEmpty', {
        get: function () {
            return collection.length === 0;
        }
    });

    // извлекает первый элемент из коллекции и возвращает его
    this.pickFirst = function () {
        return collection.shift();
    };

    // извлекает последний элемент из коллекции и возвращает его
    this.pickLast = function () {
        return collection.splice(-1, 1);
    };

    // вставляет элемент в начало колекции
    this.insertFirst = function (item) {
        collection.splice(0, 0, item);
        return this;
    };

    // вставляет элемент в конец коллекции
    this.insertLast = function (item) {
        collection.push(item);
        return this;
    };

    // очищает коллекцию
    this.empty = function () {
        collection.length = 0;
        return this;
    };

    return this;
};

/*
  Список элементов, организованных по принципу 'первым пришёл – первым вышел'.
  Элементы добавляются и извлекаются с одного конца списка.
*/

var Queue = function () {
    // очередь
    var queue = [];

    // количество элементов в очереди
    Object.defineProperty(this, 'length', {
        get: function () {
            return queue.length;
        }
    });

    // добавляет элемент в очередь
    this.enqueue = function (item) {
        queue.push(item);
        return this;
    };

    // извлекает элемент из очереди
    this.dequeue = function () {
        return queue.shift();
    };

    // очищает очередь
    this.empty = function () {
        queue.length = 0;
        return this;
    };

    return this;
};

/*
  Массив фиксированного размера.
  Попытка добавить или получить элемент за пределами указанного диапазона
  должна вызывать ошибку RangeError.
*/

var FixedArray = function (size) {
    // TODO: проверка size на number

    // массив
    var array = new Array(size);

    // количество элементов в очереди
    Object.defineProperty(this, 'length', {
        get: function () {
            return array.length;
        }
    });

    // записывает элемент в массив по заданному индексу
    this.insertAt = function (index, item) {
        if (index >= this.length) {
            throw new RangeError('Значение index за пределами диапазона массива');
        }

        array.splice(index, 1, item);
        return this;
    };

    // возвращает элемент по указанному индексу.
    this.getAt = function (index) {
        if (index >= this.length) {
            throw new RangeError('Значение index за пределами диапазона массива');
        }

        return array[index];
    };

    return this;
};

/*
  Список, хранящий уникальные элементы.
*/

var Set = function () {
    // множество
    var list = {};

    // количество элементов в множестве
    Object.defineProperty(this, 'length', {
        get: function () {
            return Object.keys(list).length;
        }
    });

    // добавляет элемент в множество
    this.insert = function (item) {
        list[item] = item;
        return this;
    };

    // удаляет элемент из множества
    this.remove = function (item) {
        delete list[item];
        return this;
    };

    // проверяет, входит ли элемент в множество
    this.has = function (item) {
        return (list[item]) ? true : false;
    };

    /**
     * возвращает множество элементов входящих в исходное множество
     * и в переданное множество (в оба сразу)
     */
    this.intersect = function (set) {
        var temp = new Set();

        // если передан пустой набор
        if (!set.length) {
            return temp;
        }

        for (var key in list) {
            if (list.hasOwnProperty(key)) {
                // если ключ набора set, если в наборе set2, тогда он общий
                if (set.has(key)) {
                    temp.insert(key);
                }
            }
        }

        return temp;
    };

    // возвращает множество элементов входящих в исходное множество
    // или в переданное множество (в любое из двух)
    this.union = function (set) {
        var temp = new Set();

        // если передан пустой набор
        if (!set.length) {
            return list;
        }

        var list2 = set.getList();

        for (var key in list) {
            if (list.hasOwnProperty(key)) {
                temp.insert(key);
            }
        }

        for (var key in list2) {
            if (list2.hasOwnProperty(key)) {
                temp.insert(key);
            }
        }

        return temp;
    };

    // возвращает полный список элементов
    this.getList = function () {
        return list;
    };

    return this;
};

var PriorityQueue = function () {

};

var Map = function () {

};

exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
exports.PriorityQueue = PriorityQueue;
exports.Map = Map;
