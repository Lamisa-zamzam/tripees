// React
import { useState, useEffect } from "react";
// React Bootstrap
import { Button, Col, Container, Form, Row } from "react-bootstrap";
// React Hook form
import { useForm } from "react-hook-form";
// Router
import { Link, useHistory, useLocation } from "react-router-dom";
// CSS
import "./Login.css";
// Font Awesome
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import OTPForm from "../OTPForm/OTPForm";
import auth from "../../../auth";

const Login = () => {
    // Error State
    const [err, setErr] = useState("");

    // Routing vars
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/dashboard" } };

    // If the user is already logged in, doesn't make sense to show him/her the login page again
    useEffect(() => {
        if (localStorage.getItem("authToken") || auth.isAuthenticated()) {
            history.replace(from);
        }
    }, [history, from]);
    // React Hook form vars
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    // Handle submit
    const onSubmit = async (data) => {
        // Send request to get JWT token
        fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success === false) {
                    // Set error
                    setErr(data.error);
                    // Empty the error after 5 seconds
                    setTimeout(() => {
                        setErr("");
                    }, 5000);
                } else {
                    // Save token in the local storage
                    localStorage.setItem("authToken", data.token);
                    // Redirect user in the requested route
                    history.replace(from);
                }
            });
    };
    return (
        <div className="login-page">
            <Container className="login-container">
                <div className="login-container-div">
                    <Row>
                        <Col md={7}>
                            <h1 className="login-heading">
                                <span className="underlineText">Let's</span>{" "}
                                <br />
                                <span className="underlineText">travel </span>
                                <span className="underlineText">with </span>
                                <span className="underlineText">us</span>
                            </h1>
                        </Col>
                        <Col className="form-column" md={5}>
                            <h4 className="underlineHeading">Sign In</h4>
                            <FontAwesomeIcon icon={faTimes} size="1x" />
                            <br />
                            <br />
                            {err && <span className="error">{err}</span>}
                            <OTPForm />
                            <Form
                                onSubmit={handleSubmit(onSubmit)}
                                className="login-form"
                            >
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="e.g. johndoe@gmail.com"
                                        {...register("email", {
                                            required: true,
                                            pattern:
                                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        })}
                                    />
                                    {errors.price && (
                                        <span className="error">
                                            This field is required
                                        </span>
                                    )}
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Your Password"
                                        {...register("password", {
                                            required: true,
                                            pattern:
                                                /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,20}$/,
                                        })}
                                    />
                                    {errors.password && (
                                        <span className="error">
                                            This field is required
                                        </span>
                                    )}
                                </Form.Group>
                                <Button type="submit" className="submit-button">
                                    Login
                                </Button>
                                <div className="accountDiv">
                                    <p>
                                        Don't have an account?{" "}
                                        <Link
                                            className="react-link"
                                            to="/register"
                                        >
                                            Sign Up
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default Login;
