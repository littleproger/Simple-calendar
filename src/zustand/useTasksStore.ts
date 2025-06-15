import dayjs from 'dayjs';
import { FaClock, FaExclamationCircle, FaStar, FaTag } from 'react-icons/fa';
import { create } from 'zustand';
import { type DayId, type Task } from '../types';
import { sortDates } from '../utils';
import { setMonth, setYear } from './useCalendarStore';


export const tagOptions = [
  { label: 'Birthday', value: 'bday', Icon: FaStar },
  { label: 'Urgent', value: 'urgent', Icon: FaExclamationCircle },
  { label: 'Reminder', value: 'reminder', Icon: FaClock },
  { label: 'General', value: 'general', Icon: FaTag },
];

type State = {
  tasks: Map<DayId, Task[]>
  filteredTasks: Map<DayId, Task[]>
};

// const mockTasks = new Map<DayId, Task[]>(
//   Array(10).fill(0)
//     .map(()=>{
//       const [min,max] = [-30,30];
//       const randInRange = Math.round(Math.random() * (max - min) + min);
//       const date = dayjs().add(randInRange,'day');

//       return (
//         [
//           dateToDateId(date),
//           Array(10).fill(0)
//             .map(
//               (_,i)=>(
//               {
//                 date: dayjs().toISOString(),
//                 id: TaskId(v4()),
//                 title: i + ' Test tasks',
//               } satisfies Task
//               ),
//             ),
//         ]
//       );
//     },
//     ),
// );

export const useTasksStore = create<State>(() => {
  return ({
    // tasks: mockTasks,
    tasks: new Map(),
    filteredTasks: new Map(),
  });
});

export const addOrModifyTask = (task: Task, cellId: DayId) => {
  useTasksStore.setState((state) => {
    const newMap = new Map(state.tasks);

    const original = newMap.get(cellId) ?? [];
    const oldPinned = original.filter((t) => t.pinned);
    const oldUnpinned = original.filter((t) => !t.pinned);

    let updatedPinned = oldPinned;
    let updatedUnpinned = oldUnpinned;

    if (task.pinned) {
      if (oldPinned.some((t) => t.id === task.id)) {
        updatedPinned = oldPinned.map((t) =>
          t.id === task.id ? task : t,
        );
      } else {
        updatedUnpinned = oldUnpinned.filter((t) => t.id !== task.id);
        updatedPinned = [...oldPinned, task];
      }
    } else {
      if (oldUnpinned.some((t) => t.id === task.id)) {
        updatedUnpinned = oldUnpinned.map((t) =>
          t.id === task.id ? task : t,
        );
      } else {
        updatedPinned = oldPinned.filter((t) => t.id !== task.id);
        updatedUnpinned = [...oldUnpinned, task];
      }
    }

    const merged = [...updatedPinned, ...updatedUnpinned];

    newMap.set(cellId, merged);

    return { tasks: newMap };
  });
};

export const deleteTask = (taskId: string, cellId: DayId) => {
  useTasksStore.setState((state) => {
    const newMap = new Map(state.tasks);
    let cellTasks = newMap.get(cellId);

    if (cellTasks) {
      cellTasks = [...cellTasks.filter((t) => t.id !== taskId)];
    } else {
      cellTasks = [];
    }
    newMap.set(cellId, cellTasks);

    return {
      tasks: newMap,
    };
  });
};

export const moveTask = (taskId: string, fromCellId: DayId, toCellId: DayId, index?: number) => {
  const tasks = useTasksStore.getState().tasks;
  const newTasks = new Map(tasks);

  const sourceTasks = newTasks.get(fromCellId) ? [...newTasks.get(fromCellId)!] : [];
  const targetTasks = newTasks.get(toCellId) ? [...newTasks.get(toCellId)!] : [];

  const taskIndex = sourceTasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) return { tasks };

  const [movedTask] = sourceTasks.splice(taskIndex, 1);

  const targetIndex = index !== undefined ? index : targetTasks.length;

  if (movedTask.pinned) {
    targetTasks.splice(0, 0, movedTask);
  } else {
    targetTasks.splice(targetIndex, 0, movedTask);
  }

  newTasks.set(fromCellId, sourceTasks);
  newTasks.set(toCellId, targetTasks);

  useTasksStore.setState({ tasks: newTasks });
};

export const reorderTask = (cellId: DayId, fromIndex: number, toIndex: number) => {
  const tasks = useTasksStore.getState().tasks;
  const newTasks = new Map(tasks);
  const cellTasks = newTasks.get(cellId);

  if (!cellTasks || fromIndex === toIndex) {
    return { tasks };
  }

  const updatedTasks = [...cellTasks];
  const [movedTask] = updatedTasks.splice(fromIndex, 1);

  updatedTasks.splice(toIndex, 0, movedTask);

  newTasks.set(cellId, updatedTasks);

  useTasksStore.setState({ tasks: newTasks });
};

export const filterTasksMapByQuery = (
  query: string,
): Map<DayId, Task[]> => {
  const tasks = useTasksStore.getState().tasks;

  const trimmedQuery = query.trim().toLowerCase();
  const result = new Map<DayId, Task[]>();

  for (const [dayId, taskList] of tasks.entries()) {
    const filtered = taskList.filter((task) =>
      task.title.toLowerCase().includes(trimmedQuery),
    );

    result.set(dayId, filtered);
  }

  useTasksStore.setState({ filteredTasks: result });

  return result;
};

export const searchTaskByQuery = (
  query: string,
) => {
  filterTasksMapByQuery(query);
  if (!query) return;

  const firstFounded = sortDates(
    {
      dates: [
        ...useTasksStore.getState().filteredTasks.entries(),
      ].filter(([_,val])=>val.length).map(([key])=>key),
      getValue: (it) => dayjs(it, { format:'YYYY-MM-DD' }),
      direction: 'asc',
    },
  )[0];

  if (firstFounded) {
    const date = dayjs(firstFounded);

    setYear(date.year());
    setMonth(date.month());
  }
};
