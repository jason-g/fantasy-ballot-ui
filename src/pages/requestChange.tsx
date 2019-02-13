import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './login.css';
import Container from 'reactstrap/lib/Container';
import Col from 'reactstrap/lib/Col';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


interface PropsFromDispatch {
    [key: string]: any,
};
interface myState {
    email: string,
    validate: any,
}
interface PropsFromState {
};
interface OwnProps {
}
type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

class requestChange extends React.Component<AllProps, myState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            validate: {
                emailState: '',
                usernameState: '',
                passwordState: '',
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    handleSubmit(event: any): void {
        event.preventDefault();
        let email = this.state.email;
        this.props.dispatch(
            {
                type: "@@user/REQUEST_CHANGE",
                email: email,
            }
        )
    }

    handleChange(event: any): void {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        switch (name) {
            case 'email': {
                this.setState({ email: value })
                break;
            }
            default: {
                break;
            }
        }
    }

    validateEmail(event: any) {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state
        if (emailRegex.test(event.target.value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({ validate })
    }

    render() {
        return (
            <Container className="Login">
                <h2>Reset your password</h2>
                <h4>Enter your associated email address below.</h4>
                <Form>
                    <Col>
                        <FormGroup>
                            <Label for="email">Email address:</Label>
                                <Input type="email" name="email"
                            id="signupEmail" placeholder="email address"
                            valid={this.state.validate.emailState === 'has-success'}
                            invalid={this.state.validate.emailState === 'has-danger'}
                            onChange={
                                this.handleChange
                            } />
                        </FormGroup>
                    </Col>
                    <div className="d-flex justify-content-center">
                        <Button type="submit" onClick={this.handleSubmit.bind(this)}>Request to reset your password</Button>
                    </div>
                </Form>
                <div className="d-flex justify-content-center">
                    <span className="text-center">
                        Already have an account?  <Link to="/login">Login</Link>
                    </span>
                </div>
            </Container>
        );
    }
}


const mapStateToProps = (state: PropsFromState): OwnProps => ({
})

export default connect(mapStateToProps)(requestChange);
