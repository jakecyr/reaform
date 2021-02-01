import { useState } from 'react';
import { Ref } from "./Ref";

export const useReaformRef = <I>(
  defaultValue?: Ref<I>,
): [Ref<I> | undefined, (ref: Ref<I>) => any] => {
  const [ref, setRef] = useState<Ref<I> | undefined>(defaultValue || undefined);
  return [ref, setRef];
};
