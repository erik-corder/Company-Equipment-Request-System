import { useState } from 'react';

// Types for the useForm hook
interface FormState {
  [key: string]: string;
}

interface ValidationRules {
  [key: string]: (val: string) => string | undefined;
}

const useForm = (submitHandler, initialState: FormState, validationRules: ValidationRules) => {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormState>({});

  // Handle input changes and update state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form inputs after submission attempt
  const validateForm = (): boolean => {
    const newErrors: FormState = {};
    let isValid = true;
    for (const key in validationRules) {
      const error = validationRules[key](values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission with validation
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formIsValid = validateForm();
    if (formIsValid) {
      await submitHandler(values);
    }
  };

  return { values, errors, handleChange, handleSubmit };
};

export default useForm;
