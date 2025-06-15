import type { Dayjs } from 'dayjs';
import { useActionState, useState } from 'react';
import { useTheme } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { TaskId, type DayId, type Task } from '../../../types';
import { assert } from '../../../utils';
import { addOrModifyTask, closeModal, deleteTask, tagOptions } from '../../../zustand';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Label, LabelWithInputWrapper } from '../../Label';
import { TagsSelector } from '../../TagsSelector';
import { TextArea } from '../../TextArea';
import { ButtonsWrapper, CheckboxWrapper, ErrorMessage, FormWrapper } from './styles';


type AddOrEditTaskProps = {
  task?: Task;
  date: Dayjs;
  cellId: DayId;
};

type TaskFormState = {
  title: Task['title'];
  description?: Task['description'];
  color?: Task['color'];
  completed?: Task['completed'];
  pinned?: Task['pinned'];
  error?: string;
};

export const AddOrEditTaskModal = ({ task, cellId, date }: AddOrEditTaskProps) => {
  const theme = useTheme();
  const [tags,setTags] = useState<Task['tags']>(task?.tags ?? []);

  const [state, formAction, isPending] = useActionState(handleSaveTask, {
    title: task?.title ?? '',
    description: task?.description ?? '',
    completed: task?.completed ?? false,
    color: task?.color ?? theme.colors.primary,
    pinned: task?.pinned ?? false,
    error: undefined,
  });

  function handleSaveTask(_prev: TaskFormState, formData: FormData): TaskFormState {
    const title = formData.get('title')?.toString()
      .trim() ?? '';
    const description = formData.get('description')?.toString()
      .trim() ?? '';
    const completed = formData.get('completed') === 'on';
    const pinned = formData.get('pinned') === 'on';
    const color = formData.get('color')?.toString() ?? theme.colors.primary;

    if (!title) return { ..._prev, error: 'Title is required.' };
    if (title.length < 3) return { ..._prev, error: 'Title must be at least 3 characters.' };

    const updatedTask: Task = {
      id: task?.id ?? TaskId(uuidv4()),
      date: date.toISOString(),
      title,
      description,
      tags,
      completed,
      pinned,
      color,
    };

    addOrModifyTask(updatedTask, cellId);
    closeModal();

    return { ..._prev, title: '', error: undefined };
  }

  const handleDeleteTask = () => {
    assert(task, 'No task to delete.');
    const confirmed = window.confirm('Are you sure you want to delete this task?');

    if (confirmed) {
      deleteTask(task.id, cellId);
      closeModal();
    }
  };

  return (
    <FormWrapper action={formAction}>
      <LabelWithInputWrapper>
        <Label htmlFor="title">Title</Label>
        <Input
          name="title"
          placeholder="Task title"
          defaultValue={state.title}
          variant='default'
          autoFocus
        />
      </LabelWithInputWrapper>
      <LabelWithInputWrapper>
        <Label htmlFor="description">Description</Label>
        <TextArea
          name="description"
          placeholder="Task description"
          defaultValue={state.description}
        />
      </LabelWithInputWrapper>

      <LabelWithInputWrapper>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <TagsSelector
          onChange={(v) => setTags(v)}
          options={tagOptions}
          selected={tags ?? []}
        />
      </LabelWithInputWrapper>

      <LabelWithInputWrapper>
        <Label htmlFor="color">Task Color</Label>
        <Input
          type="color"
          id="color"
          name="color"
          defaultValue={state.color}
          style={{ width: '50px', height: '30px', padding: 0, border: 'none' }}
        />
      </LabelWithInputWrapper>


      <CheckboxWrapper>
        <input type="checkbox" name="completed" defaultChecked={state.completed} />
        <span>
          Completed
        </span>
      </CheckboxWrapper>

      <CheckboxWrapper>
        <input type="checkbox" name="pinned" defaultChecked={state.pinned} />
        <span>
          Pin to top
        </span>
      </CheckboxWrapper>

      {state.error && <ErrorMessage>{state.error}</ErrorMessage>}

      <ButtonsWrapper>
        <Button type="submit" disabled={isPending} variant="primary">
          {task ? 'Update Task' : 'Add Task'}
        </Button>
        {task && (
          <Button type="button" onClick={handleDeleteTask} disabled={isPending} variant="dangerous">
            Delete
          </Button>
        )}
      </ButtonsWrapper>
    </FormWrapper>
  );
};
