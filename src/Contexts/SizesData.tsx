import react, {useRef} from "react";
import {TypeSizeContext} from "../types";

interface Props {}

const SizesData = (): TypeSizeContext => {
  const creationTime_oneContant_ref = useRef<HTMLDivElement | null>(null);

  return {creationTime_oneContant_ref};
};

export default SizesData;
