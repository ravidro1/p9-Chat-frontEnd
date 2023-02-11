import react, {createContext, ReactNode} from "react";
import {TypeFunctionsContext} from "../types";
import FunctionsContext from "./FunctionsContext";

export const FunctionContext = createContext<TypeFunctionsContext | null>(null);

interface Props {
  children: ReactNode;
}

const FunctionsContextProvider: React.FC<Props> = ({children}: Props) => {
  const value = FunctionsContext();
  return (
    <FunctionContext.Provider value={value}>
      {" "}
      {children}{" "}
    </FunctionContext.Provider>
  );
};

export default FunctionsContextProvider;
