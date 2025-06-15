import { useRef, type FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { PiPushPinFill } from 'react-icons/pi';
import type { DayId, Task } from '../../../types';
import { moveTask, reorderTask, tagOptions } from '../../../zustand';
import { Description, StyledTask, Tag, TagWrapper, Title } from './styles';

type Props = {
  task: Task;
  cellId: DayId;
  index: number;
  onClick: () => void;
};

export type DraggableItem = {
  type: 'task';
  task: Task;
  sourceCellId: DayId;
  originalIndex: number;
};

export const TaskItem: FC<Props> = ({ task, cellId, index, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: {
      type: 'task',
      task,
      sourceCellId: cellId,
      originalIndex: index,
    } satisfies DraggableItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (draggedItem, monitor) => {
      if (!monitor.didDrop()) {
        moveTask(
          draggedItem.task.id,
          draggedItem.sourceCellId,
          draggedItem.sourceCellId,
          draggedItem.originalIndex,
        );
      }
    },
  });

  const [, drop] = useDrop({
    accept: 'task',
    hover: (draggedItem: DraggableItem) => {
      if (draggedItem.sourceCellId !== cellId) return;
      if (draggedItem.task.pinned || task.pinned) return;

      const dragIndex = draggedItem.originalIndex;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;
      reorderTask(cellId, dragIndex, hoverIndex);
      draggedItem.originalIndex = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <StyledTask
      ref={ref}
      $isDragging={isDragging}
      $completed={task.completed}
      $color={task.color}
      onClick={onClick}
    >
      <Title>
        {task.pinned && <PiPushPinFill size={12} />}
        {task.title}
      </Title>
      {
        task.description && (
          <Description>
            {
              task.description
            }
          </Description>
        )
      }

      {!!task.tags?.length && (
        <TagWrapper>
          {task.tags.map((tagValue) => {
            const tagOption = tagOptions.find((opt) => opt.value === tagValue);

            if (!tagOption) return null;

            const { Icon, label } = tagOption;

            return (
              <Tag key={tagValue}>
                <Icon size={14} />
                {label}
              </Tag>
            );
          })}
        </TagWrapper>
      )}
    </StyledTask>
  );
};
