import {
    validateString,
    validateEmail,
    validatePassword
} from '../ValidationConstraints'

export const validateInput = (inputId, inputValue) => {
    if (
        inputId === 'fullName' 
    ) {
        return validateString(inputId, inputValue)
    } else if (inputId === 'email') {
        return validateEmail(inputId, inputValue)
    } else if (inputId === 'password' || inputId === 'confirmPassword') {
        return validatePassword(inputId, inputValue)
    } else if (inputId === 'resetToken') {
        return validateString(inputId, inputValue)
    } 
}