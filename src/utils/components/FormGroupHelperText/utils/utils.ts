import { FocusEvent } from 'react';
import { FieldError, UseFormClearErrors, UseFormSetError } from 'react-hook-form';

type HandleBlurParams = {
  clearErrors: UseFormClearErrors<any>;
  event: FocusEvent<HTMLInputElement>;
  fieldName: string;
  setError: UseFormSetError<any>;
  validate: (value: string) => boolean | string;
};

export const handleBlur = ({
  clearErrors,
  event,
  fieldName,
  setError,
  validate,
}: HandleBlurParams) => {
  const errorMessage = validate(event.target.value);
  if (typeof errorMessage === 'string') {
    return setError(fieldName, {
      message: errorMessage,
      type: 'manual',
    } as FieldError);
  }

  clearErrors(fieldName);
};
