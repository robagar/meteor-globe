import { createContext, useContext } from "react";
import useConstant from "use-constant";

import { GMN } from "./data/GMN";

export interface GMNContext {
  gmn: GMN;
}

const Context = createContext<GMNContext | null>(null);

export function GMNProvider({ children }) {
  const gmn = useConstant(() => new GMN());

  const contextValue = { gmn };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export function useGMN(): GMNContext {
  const c = useContext(Context);
  if (c) return c;
  throw Error("useGMN used outside GMNProvider");
}
