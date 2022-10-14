import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import app from '../../firebase/firebase.init';

const auth = getAuth(app);

const Forms = () => {
    const [passValidate, setPassValidate] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false)
    const submitHandaler = event => {
        event.preventDefault();
        const name = event.target.name.valu;
        const email = event.target.email.value;
        const password = event.target.password.value;
        setLoginSuccess(false);

        // Password Validation 
        if (!/(?=.*[a-z])/.test(password)) {
            setPassValidate('Please provide at least one lowercase character');
            return;
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            setPassValidate('Please provide at least one uppercase character');
            return;
        }
        if (!/[0-9]/.test(password)) {
            setPassValidate('Please provide at least one Number');
            return;
        }
        if (!/[~!@#$%^&* ]/.test(password)) {
            setPassValidate('Please provide at least one special character');
            return;
        }
        if (password.length < 6) {
            setPassValidate('Please provide at least 6 special character');
            return;
        }
        setPassValidate('')
        // End Password Validation
        createUserWithEmailAndPassword(auth, email, password)
            .then(reasult => {
                const user = reasult.user;
                console.log(user);
                setLoginSuccess(true);
                event.target.reset();
                updateName(name);
            })
            .catch(error => {
                console.error('error', error);
                setPassValidate("Email is Already exist");
            })
    }

    // Verify user email:
    sendEmailVerification(auth.currentUser)
        .then(() => {
            toast.info("A eMail is sent to your account. Please Verify", { autoClose: 2000 })
        });

    // Update UserName:
    const updateName = name => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
        .then(() => {
            console.log("Display name updated");
        })
        .catch((error) => {
            console.error('error', error)
        });          
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>User Registration</h2>
            <Form onSubmit={submitHandaler}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control name='name' type="text" placeholder="Your Name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" required />
                </Form.Group>
                <p className="text-danger">{passValidate}</p>
                {loginSuccess && <p className='text-success'>You are one step away. Please verify your account</p>}
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <small>Have an Account? Please <Link to='/login'>Log In</Link></small>
        </div>
    );
};

export default Forms;