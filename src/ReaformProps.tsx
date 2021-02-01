import React from 'react';
import { Ref } from "./Ref";

export interface ReaformProps<I extends Record<string, any>> extends React.PropsWithChildren<any> {
  initial: I;
  onSubmit: (values: Record<keyof I, any>) => any;
  children: React.ReactNode;
  getRef?: (ref: Ref<I>) => any;
  validate?: (values: Record<keyof I, any>) => Record<keyof I, string | undefined>;
}
