import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';


interface PropsFromDispatch {
  [key: string]: any,
};

interface myState {
    username: string,
    password: string,
    realm?: string,
}
class Login extends React.Component<PropsFromDispatch, myState> {
    constructor(props: any){
        super(props);
        this.state = { 
            username: '',
            password: '',
            realm: 'ritas house'
        };
    }


    handleSubmit(event: any) : void {
        event.preventDefault();
        console.log('submit');
        console.dir(this.state);
        let username = this.state.username;
        
        let password = this.state.password;
        this.props.dispatch(
            {
                type: "@@user/LOGIN",
                username: username,
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
        }
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="loginText">Username</Label>
                    <Input name="username" id="username" onChange={this.handleChange.bind(this)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="loginPassword">Password</Label>
                    <Input type="password" name="password"
                        id="loginPassword" placeholder="password" onChange={this.handleChange.bind(this)}/>
                </FormGroup>
                <Button type="submit" onClick={this.handleSubmit.bind(this)}>Log in</Button>
            </Form>
        );
    }
}

export default connect()(Login);