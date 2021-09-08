const keys = ["required", "email", "phoneNumber"] as const;

export type ValidatorTypes = typeof keys[number];

export type ValidatorStringMap = Partial<Record<ValidatorTypes, string>>;

export type IFormFieldValidator = <T>(value: T) => boolean;

export type IFormValidatorEntry<T> = {
  message: string;
  validator: IFormFieldValidator<T>;
};

export type IFieldConfig<T> = {
  intialValue: T;
  validators: IFormValidatorEntry<T>[];
};

export type IFieldState<T> = {
  value: T;
  valid: boolean;
  errors: string[];
};

export type IFieldStateMap<T, U> = {
  [K in U]: IFieldState<T[K]>;
};

type IUseFormProps<T, U extends keyof T> = {
  fields: {
    [K in U]: IFieldConfig<T[K]>;
  };
};

export type IUseFormResult<T, U> = {
  fields: IFieldStateMap<T, U>;
  fieldValueSetter: (key: U, value: T[U]) => void;
  fieldErrorSetter: (key: U, error: string) => void;
  validate: () => void;
  getValidatedData: () => T | false;
  validateField: (key: U) => boolean;
};
