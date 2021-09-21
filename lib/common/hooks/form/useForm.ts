import { useCallback, useState } from "react";

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
        errors: [],
        valid: true,
      },
    };
  }, {} as IFieldStateMap<T, U>);
  const [fieldsState, setFieldsState] = useState(initial);

  const fieldValueSetter = useCallback(
    (key: U, value: T[U]): void => {
      setFieldsState((state) => ({
        ...state,
        [key]: {
          ...state[key],
          value,
          errors: [],
        },
      }));
    },
    [setFieldsState]
  );

  const fieldErrorSetter = useCallback(
    (key: U, error: string): void => {
      setFieldsState((state) => ({
        ...state,
        [key]: {
          ...state[key],
          errors: [error],
        },
      }));
    },
    [setFieldsState]
  );

  const validate = useCallback((): boolean => {
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
      setFieldsState({
        ...fieldsState,
        ...updated,
      });
    }

    return formValid;
  }, [fieldsState, fields]);

  const getValidatedData = useCallback((): T | false => {
    const isValid = validate();

    if (!isValid) return false;

    return keys.reduce((acc: T, key: U) => {
      return {
        ...acc,
        [key]: fieldsState[key].value,
      };
    }, {} as T);
  }, [fieldsState, validate, keys]);

  const validateField = useCallback(
    (key: U): boolean => {
      const { value, errors } = fieldsState[key];
      const { validators } = fields[key];
      let updated = {} as IFieldStateMap<T, U>;

      const fieldValid = validators.reduce((acc, validatorItem) => {
        const { validator, message } = validatorItem;
        if (!validator(value)) {
          updated = {
            ...updated,
            [key]: {
              ...value,
              errors: [...errors, message],
            },
          };
          return false;
        }
        return acc;
      }, true);

      if (!fieldValid) {
        setFieldsState({
          ...fieldsState,
          ...updated,
        });
        return false;
      }

      return true;
    },
    [fieldsState, fields]
  );

  return {
    fields: fieldsState,
    fieldValueSetter,
    fieldErrorSetter,
    validate,
    getValidatedData,
    validateField,
  };
}
