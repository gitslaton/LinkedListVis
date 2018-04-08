/*
* ****************************************
* linkedList.js
* ****************************************
*
* Contains implementation for a linkedList
* The underlying implementation will be an
* array that will represent the linkedList.
*
* Requires: graphics.js, animation.js
*/

(function(define) {

   define(function(require, exports, module) {

      var linkedList, prototype, expectionMessage;


      linkedList = {

        /*
        * FUNCTION: new()
        * Initializes a new empty list
        */
         new : function initList() {
            var newLinkedList;

            newLinkedList = Object.create(prototype);

            newLinkedList['values'] = [];

            Object.defineProperty(newLinkedList, 'index', {
               configurable: true,
               writable: true,
               enumerable: true,
               value: null
            });


            return newLinkedList;
         }
      };


      exceptionIndexOutofRange = 'Error: Index out of range.';
      exceptionNoNext = 'Error: There is no next node.';


      /*
      * TODO: DESCRIPTION HERE
      */
      function next() {
         if (this.index < this.getSize()) {
            this.index += 1;

            return this;

         } else {
            throw exceptionNoNext;
         }
      }

      function start() {
         this.index = 0;

         return this;
      }


      /*
      * FUNCTION: insertEnd(nodeValue)
      *
      * @param  {nodeValue}   value what will be stored as data in "node"
      * Appends node to the end of the linkedList (array)
      */
      function insertEnd(nodeValue) {
         this.values.push(nodeValue);

         return this;
      }

      /**
      * FUNCTION: insertStart(nodeValue)
      *
      * @param  {nodeValue}
      * Inserts the nodeValue at the beginning of the LinkedList.
      */
      function insertStart(nodeValue) {
         this.values.unshift(nodeValue);

         return this;
      }

      /**
      * FUNCTION: insertAt(nodeValue)
      *
      * @param  {nodeValue}
      * @param  {index}
      * Inserts the nodeValue at the given index parameter.
      */
      function insertAt(nodeValue, index) {
       // if(index >= this.getSize()){
       //     throw exceptionIndexOutofRange;
       // }

         this.values.splice(index, 0, nodeValue);

         return this;
      }

      /*
      * FUNCTION: deleteEnd()
      *
      * Deletes the last nodeValue in the LinkedList (array)
      */
      function deleteEnd() {
         if (this.getSize() === 0) {
            throw exceptionIndexOutofRange;
         }

         this.values.splice(this.getSize() - 1, 1);

         return this;
      }

      /*
      * FUNCTION: deleteStart()
      *
      * Deletes the first nodeValue in the LinkedList (array)
      */
      function deleteStart() {
         if (this.getSize() === 0) {
            throw exceptionIndexOutofRange;
         }

         this.values.splice(0, 1);

         return this;
      }

      /**
      * FUNCTION: deleteAt(index)
      *
      * @param  {index} Specified index of node
      * Deletes nodeValue at specifed index
      */
      function deleteAt(index) {
         if (index >= this.getSize()) {
            throw exceptionIndexOutofRange;
         }

         this.values.splice(index, 1);

         return this;
      }

      /**
      * Function: getValue(index)
      *
      * @param  {index} Specified index
      * Search for value at that specific index
      * Return the value
      */
      function getValue(index) {
         if (index > this.getSize()) {
            throw exceptionIndexOutofRange;
         }

         return this.values[index];
      }

      /**
      * Function: setValue(index)
      *
      * @param  {index} Specified index
      * Set value at that specific index
      * Return the value
      */
      function setValue(nodeValue, index) {
         if (index >= this.getSize()) {
            throw exceptionIndexOutofRange;
         }

         this.values[index] = nodeValue;
      }


      /**
      * Function: insert(nodeValue)
      * Inserts a node at the current index
      *
      */
      function insert(nodeValue) {
         this.insertAt(nodeValue, this.index);
      }


      /**
      * FUNCTION: getIndex(nodeValue)
      *Search for first index of that specific nodeValue
      * @param  {nodeValue}   Specified value
      *
      * Return index
      */
      function getIndex(nodeValue) {
         function isValue(value) {
            return value === nodeValue;
         }

         return this.values.findIndex(isValue);
      }

      /*
      * FUNCTION: reset()
      *
      * Resests the entire LinkedList (array)
      * Deletes all the data in the array
      * POST-CONDITION: The LinkedList (array) is
      * set back to empty.
      */
      function reset() {
         this.values = [];
      }

      prototype = {
         getSize: function getSize() {
            return this.values.length;
         },
         getValues: function getValues() {
            return this.values;
         },
         next: next,
         start: start,
         getValue: getValue,
         setValue: setValue,
         getIndex: getIndex,
         insert: insert,
         insertStart: insertStart,
         insertEnd: insertEnd,
         insertAt: insertAt,
         deleteStartt: deleteStart,
         deleteEnd: deleteEnd,
         deleteAt: deleteAt,
         reset: reset
      };

      return linkedList;
   });


}( // Help Node out by setting up define.
     typeof module === 'object' && typeof define !== 'function'
    ? function(factory) {
       module.exports = factory(require, exports, module);
    }
    : define
));

