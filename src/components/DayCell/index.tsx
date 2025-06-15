import type dayjs from 'dayjs';
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { FaPlus } from 'react-icons/fa';
import { type DayId, type Task } from '../../types';
import { dateToDateId } from '../../utils';
import { moveTask, openModal, useHolidayStore, useTasksStore } from '../../zustand';
import { AddOrEditTaskModal } from './AddOrEditTaskModal';
import { AddButton, Cell, DateHeader, HolidayItem, Scrollable } from './styles';
import { TaskItem, type DraggableItem } from './TaskItem';

type Props = {
  cellId: DayId;
  date: dayjs.Dayjs;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export const DayCell: React.FC<Props> = ({
  cellId,
  date,
  isCurrentMonth,
  isToday,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const holidays = useHolidayStore((s)=> s.holidays.get(dateToDateId(date)));
  const tasks_ = useTasksStore((s)=> s.tasks.get(cellId));
  const filteredTasks = useTasksStore((s)=> s.filteredTasks.get(cellId));
  const tasks = filteredTasks ?? tasks_;

  const [, drop] = useDrop({
    accept: 'task',
    drop: (item: DraggableItem) => {
      if (item.sourceCellId !== cellId) {
        moveTask(item.task.id, item.sourceCellId, cellId);
      }
    },
  });

  drop(ref);

  const handleAddTask = () => {
    openModal(
      <AddOrEditTaskModal cellId={cellId} date={date} />,
      'Add new task',
    );
  };

  const handleEditTask = (task: Task) => {
    openModal(
      <AddOrEditTaskModal task={task} cellId={cellId} date={date} />,
      'Edit task',
    );
  };

  return (
    <Cell
      $isCurrentMonth={isCurrentMonth}
      $isToday={isToday}
      ref={ref}
    >
      <DateHeader>
        <span>{date.date()}</span>
        <AddButton onClick={handleAddTask}>
          <FaPlus />
        </AddButton>
      </DateHeader>

      <Scrollable>
        {
          !!holidays && (
            holidays.map((holiday) => (
              <HolidayItem key={holiday.id + holiday.name}>
                {holiday.name}
              </HolidayItem>
            ))
          )
        }
        {
          !!tasks && (
            tasks.map((task,i) => (
              <TaskItem
                key={task.id}
                onClick={() => handleEditTask(task)}
                cellId={cellId}
                index={i}
                task={task}
              />
            ))
          )
        }
      </Scrollable>
    </Cell>
  );
};
