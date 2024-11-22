import { Dispatch, SetStateAction } from "react";

export interface IMenuBarProps {
    setIndex: Dispatch<SetStateAction<number>>,
    index: number
}