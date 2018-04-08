// animation.js

// visualizeAppend

(function(define) {

   define(function(require, exports, module) {
      var Graphic, linkedListVisual, insertButton, insertMidstButton, insertStartButton, removeButton, searchButton, resetButton, animatedList,
       green, red, yellow;

      green = '#41f446';
      red = '#ed392d';
      yellow = '#efcf00'

      Graphic = require('./Graphic.js');
      linkedListVisual = require('./linkedListVisual.js');

      function randString(){
         return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 3)
      }

      animatedList = linkedListVisual.new();


      insertStartButton = Graphic.new('insert-class', 'Insert Start', 1100, 0);
      insertStartButton.setFill(green);
      insertStartButton.drawButton();

      insertStartButton.getGroup().click(function() {
         //console.log('clicked');
         animatedList.insertNode(0, randString());
      });


      insertMidstButton = Graphic.new('insert-class', 'Insert Midst', 1100, 150);
      insertMidstButton.setFill(green);
      insertMidstButton.drawButton();

      insertMidstButton.getGroup().click(function() {
         var index, nodeValue;

         //console.log('clicked');
         index = parseInt(prompt('Gimme yo index from 0 to ' + animatedList.getSize() + ' pls'));
         //console.log('INDEX GIVEN IS ', index);
         //console.log(typeof index);
         if (index <= animatedList.getSize() && index >= 0) {
            animatedList.insertNode(index, randString());
         }
      });

      //(groupClass, text, positionX, positionY)
      insertButton = Graphic.new('insert-class', 'Insert End', 1100, 300);
      insertButton.setFill(green);
      insertButton.drawButton();

      insertButton.getGroup().click(function() {
         //console.log('clicked');
         animatedList.insertNode(animatedList.getSize(), randString());
      });

      removeButton = Graphic.new('remove-class', 'Remove', 1100, 500);
      removeButton.setFill(red);
      removeButton.drawButton();

      removeButton.getGroup().click(function() {
         var index;

         index = parseInt(prompt('Gimme yo index from 0 to ' + (animatedList.getSize() - 1) + ' pls'));
         //console.log('INDEX GIVEN IS ', index);
         //console.log(typeof index);
         if (index < animatedList.getSize() && index >= 0) {
            animatedList.removeNode(index);
         }
      });

      // searchButton -- what did we want to do when search button is called
      searchButton = Graphic.new('search-class', 'TODO:\nSearch', 1100, 650);
      searchButton.drawButton();

      // searchButton.getGroup().click(function () {
      //   console.log("clicked");
      //   //newNode = Graphic.new("new-class", "Lets\ngo!", 150, 0);
      //   //newNode.drawNode();
      //   animatedList.searchAt(0, "wut up");
      // });

      resetButton = Graphic.new('reset-class', 'Reset', 1100, 800);
      resetButton.setFill(yellow);
      resetButton.drawButton();

      resetButton.getGroup().click(function() {
         //console.log('clicked');
         animatedList.resetPage();
      });


      return Graphic;
   });

}( // Help Node out by setting up define.
     typeof module === 'object' && typeof define !== 'function'
    ? function(factory) {
       module.exports = factory(require, exports, module);
    }
    : define
));
