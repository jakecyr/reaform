# Reaform - Easy React Forms

A simple React library to create and validate forms.

## Example

Below is a full example for validate a simple form:

```tsx
import React from 'react';
import { Reaform } from './Reaform';
import { ReaformError } from './ReaformError';
import { useReaformRef } from './useReaformRef';

const initialValues = { name: 'Jake', age: 20 };

function App() {
  const [ref, setRef] = useReaformRef<typeof initialValues>();

  const validate = (
    values: Record<keyof typeof initialValues, any>,
  ): Record<keyof typeof initialValues, string | undefined> => {
    const errors = {} as Record<keyof typeof initialValues, string | undefined>;

    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.age) {
      errors.age = 'Required';
    } else if (values.age && !/^[0-9]+$/.test(values.age)) {
      errors.age = 'Invalid number';
    }

    return errors;
  };

  return (
    <Reaform
      getRef={(ref) => setRef(ref)}
      initial={initialValues}
      validate={validate}
      onSubmit={(values) => console.log('submitted', values)}
    >
      <div>
        <label>Name</label>
        <input onBlur={ref?.onTouched} onChange={ref?.onChange} type="text" name="name" />

        <ReaformError reaformRef={ref} propKey="name">
          <span>{ref?.validation?.name}</span>
        </ReaformError>
      </div>

      <div>
        <label>Age</label>
        <input onBlur={ref?.onTouched} onChange={ref?.onChange} type="text" name="age" />
        <ReaformError reaformRef={ref} propKey="age">
          {ref?.validation?.age}
        </ReaformError>
      </div>

      <button disabled={!ref?.valid} type="submit">
        Submit
      </button>
    </Reaform>
  );
}

export default App;
```
