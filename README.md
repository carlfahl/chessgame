## Chess Game Demo
Application to demonstrate drag and drop functionality in React applications.

### The react dnd packages

`npm install --save react-dnd react-dnd-html5-backend`

### Making a component dragable

Add an entry in the ItemTypes object of Constants.js for each dragable type:

```js
export const ItemTypes = {
  KNIGHT: 'knight'
};
```

Add the following to the file defining a react component that is draggable (can be class based or
functional component).  This is outside of the actual component definition

```js
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const knightSource = {
  beginDrag(props) {
    props.updatePos(props.peiceIndex);
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}
```

To export the draggable component:

```js
export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
```

access the props as:

```js
const {peice, connectDragSource, isDragging} = props;
```

The function `beginDrag` will run when a draggable item is first dragged.  It gets the props object of the dragged component.  connectDragSource and isDragging are added to the props of the component.

So we can change the style of a component if it is begin dragged.

### Make a component that can be droped into

Create a drop target.  

```js
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop(props, monitor) {
    props.onClickHandler(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}
```

export the component as:

```js

```

The function `drop` runs when we drop onto the drop target.
The collect function adds the prop isOver to the drop target that we can use for styling

```js
```
