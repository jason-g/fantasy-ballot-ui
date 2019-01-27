import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import Container from 'reactstrap/lib/Container';
import { Link } from 'react-router-dom';
import { UserState } from '../store/user/types';
import Alert from 'reactstrap/lib/Alert';


interface PropsFromDispatch {
  [key: string]: any,
};
interface myState {
    username: string,
    password: string,
    email?: string,
    realm?: string,
    user: UserState,
}
interface PropsFromState {
  user: UserState,
};
interface OwnProps {
}
type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

class Signup extends React.Component<AllProps, myState> {
    constructor(props: any){
        super(props);
        this.state = { 
            username: '',
            password: '',
            email: '',
            realm: 'ritas house',
            user: this.props.user,
        };
    }


    handleSubmit(event: any) : void {
        event.preventDefault();
        console.log('signup:');
        console.dir(this.state);
        let username = this.state.username;
        let password = this.state.password;
        let email = this.state.email;
        let realm = this.state.realm;
        this.props.dispatch(
            {
                type: "@@user/SIGNUP",
                username: username,
                email: email,
                realm: realm,
                password: password
            }
        )
    }
    handleChange(event: any): void {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        console.log('nae:'+ name);
        switch (name) {
            case 'username': {
                this.setState({username: value})
                break;
            }
            case 'password': {
                this.setState({password: value})
                break;
            }
            case 'email': {
                this.setState({email: value})
                break;
            }
            case 'realm': {
                this.setState({realm: value})
                break;
            }
            default: {
                break;
            }
        }
    }

    
    showMessage() {
        console.log('Show Message');
        console.dir(this.props)
        if (!this.props.user) {
            return;
        }
        console.dir(this.props.user.message);
        if (this.props.user.message && this.props.user.message.error ) {
            return (
                <Alert color="danger">
                    Signup error, check for errors below.
                </Alert>
            )
        }
    }

    render() {
        return (
            <Container className="Signup">
                <h2>Sign up</h2>
                {this.showMessage()}
                <Form>
                    <FormGroup>
                        <Label for="signupText">Username</Label>
                        <Input name="username" id="username" onChange={this.handleChange.bind(this)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="signupEmail">Email</Label>
                        <Input type="email" name="email"
                            id="signupEmail" placeholder="email address" onChange={this.handleChange.bind(this)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="signupPassword">Password</Label>
                        <Input type="password" name="password"
                            id="signupPassword" placeholder="password" onChange={this.handleChange.bind(this)} />
                    </FormGroup>
                    <Button type="submit" onClick={this.handleSubmit.bind(this)}>Sign up</Button>
                </Form>
                Already have an account?  <Link to="/login">Login</Link>
            </Container>
        );
    }
}
                    /*
                    <FormGroup>
                        <Label for="signupRealm">Party realm:</Label>
                        <Input type="select" name="realm"
                            id="signupRealm" onChange={this.handleChange.bind(this)}>
                            <option>Ritas house</option>
                        </Input>
                    </FormGroup>
                    */

const mapStateToProps = (state: PropsFromState): OwnProps => ({
  user: state.user,
})

export default connect(mapStateToProps)(Signup);