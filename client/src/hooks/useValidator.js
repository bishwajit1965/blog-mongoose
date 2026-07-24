import { useCallback, useState } from "react";

// import { useCallback, useState } from "react";

const useValidator = (validationRules, formData) => {
  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    const newErrors = {};

    for (const field in validationRules) {
      const value = formData[field];
      const rules = validationRules[field];

      // Required
      if (rules.required && !value?.toString().trim()) {
        newErrors[field] = rules.required.message || "This field is required.";
        continue;
      }

      // Pattern
      if (rules.pattern && value && !rules.pattern.value.test(value)) {
        newErrors[field] = rules.pattern.message || "Invalid format.";
        continue;
      }

      // Enum
      if (rules.enum && value && !rules.enum.values.includes(value)) {
        newErrors[field] = rules.enum.message || "Invalid value.";
        continue;
      }

      // Minimum Length
      if (rules.minLength && value && value.length < rules.minLength.value) {
        newErrors[field] =
          rules.minLength.message ||
          `Minimum length is ${rules.minLength.value}.`;
        continue;
      }

      // Maximum Length
      if (rules.maxLength && value && value.length > rules.maxLength.value) {
        newErrors[field] =
          rules.maxLength.message ||
          `Maximum length is ${rules.maxLength.value}.`;
        continue;
      }

      // Minimum Number
      if (rules.min && value !== undefined && Number(value) < rules.min.value) {
        newErrors[field] =
          rules.min.message || `Minimum value is ${rules.min.value}.`;
        continue;
      }

      // Maximum Number
      if (rules.max && value !== undefined && Number(value) > rules.max.value) {
        newErrors[field] =
          rules.max.message || `Maximum value is ${rules.max.value}.`;
        continue;
      }

      // Custom Validation
      if (rules.custom && typeof rules.custom === "function") {
        const customError = rules.custom(value, formData);

        if (customError) {
          newErrors[field] = customError;
          continue;
        }
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => setErrors({}), 3000);
    }

    return Object.keys(newErrors).length === 0;
  }, [validationRules, formData]);

  return { errors, validate };
};

export default useValidator;
