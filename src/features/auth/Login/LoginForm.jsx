import React from 'react';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { login } from '../../auth/authActions';
import { connect } from 'react-redux';

const actions = {
    login
};

const LoginForm = ({ login, handleSubmit, error }) => {
    return (
        <Form size='large' onSubmit={handleSubmit(login)} autoComplete='off'>
            <Segment>
                <Field
                    name='email'
                    component={TextInput}
                    type='text'
                    placeholder='Email Address'
                />
                <Field
                    name='password'
                    component={TextInput}
                    type='password'
                    placeholder='password'
                />
                <p>Email: admin@test.com<br />Password: 123456</p>
                <Button fluid size='large' color='teal'>
                    Login
                </Button>
                {error && <Label basic color='red'>{error}</Label>}
            </Segment>
        </Form>
    );
};

export default connect(
    null,
    actions
)(reduxForm({ form: 'loginForm' })(LoginForm));
