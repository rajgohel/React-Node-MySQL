import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { InputText } from '../../components/input';
import ManagerService from '../../services/managerService';

const inputs = [{
    "type": "text",
    "title": "First Name",
    "name": "firstName",
    "class": "text",
    "placeholder": "Enter first name"
},
{
    "type": "text",
    "title": "Last Name",
    "name": "lastName",
    "class": "text",
    "placeholder": "Enter last name"
},
{
    "type": "text",
    "title": "Email",
    "name": "email",
    "class": "text",
    "placeholder": "Enter email"
},
{
    "type": "password",
    "title": "Password",
    "name": "password",
    "class": "text",
    "placeholder": "Password"
},
{
    "type": "text",
    "title": "Address",
    "name": "address",
    "class": "text",
    "placeholder": "Address"
},
{
    "type": "date",
    "title": "Date Of Birth",
    "name": "dob",
    "class": "text",
    "placeholder": "Date Of Birth"
},
{
    "type": "text",
    "title": "Company",
    "name": "company",
    "class": "text",
    "placeholder": "Company "
}
];

const SignUp = () => {

    const [inputState, setInputState] = useState(inputs.reduce((acc, input) => {
        return { ...acc, [input.name]: '' };
    }, {}));
    let navigate = useNavigate();

    const onChange = (name, value) => {
        setInputState((inputField) => ({ ...inputField, [name]: value }));
    }
    const handleSignIn = (e) => {
        ManagerService.signUp(inputState)
            .then((res) => {
                e.stopPropagation();
                navigate("/signIn", { replace: true });
            })
            .catch(e => {
                console.log(e);
            });
    }

    const list = inputs.map(input => {
        return (
            <InputText
                value={inputState[input.name]}
                key={input.name}
                type={input.type}
                name={input.name}
                title={input.title}
                className={input.class}
                placeholder={input.placeholder}
                onChange={onChange}
            />
        );
    });

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem" }}>
            <h2>Sign Up</h2>
            <Card style={{ width: "40%", padding: "2rem" }} >
                <Form >
                    {list}
                    <Button variant="primary" type="button" onClick={handleSignIn}>
                        Sign Up
                    </Button>
                </Form>
            </Card>
        </div>
    );
}

export default SignUp;