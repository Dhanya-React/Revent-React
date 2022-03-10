import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button ,Label} from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { signInWithEmail } from '../../app/firestore/firebaseService';
import { closeModal } from '../../app/common/modals/modalReducer';

export default function LoginForm() {
    const dispatch = useDispatch();

    return (
        <ModalWrapper size='mini' header='Sign in to Re-vents'>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}
                onSubmit={async (values, { setSubmitting ,setErrors}) => {
                    try {
                        // await dispatch(signInUser(values));
                        await signInWithEmail(values);
                        setSubmitting(false);
                        dispatch(closeModal());
                    } catch (error) {
                        setErrors({ auth: 'Problem with username or password' });
                        setSubmitting(false);
                    }
                }}
            >
                {({isSubmitting, isValid, dirty, errors}) => (
                    <Form className='ui form'>
                        <MyTextInput name='email' placeholder='Email Address' />
                        <MyTextInput name='password' placeholder='Password' type='password' />
                        {errors.auth && <Label basic color='red' style={{marginBottom: 10}} content={errors.auth} />}
                        <Button 
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type='submit'
                            fluid
                            size='large'
                            color='teal'
                            content='Login'
                        />
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    )
}