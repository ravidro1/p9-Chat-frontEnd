import react, {createContext, ReactNode} from "react";
import SizesData from "./SizesData";
import {TypeSizeContext} from "../types";

export const SizeContext = createContext<TypeSizeContext | null>(null);

interface Props {
  children: ReactNode;
}

const SizesContextProvider: React.FC<Props> = ({children}: Props) => {
  const value = SizesData();
  return (
    <SizeContext.Provider value={value}> {children} </SizeContext.Provider>
  );
};

export default SizesContextProvider;
