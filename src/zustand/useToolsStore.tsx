import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { filterTasksMapByQuery } from './useTasksStore';

type ToolsStore = {
  filterQuery: string|null;
};

export const useToolsStore = create(subscribeWithSelector<ToolsStore>(() => ({
  filterQuery: null,
})));

export const clearFilters = () => {
  useToolsStore.setState(useToolsStore.getInitialState());
};

export const setFilterQuery = (query: string) => {
  useToolsStore.setState({ filterQuery:query });
};

useToolsStore.subscribe(({ filterQuery })=>{
  filterTasksMapByQuery(filterQuery ?? '');
});
