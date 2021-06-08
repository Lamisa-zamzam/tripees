import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CoHomesLogo from "../../../images/CoHomesLogo.jpeg";
import "./Login.css";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    return (
        <div className="login-page">
            <Container className="login-container">
                <div className="login-container-div">
                    <Row>
                        <Col md={7}>
                            <img src={CoHomesLogo} alt="" className="logo"/>
                            <h1 className="login-heading">
                                <span className="underlineText">Let's</span>{" "}
                                <br />
                                <span className="underlineText">travel </span>
                                <span className="underlineText">with </span>
                                <span className="underlineText">us</span>
                            </h1>
                        </Col>
                        <Col className="form-column" md={5}>
                            <h4 className="underlineHeading">Sign Up</h4>
                            <FontAwesomeIcon icon={faTimes} size="1x" />
                            <br />
                            <br />
                            <Form
                                onSubmit={handleSubmit(onSubmit)}
                                className="login-form"
                            >
                                <Form.Group>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Your Name"
                                        {...register("name", {
                                            required: true,
                                        })}
                                    />
                                    {errors.name && (
                                        <span className="error">
                                            This field is required
                                        </span>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="e.g. johndoe@gmail.com"
                                        {...register("email", {
                                            required: true,
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
                                        {...register("password")}
                                    />
                                    {errors.password && (
                                        <span className="error">
                                            This field is required
                                        </span>
                                    )}
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Your Password"
                                        {...register("confirmPass")}
                                    />
                                    {errors.confirmPass && (
                                        <span className="error">
                                            This field is required
                                        </span>
                                    )}
                                </Form.Group>
                                <Button type="submit" className="submit-button">
                                    Register
                                </Button>
                                <div className="accountDiv">
                                    <p>
                                        Already have an account?{" "}
                                        <Link className="react-link">
                                            Login
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
