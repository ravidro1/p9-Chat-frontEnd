import react, {createContext, ReactNode} from "react";
import {TypeDataContext} from "../types";
import Data from "./Data";

export const DataContext = createContext<TypeDataContext | null>(null);

interface Props {
  children: ReactNode;
}

const DataContextProvider: React.FC<Props> = ({children}: Props) => {
  const value = Data();
  return (
    <DataContext.Provider value={value}> {children} </DataContext.Provider>
  );
};

export default DataContextProvider;
