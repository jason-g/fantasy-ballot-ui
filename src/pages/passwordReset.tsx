import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import './login.css';
import Container from 'reactstrap/lib/Container';
import Col from 'reactstrap/lib/Col';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import Alert from 'reactstrap/lib/Alert';
import { UserState } from '../store/user/types';
import queryString from 'query-string';


interface PropsFromDispatch {
    [key: string]: any,
};
interface myState {
    token: any,
    password: string,
}
interface PropsFromState {
    
};
interface OwnProps {
}
type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

class ResetPassword extends React.Component<AllProps, myState> {
    constructor(props: any) {
        super(props);
        const parsed = queryString.parse(props.location.search);
        this.state = {
            password: '',
            token: parsed.access_token || '',
        };
    }

    handleSubmit(event: any): void {
        event.preventDefault();
        let token = this.state.token;
        let password = this.state.password;
        this.props.dispatch(
            {
                type: "@@user/RESET_PASSWORD",
                token: token,
                password: password
            }
        )
    }

    handleChange(event: any): void {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        switch (name) {
            case 'password': {
                this.setState({ password: value })
                break;
            }
            default: {
                break;
            }
        }
    }

    render() {
        return (
            <Container className="Login">
                <h2>Reset your password</h2>
                <Form>
                    <Col>
                        <FormGroup>
                            <Label for="loginPassword">New password</Label>
                            <Input type="password" name="password"
                                id="loginPassword" placeholder="password" onChange={this.handleChange.bind(this)} />
                        </FormGroup>
                    </Col>
                    <Button type="submit" onClick={this.handleSubmit.bind(this)}>Reset password</Button>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = (state: PropsFromState): OwnProps => ({
})

export default connect(mapStateToProps)(ResetPassword);