import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';


interface PropsFromDispatch {
  [key: string]: any,
};

interface myState {
    username: string,
    password: string,
    email?: string,
    realm?: string,
}
class Signup extends React.Component<PropsFromDispatch, myState> {
    constructor(props: any){
        super(props);
        this.state = { 
            username: '',
            password: '',
            email: '',
            realm: 'ritas house'
        };
    }


    handleSubmit(event: any) : void {
        event.preventDefault();
        console.log('submit');
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
        switch (name) {
            case 'username': {
                this.setState({username: value})
            }
            case 'password': {
                this.setState({password: value})
            }
            case 'email': {
                this.setState({email: value})
            }
            case 'realm': {
                this.setState({realm: value})
            }
        }
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="signupText">Username</Label>
                    <Input name="username" id="username" onChange={this.handleChange.bind(this)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="signupEmail">Email</Label>
                    <Input type="email" name="email"
                        id="signupEmail" placeholder="with a placeholder" onChange={this.handleChange.bind(this)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="signupPassword">Password</Label>
                    <Input type="password" name="password"
                        id="signupPassword" placeholder="password" onChange={this.handleChange.bind(this)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="signupRealm">Party realm:</Label>
                    <Input type="select" name="realm"
                        id="signupRealm" onChange={this.handleChange.bind(this)}>
                        <option>Ritas house</option>
                    </Input>
                </FormGroup>

                <Button type="submit" onClick={this.handleSubmit.bind(this)}>Sign up</Button>
            </Form>
        );
    }
}

export default connect()(Signup);