import { useState } from "react";

import { IFieldStateMap, IUseFormProps, IUseFormResult } from "./types";

export default function useForm<T>(
  props: IUseFormProps<T, keyof T>
): IUseFormResult<T, keyof T> {
  const { fields } = props;
  type U = keyof T;
  const keys = Object.keys(fields) as U[];

  const initial: IFieldStateMap<T, U> = keys.reduce((acc, key) => {
    const item = fields[key];
    return {
      ...acc,
      [key]: {
        value: item.intialValue,
        errors: item.errors ?? [],
        valid: true,
      },
    };
  }, {} as IFieldStateMap<T, U>);
  const [fieldsState, setFieldsState] = useState(initial);

  const fieldValueSetter = (key: U, value: T[U]): void => {
    const updated = {
      ...fieldsState,
      [key]: {
        ...fieldsState[key],
        value,
        errors: [],
      },
    };

    setFieldsState(updated);
  };

  const fieldErrorSetter = (key: U, error: string): void => {
    const updated = {
      ...fieldsState,
      [key]: {
        ...fieldsState[key],
        errors: [...fieldsState[key].errors, error],
      },
    };

    setFieldsState(updated);
  };

  const validate = (): boolean => {
    const fieldKeys = Object.keys(fieldsState) as U[];
    let updated = {} as IFieldStateMap<T, U>;
    const formValid = fieldKeys.reduce((accu, key) => {
      const config = fields[key];
      const state = fieldsState[key];

      const isValid: boolean = config.validators.reduce(
        (acc: boolean, validatorItem) => {
          const { validator, message } = validatorItem;
          if (!validator(state.value)) {
            updated = {
              ...updated,
              [key]: {
                ...state,
                errors: [...state.errors, message],
              },
            };
            return false;
          }
          return acc;
        },
        true
      );

      if (!isValid) return false;
      return accu;
    }, true);

    if (!formValid) {
      setFieldsState(updated);
    }

    return formValid;
  };

  const getValidatedData = (): T | false => {
    const isValid = validate();

    if (!isValid) return false;

    return keys.reduce((acc: T, key: U) => {
      return {
        ...acc,
        [key]: fieldsState[key].value,
      };
    }, {} as T);
  };

  return {
    fields: fieldsState,
    fieldValueSetter,
    fieldErrorSetter,
    validate,
    getValidatedData,
  };
}
