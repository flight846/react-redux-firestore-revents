import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { login, socialLogin } from '../../auth/authActions';
import { connect } from 'react-redux';
import SocialLogin from '../SocialLogin/SocialLogin';

const actions = {
    login,
    socialLogin
};

const LoginForm = ({ login, socialLogin, handleSubmit, error }) => {
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
                <Divider horizontal>Or</Divider>
                <SocialLogin socialLogin={socialLogin}/>
                {error && <Label basic color='red'>{error}</Label>}
            </Segment>
        </Form>
    );
};

export default connect(
    null,
    actions
)(reduxForm({ form: 'loginForm' })(LoginForm));
