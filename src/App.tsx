import React from 'react';
import { Reaform } from './Reaform';
import { ReaformError } from './ReaformError';
import ReaformSchema from './ReaformSchema';
import { useReaformRef } from './useReaformRef';

const initialValues = { name: 'Jake', age: 20 };

function App() {
  const [ref, setRef] = useReaformRef<typeof initialValues>();

  const schema = ReaformSchema.object().shape({
    name: ReaformSchema.string().required(),
    age: ReaformSchema.number().required().positive().integer(),
  });

  return (
    <Reaform
      getRef={(ref) => setRef(ref)}
      initial={initialValues}
      validationSchema={schema}
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
