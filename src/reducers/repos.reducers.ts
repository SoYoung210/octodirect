import { Reducer } from 'redux';
import { ItemType } from '../model/item.model';
import {
  FETCH_SUCCESS,
  FETCH_FAIL,
  INDEX_UP,
  INDEX_DOWN,
  UPDATE_VALUE,
} from '../actions/actionTypes';

interface RepoState {
  readonly list: ItemType[];
  readonly filtered: ItemType[];
  readonly index: number;
  readonly maxIndex: number;
  readonly value: string;
}

const initialState = {
  list: [],
  filtered: [],
  index: 0,
  value: '',
  maxIndex: 0,
};

export const reposReducers: Reducer<RepoState> = (
  state: RepoState = initialState,
  action,
): RepoState => {
  switch (action.type) {
    case FETCH_SUCCESS:
      const list = refineData(action.repos);

      return {
        ...state,
        list,
        filtered: list,
        maxIndex: list.length - 1,
      };

    case FETCH_FAIL:
      return {
        ...state,
        list: [],
      };

    case INDEX_UP:
      return {
        ...state,
        index: state.index + 1,
      };

    case INDEX_DOWN:
      return {
        ...state,
        index: state.index - 1,
      };

    case UPDATE_VALUE:
      const filtered = filterList(state.list, action.payload);

      return {
        ...state,
        value: action.payload,
        filtered,
        maxIndex: filtered.length - 1,
      };

    default:
      return state;
  }
};

function filterList(repos: ItemType[], value: string) {
  if (value === '') {
    return repos;
  }
  return repos.filter((repo: ItemType) => repo.name.includes(value));
}

function refineData(rawRepos: any[]) {
  if (!rawRepos) {
    return [];
  }
  return rawRepos.map(({ id, name, htmlUrl }: ItemType) => ({
    id,
    name,
    htmlUrl,
  }));
}
