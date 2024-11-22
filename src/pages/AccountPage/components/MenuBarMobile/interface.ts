import { Dispatch, SetStateAction } from "react";

export interface IMenuBarMobileProps {
    setIndex: Dispatch<SetStateAction<number>>,
    index: number
}