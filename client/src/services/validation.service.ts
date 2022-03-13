import axios from "axios";
import {apiURL} from "./helper.service";

const SUPPORTED_FIELDS = {
    email: "email",
    username: "username",
    password: "password",
    firstName: "firstName",
    lastName: "lastName",
}

type SUPPORTED_FIELDS = keyof typeof SUPPORTED_FIELDS;

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
const APIValidate = (field: SUPPORTED_FIELDS, value: string, required: boolean = false): Promise<string> => {
    return new Promise((resolve) => {
        value = value ? value.trim() : "";

        if (required && (!value || !value.length))
            resolve(`Required`);

        if (!field || value.length <= 0)
            return 'Required';

        let data: IAPIValidator = {}
        data[field] = value

        let validationMessage;
        axios.post(apiURL('/valid'), data)
            .catch(err => validationMessage = err.response.data.error)
            .finally(() => {
                if (typeof validationMessage === 'string')
                    resolve(validationMessage)
                else
                    resolve('')
                resolve(validationMessage)
            });
    })
};

export {APIValidate};
