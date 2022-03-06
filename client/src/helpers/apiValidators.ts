/**
 * Checks if the given email is valid and not already in use.
 * @param email
 * @return {String} error message
 */
import axios from "axios";

enum SUPPORTED_FIELDS {
    email = "email",
    username = "username",
    password = "password",
    firstName = "firstName",
    lastName = "lastName",
}

type fieldType = keyof typeof SUPPORTED_FIELDS;

interface IAPIValidator {
    [field: string]: string | null;
}

/**
 * Validates the given field and value with the API
 * @param field
 * @param value
 * @param required
 * @return {Promise<string>} The validation error message or empty string if valid
 */
const APIValidate = (field: fieldType, value: string, required: boolean = false): Promise<string> => {
    return new Promise((resolve) => {
        value = value.trim();

        if (required && (!value || !value.length))
            resolve(`Required`);

        if (!field || value.length <= 0)
            return 'Required';

        let data: IAPIValidator = {}
        data[field] = value

        let validationMessage = ''
        axios.post(apiURL('/valid'), data)
            .catch(err => validationMessage = err.response.data.error)
            .finally(() => resolve(validationMessage));
    })
};

export {APIValidate};
export type { fieldType };
