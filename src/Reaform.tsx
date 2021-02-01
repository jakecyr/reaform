import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ReaformProps } from './ReaformProps';

export const Reaform = <I extends Record<string, any>>({
  children,
  onSubmit,
  getRef,
  validate,
}: ReaformProps<I>) => {
  const [values, setValues] = useState({} as Record<keyof I, any>);
  const [validation, setValidation] = useState({} as Record<keyof I, string | undefined>);
  const [touched, setTouched] = useState({} as Record<keyof I, boolean>);
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    updateRef();
  }, [values, touched, valid, validation]);

  const updateRef = () => {
    if (!getRef) {
      return;
    }

    getRef({
      values,
      touched,
      validation,
      valid,
      onTouched: (e) => onInputTouched(e),
      onChange: (e) => onInputChange(e),
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valid) {
      onSubmit(values);
    } else {
      console.error('Form is not valid, but was submitted', validation);
    }
    return false;
  };

  const onInputTouched = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e?.target?.name;

    if (!name) {
      throw new Error('All inputs must have a name attribute');
    }

    if (touched[name]) {
      return;
    }

    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e?.target?.name;

    if (!name) {
      throw new Error('All inputs must have a name attribute');
    }

    const newValues = {
      ...values,
      [name]: e.target.value,
    };

    setValues(newValues);

    if (validate) {
      const validationResponse = validate(newValues) || {};
      setValidation(validationResponse);

      const isValid = Object.values(validationResponse).every(
        (val: string | undefined) => val === null || val === undefined || val === '',
      );

      setValid(isValid);
    }
  };

  return <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>{children}</form>;
};
