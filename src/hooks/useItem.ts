import { useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { IObject, setBack, setFront, setSelected } from '@/store/duck/konva/slice';

const useItem = () => {
  const dispatch = useAppDispatch();
  const { selected, back, front, direction } = useAppSelector((state) => state.konva);

  const onSelect = () => {
    dispatch(setSelected(true));
  };

  const onDeselect = () => {
    dispatch(setSelected(false));
  };

  const setObjectData = (data: IObject) => {
    if (direction === 'front') {
      dispatch(setFront(data));
    } else {
      dispatch(setBack(data));
    }
  };

  const data = useMemo(() => {
    return direction === 'front' ? front : back;
  }, [front, back, direction]);

  return {
    dispatch,
    selected,
    back,
    front,
    direction,
    onSelect,
    onDeselect,
    data,
    setObjectData,
  };
};

export default useItem;
