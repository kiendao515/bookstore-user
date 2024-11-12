import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';

export interface IPosition {
  id: any;
  isDragging: boolean;
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface IObject {
  asset: string;
  positions: IPosition;
}

export interface IKonvaStore {
  direction: 'front' | 'back';
  color: string;
  selected: boolean;
  front?: IObject;
  back?: IObject;
}

const initialState: IKonvaStore = {
  direction: 'front',
  color: '#ffffff',
  selected: false,
  front: undefined,
  back: undefined,
};

export const konvaSlice = createSlice({
  name: 'konva',
  initialState,
  reducers: {
    setSelected: (state, actions: PayloadAction<boolean>) => {
      return {
        ...state,
        selected: actions.payload,
      };
    },
    setDirection: (state, actions: PayloadAction<'front' | 'back'>) => {
      return {
        ...state,
        direction: actions.payload,
      };
    },
    setFront: (state, actions: PayloadAction<IObject>) => {
      return {
        ...state,
        front: actions.payload,
      };
    },
    setBack: (state, actions: PayloadAction<IObject>) => {
      return {
        ...state,
        back: actions.payload,
      };
    },
    setAsset: (state, actions: PayloadAction<string>) => {
      return {
        ...state,
        [state.direction]: {
          asset: actions.payload,
          ...state[state.direction],
        },
      };
    },
  },
});

export const { setSelected, setFront, setBack, setDirection, setAsset } = konvaSlice.actions;

export const getSelected = (state: RootState) => state.konva.selected;
export const getDirection = (state: RootState) => state.konva.direction;

export default konvaSlice.reducer;
