import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const RankingComponent = ({ items, setItems }) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const newList = Array.from(items);
    const [reorderedItem] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, reorderedItem);

    setItems(newList); // Update backend
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      padding: '8px',
                      margin: '4px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '4px',
                      ...provided.draggableProps.style,
                    }}
                  >
                    {item.name}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RankingComponent;
