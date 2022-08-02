import * as yup from 'yup';

export const validationSchema = yup.object().shape({
	text: yup.string().min(5, 'Too short note').required('Required'),
	sign: yup.string()
		.min(5, 'Too short sign')
		.max(100, 'Max length is 100 characters')
		.required('Required'),
	zone: yup.string().required('Required'),
});