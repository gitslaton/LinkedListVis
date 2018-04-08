/*
 * graphics.js
 *
 * Contains implementation for creating and drawing the
 * graphic objects for the LinkedListVisual
 */


(function(define) {

   define(function(require, exports, module) {

      var Graphic, proto, aDiv, draw;

      aDiv = document.createElement('div');
      aDiv.setAttribute('id', 'myDrawing');

      document.body.prepend(aDiv);
      draw = SVG('myDrawing').size(1500, 1500);

/*
 *		Prototype / Instance Methods
 */

      proto = {
    /*
    * Gets a reference to the SVG group of elements that were drawn
    * @return {SVG} group for the drawn elements
    */
         getGroup: function getGroup() {
            return this.group;
         },

    /*
    * Gets the class name to the SVG group of elements that were drawn
    * @return {string} for the class name
    */
         getGroupClass: function getGroupClass() {
            return this.groupClass;
         },

    /*
    * Gets the width of the SVG drawn
    * @return {integer}
    */
         getSizeX: function getSizeX() {
            return this.sizeX;
         },

    /*
    * Gets the height of the SVG drawn
    * @return {integer}
    */
         getSizeY: function getSizeY() {
            return this.sizeY;
         },

    /*
    * Gets the text
    * @return {integer}
    */
         getText: function getText() {
            return this.text;
         },

    /*
    * Gets the fill color
    * @return {integer}
    */
         getFill: function getFill() {
            return this.fill;
         },

    /*
    * Gets the starting X coordinate of the SVG drawn
    * @return {integer}
    */
         getPositionX: function getPositionX() {
            return this.positionX;
         },

    /*
    * Gets the starting Y coordinate of the SVG drawn
    * @return {integer}
    */
         getPositionY: function getPositionY() {
            return this.positionY;
         },

    /*
    * Sets the fill color
    */
         setFill: function setFill(fill) {
            this.fill = fill;
         },

    /*
    * Sets the width of the SVG drawn
    */
         setSizeX: function setSizeX(sizeX) {
            this.sizeX = sizeX;
         },

    /*
    * Sets the height of the SVG drawn
    */
         setSizeY: function setSizeY(sizeY) {
            this.sizeY = sizeY;
         },

    /*
    * Sets the height of the SVG drawn
    */
         setPositionY: function setPositionY(positionY) {
            this.positionY = positionY;
         },

    /*
    * Sets the height of the SVG drawn
    */
         setPositionX: function setPositionX(positionX) {
            this.positionX = positionX;
         },


    /*
    * Draws a button on the SVG element
    * @return {SVG} group representing the button
    */
         drawButton: function drawButton() {
            var button, text, group, xCoord, yCoord;

            group = draw.group().addClass(this.groupClass);

            xCoord = this.sizeX / 2;
            yCoord = this.sizeY / 2;
            button = group.rect(this.sizeX, this.sizeY).attr({ fill: this.fill }).addClass('my-element');
            text = group.text(this.text).center(xCoord, yCoord).addClass('my-element');

            group.animate().move(this.positionX, this.positionY);

            this.group = group;

            return group;
         },

    /*
    * Draws a node on the SVG element
    * @return {SVG} group representing the node
    */
         drawNode: function drawNode() {
            var node, text, line, xCoord, yCoord, lineCoordinateX, group;

            group = draw.group().addClass(this.groupClass);

            xCoord = this.sizeX / 4;
            yCoord = this.sizeY / 2;
            lineCoordinateX = this.sizeX / 2;
            node = group.rect(this.sizeX, this.sizeY).attr({ fill: this.fill }).addClass('my-element');
            line = group.line(lineCoordinateX, 0, lineCoordinateX, this.sizeY).stroke({ width: 1 }).addClass('my-element');
            text = group.text(this.text).center(xCoord, yCoord).addClass('my-element');

            group.move(700, 700);
            
            group.animate().move(this.positionX, this.positionY);

            this.group = group;

            return group;
         },

    /*
    * Draws an arrow on the SVG element
    * @return {SVG} group representing the arrow
    */
         drawArrow: function drawArrow() {
            var arrow, head1, head2, group;

            group = draw.group().addClass(this.groupClass);

            arrow = group.line(0, 10, 50, 10).stroke({ width: 5 }).addClass('my-element');
            head1 = group.line(40, 0, 50, 10).stroke({ width: 3 }).addClass('my-element');
            head1 = group.line(40, 20, 50, 10).stroke({ width: 3 }).addClass('my-element');

            group.move(this.positionX, this.positionY);

            this.group = group;

            return group;
         },

    /*
    * Draws an arrow on the SVG element
    * @return {SVG} group representing the arrow
    */
         drawEndLineArrow: function drawEndLineArrow() {
            var arrow, head1, head2, tail1, tail2, group;

            group = draw.group().addClass(this.groupClass);

            arrow = group.line(50, 125, 650, 125).stroke({ width: 5 }).addClass('my-element');
            tail1 = group.line(50, 125, 50, 150).stroke({ width: 5 }).addClass('my-element');
            tail2 = group.line(650, 125, 650, 100).stroke({ width: 5 }).addClass('my-element');
            head1 = group.line(25, 125, 50, 150).stroke({ width: 3 }).addClass('my-element');
            head1 = group.line(75, 125, 50, 150).stroke({ width: 3 }).addClass('my-element');

            group.move(this.positionX, this.positionY);

            this.group = group;

            return group;
         },

    /*
    * Draws a textbox on the SVG element
    * @return {SVG} group representing the textbox
    */
         drawTextbox: function drawTextbox() {
            var textbox, text, group;

            group = draw.group().addClass(this.groupClass);

            textbox = group.rect(this.sizeX, this.sizeY).attr({ fill: this.fill }).addClass('my-element');
            text = group.text(this.text).addClass('my-element');

            group.animate().move(this.positionX, this.positionY);

            this.group = group;

            return group;
         },

         drawWhitespace: function drawWhitespace() {
            var whiteSpace;

            whiteSpace = draw.rect(700, 2000).attr({ fill: '#fff' });

            return false;
         },

    /*
    * Moves the SVG group in the Graphic Object to a new position
    * @param newX the starting X coordinate to move the group to
    * @param newY the starting Y coordinate to move the group to
    * @return {SVG} group representing the SVG elements moved
    */
         move: function move(newX, newY) {
            this.group.animate().move(newX, newY);

            this.positionX = newX;
            this.positionY = newY;

            return this.group;
         },

    /*
    * Deletes whatever SVG has been drawn, if any
    * @return {boolean} indicating success
    */
         deleteGraphic: function deleteGraphic() {
      //TODO: delete the group from the main SVG

            this.group.remove();

            return null;
         }
      };

/*
 *    Constructors
 */

/*
* Declaration of a new Graphic object
*/
      Graphic = {
    /*
    * new constructs a new Graphic object for SVG drawing
    * @param groupClass a class name that SVG groups can be manipulated with at once
    * @param text the text that can be used to fill out part of the drawing
    * @param positionX the X coordinate on the drawing plane to put the start of the object
    * @param positionY the Y coordinate on the drawing plane to put the start of the object
    * @default sizeX is set to 100
    * @default sizeY is set to 100
    * @default fill is set to '#f06' (HOT pink)
    * @return Graphic the Graphic object created
    */
         new: function makeGraphic(groupClass, text, positionX, positionY) {
            var newGraphic;

            newGraphic = Object.create(proto);

            newGraphic['group'] = 0;
            newGraphic['groupClass'] = groupClass;
            newGraphic['sizeX'] = 100;
            newGraphic['sizeY'] = 100;
            newGraphic['text'] = text;
            newGraphic['fill'] = '#f06';
            newGraphic['positionX'] = positionX;
            newGraphic['positionY'] = positionY;

            return newGraphic;
         }
      };


      return Graphic;

   });

}( // Help Node out by setting up define.
     typeof module === 'object' && typeof define !== 'function'
    ? function(factory) {
       module.exports = factory(require, exports, module);
    }
    : define
));
// module.exports = Graphic;
