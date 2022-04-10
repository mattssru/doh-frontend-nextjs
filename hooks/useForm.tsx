import React, { useState } from 'react'

export const useForm = (initialValues:any, validateOnChange = false, validate: { (fieldValues?: any): boolean | undefined; (arg0: { [x: number]: any; }): void; }) => {

    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({} as any);

    const handleInputChange = (e:any) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }
    const resetForm = () => {
        setValues(initialValues);
        setErrors('')
    }
    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}

export const Form = (props:any) => {

    const { children, ...other } = props

    return (
        <form autoComplete="off" {...other}>
            {children}
        </form>
    )
}
