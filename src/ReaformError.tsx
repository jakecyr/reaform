import { Ref } from './Ref';

export const ReaformError = ({
  propKey,
  reaformRef,
  children,
}: {
  propKey: string;
  reaformRef: Ref<any> | undefined;
  children?: React.ReactNode;
} & React.PropsWithChildren<any>) => {
  if (reaformRef?.validation[propKey] && reaformRef?.touched[propKey]) {
    return children || null;
  } else {
    return null;
  }
};
