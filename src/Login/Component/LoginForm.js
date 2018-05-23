import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import logo from 'Images/dot-logo_48x48.png';
import {
    Form,
    Message,
    Segment
} from 'semantic-ui-react';


const className = "LoginForm";
class LoginForm extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            password: '',
            email: '',
            emailError: false,
            passwordError: false
        };
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmit() {
        const userInfo = {
            username: this.state.email,
            password: this.state.password
        };

        (userInfo.username && userInfo.password) ?
            this.props.beginLogin(userInfo)
            : this.setState({
                emailError: !userInfo.username,
                passwordError: !userInfo.password
            });
    }

    render() {
        const props = this.props;
        const errorMessage = props.errorMessage ? props.errorMessage.userMessage : '';

        return (
            <div
                className={`${className}__container`}
            >
                <div
                    className={`${className}__title`}
                >
                    <img 
                        src={logo}
                    />
                    <div>{"Login to your account"}</div>
                </div>
                <Form
                    onSubmit={this.handleSubmit}
                    error={errorMessage ? true : false}
                    size="large"
                >
                    <Segment stacked>
                        <Form.Field>
                            <Form.Input
                                type="email"
                                icon="user"
                                iconPosition="left"
                                placeholder='Email'
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                error={this.state.emailError}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                type='password'
                                icon="lock"
                                iconPosition="left"
                                placeholder='Password'
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                error={this.state.passwordError}
                            />
                        </Form.Field>
                        <button 
                            type="submit"
                            className={`${className}__button`}
                        >
                            {"Login"}
                        </button>
                        <Message
                            error
                            header='Oops!'
                            content={errorMessage}
                        />
                    </Segment>
                </Form>
            </div>
        );
    }
}

LoginForm.propTypes = {
    beginLogin: PropTypes.func.isRequired,
    errorMessage: PropTypes.object
};

export default LoginForm;
