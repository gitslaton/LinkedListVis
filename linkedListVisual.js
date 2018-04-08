/*
* linkedListVisual.js
*
* Contains implementation for the object that controls the visualized linkedList
*/

/*
*
*/
(function(define) {

   define(function(require, exports, module) {

      var linkedListVisual, prototype, groupClass, draw, nodeSizeX, nodeSizeY, startX, startY, nodeSpacing,
         Graphic, linkedList;

      Graphic = require('./Graphic.js');
      linkedList = require('./linkedList.js');

      groupClass = 'node';

      nodeSizeX = 100;
      nodeSizeY = 100;
      nodeSpacing = nodeSizeX / 2;

      startX = 0;
      startY = 0;

      linkedListVisual = {
         new : function init() {
            var newListVisual, list, arrowList;

            newListVisual = Object.create(prototype);

            list = linkedList.new();

            arrowList = linkedList.new();

            newListVisual['arrowList'] = arrowList;
            newListVisual['list'] = list;
            newListVisual['maxRowSize'] = 5;

            return newListVisual;
         }
      };

      //linkedList methods
      //  next
      // start
      // getValue
      // setValue
      // getIndex
      // insert
      // insertStart
      // insertEnd
      // insertAt
      // deleteStart
      // deleteEnd
      // deleteAt
      // reset

      function getSize() {
         return this.list.getSize();
      }

      function insertEndNode(nodeValue) {
         var prevNode, endArrow, graphicNode;

         prevNode = this.list.values[this.list.getSize() - 1];
         endArrow = Graphic.new('endArrow', '', prevNode.getPositionX() - 600, prevNode.getPositionY());
         endArrow.drawEndLineArrow();

         this.arrowList.insertEnd(endArrow);

         graphicNode = Graphic.new(groupClass, nodeValue, 0, prevNode.getPositionY() + 150);

         this.list.insertEnd(graphicNode);

         graphicNode.drawNode();
      }

      function insertStartNode(nodeValue) {
         var graphicNode;

         this.shiftRight(0);

         graphicNode = Graphic.new(groupClass, nodeValue, startX, startY);

         this.list.insertStart(graphicNode);

         graphicNode.drawNode();
      }

      function insertRowNode(index, nodeValue) {
         var graphicNode, prevNode, arrow, newX, newY;

         //this.shiftRight(index);

         prevNode = this.list.values[index - 1];


         arrow = Graphic.new('arrow', '', prevNode.getPositionX() + 100, prevNode.getPositionY() + 50);
         arrow.drawArrow();

         this.arrowList.insertEnd(arrow);

         //console.log(prevNode.getPositionX());
         newX = this.list.getSize() % this.maxRowSize * (nodeSizeX + nodeSpacing);
         //value = this.list.getSize() % this.maxRowSize;
         //console.log(this.list.getValues());
         newY = Math.floor(this.list.getSize() / 5) * nodeSizeY + Math.floor(this.list.getSize() / 5) * nodeSpacing;

         graphicNode = Graphic.new(groupClass, nodeValue, newX, newY);

         this.list.insertEnd(graphicNode);

         graphicNode.drawNode();
      }

      function insertNodeAt(index, nodeValue) {
         var graphicNode, prevNode, newX, newY;

         prevNode = this.list.values[index];

         newX = prevNode.getPositionX();
         newY = prevNode.getPositionY();

         graphicNode = Graphic.new(groupClass, nodeValue, newX, newY);

         this.list.insertAt(graphicNode, index);

         this.shiftRight(index + 1);

         graphicNode.drawNode();

      }

      function insertNode(index, nodeValue) {
         //console.log('INDEX is ' + index);
         //console.log('SIZE is ' + this.list.getSize());
         if (this.list.getSize() === 0 || index === 0) {
            //console.log('INSERT START');
            this.insertStartNode(nodeValue);
         } else if (index === this.list.getSize() && this.list.getSize() % 5 === 0 && this.list.getSize() !== 0) {
            //console.log('INSERT END');
            this.insertEndNode(nodeValue);
         } else if (index === this.list.getSize()) {
            //console.log('INSERT ROW');
            this.insertRowNode(index, nodeValue);
         } else {
            //console.log('INSERT AT ' + index);
            this.insertNodeAt(index, nodeValue);
         }

         return this;

      }

      function deleteGraphic(graphic) {
         graphic.deleteGraphic();   
      }

      function removeNode(index) {
         this.list.values[index].deleteGraphic();

         lastI = this.list.getSize() - 2;
         console.log(this.arrowList.values);
         console.log(lastI);
         if(index === 1 && this.list.getSize() === 2) {
            this.arrowList.values.map(deleteGraphic);
            this.arrowList.reset();
         } else if(index === lastI && lastI >= 1) {
            this.arrowList.values[lastI].deleteGraphic();
            this.arrowList.deleteAt(lastI);
         }
         
         this.shiftLeft(index);
 

         this.list.deleteAt(index);

      }

      function resetPage() {
         var whiteSpace;

         this.list.reset();

         whiteSpace = Graphic.new('whiteSpace', '', 0, 0);

         whiteSpace.drawWhitespace();
      }

      function shiftRight(index) {
         var graphicNode, newX, newY, prevNode, endArrow, arrow, i;

         for (i = index; i < this.list.getSize(); i += 1) {
            graphicNode = this.list.values[i];
            newX = graphicNode.getPositionX() + nodeSpacing * 3;
            newY = graphicNode.getPositionY();

            if (newX > 600 && i >= 4) {
               prevNode = this.list.values[i - 1];
               newX = 0;
               newY = newY + 150;
               endArrow = Graphic.new('endArrow', '', prevNode.getPositionX() - 600, prevNode.getPositionY());
               endArrow.drawEndLineArrow();
               this.arrowList.insertEnd(endArrow);
            } else {
               if (i > 0) {
                  prevNode = this.list.values[i - 1];
                  arrow = Graphic.new('arrow', '', prevNode.getPositionX() + 100, prevNode.getPositionY() + 50);
               } else {
                  arrow = Graphic.new('arrow', '', 100, 50);
               }

               arrow.drawArrow();
               this.arrowList.insertEnd(arrow);
            }
            //console.log('newX is ' + newX);
            //console.log('newY is ' + newY);
            graphicNode.move(newX, newY);
         }
      }

      function shiftLeft(index) {
         var graphicNode, newX, newY, prevNode, i, size;

         size = this.arrowList.getSize();

         if (size > 0) {
            this.arrowList.values[size - 1].deleteGraphic();
            this.arrowList.deleteAt(size - 1);
         }

         for (i = this.list.getSize() - 1; i > index; i -= 1) {
            graphicNode = this.list.values[i];
            prevNode = this.list.values[i - 1];

            newX = prevNode.getPositionX();
            newY = prevNode.getPositionY();
            //console.log('newX is ' + newX);
            //console.log('newY is ' + newY);
            graphicNode.move(newX, newY);
         }

      }

      prototype = {
         getSize : getSize,
         insertStartNode: insertStartNode,
         insertEndNode: insertEndNode,
         insertRowNode: insertRowNode,
         insertNodeAt: insertNodeAt,
         insertNode: insertNode,
         removeNode: removeNode,
         shiftRight: shiftRight,
         shiftLeft: shiftLeft,
         resetPage: resetPage
      };

      return linkedListVisual;
   });


}( // Help Node out by setting up define.
     typeof module === 'object' && typeof define !== 'function'
    ? function(factory) {
       module.exports = factory(require, exports, module);
    }
    : define
));
