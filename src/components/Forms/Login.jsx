import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import app from '../../firebase/firebase.init';

const auth = getAuth(app);

const Login = () => {


    const [loginSuccess, setLoginSuccess] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const loginHandaler = event => {
        event.preventDefault();
        const getValue = event.target;
        const email = getValue.email.value;
        const password = getValue.password.value;
        setLoginSuccess(false);

        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log(user);
                setLoginSuccess(true);
                getValue.reset();
                toast.success("Sucessfuly Login", { autoClose: 1500 });
            })
            .catch(error => {
                console.error('error', error);
            })
    }

    // Find the email to reset 
    const blurEmail = event => {
        const getEmail = event.target.value;
        setResetEmail(getEmail);
    }
    // Forget password 
    const forgetPassword = () => {
        if(!resetEmail) {
            toast.info("Please write your email", {autoClose: 2000});
            return;
        }
        sendPasswordResetEmail(auth, resetEmail)
            .then(() => {
                toast.info("A mail is sent you your email", { autoClose: 1500 });
            })
            .catch((error) => {
                console.error('error', error);
            });
    }

    return (
        <div className='w-50 mx-auto'>
            <h2 className='text-center text-primary mb-4'>Please Login Your Account</h2>
            <Form onSubmit={loginHandaler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={blurEmail} name="email" type="email" placeholder="Enter Your email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Your Password" />
                </Form.Group>
                {loginSuccess && <p className='text-success'>Yeah!!!! Login Sucessfully.</p>}
                <Button variant="primary" type="submit">
                    Log in
                </Button>
            </Form>
            <p><small>Have not Account? Please <Link to='/forms'>Register</Link></small></p>
            <p>Forget password? <Link onClick={forgetPassword} className='btn btn-link'>Reset Password</Link></p>
        </div>
    );
};

export default Login;