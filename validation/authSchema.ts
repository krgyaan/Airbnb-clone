import * as yup from 'yup';

export const registerSchema = yup
    .object({
        name: yup.string().required().min(3).max(50),
        email: yup.string().email().required(),
        password: yup.string().required().min(6).max(30),
        passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Comfirm Password Not Matched').required()
    }).required();

export type registerType = yup.InferType<typeof registerSchema>;