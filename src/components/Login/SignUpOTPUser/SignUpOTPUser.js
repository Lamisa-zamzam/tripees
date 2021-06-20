// React
import { useEffect, useState } from "react";
// React Bootstrap
import { Button, Container, Form } from "react-bootstrap";
// React Hook form
import { useForm } from "react-hook-form";
// Router
import { useHistory, useLocation } from "react-router-dom";
// CSS
import "../Login/Login.css";

const SignUpOTPUser = () => {
    const phone = localStorage.getItem("phone");
    // Error state
    const [err, setErr] = useState("");
    // React Hook form variables
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Routing Variables
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/dashboard" } };

    const onSubmit = async (data) => {
        const userData = { ...data, phone, password: "" };
        // Send data to save into DB
        fetch("https://stormy-cliffs-33775.herokuapp.com/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
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
                    // Save token in local storage
                    localStorage.setItem("authToken", data.token);
                    // Redirect user in the requested route
                    history.replace(from);
                }
            });
    };

    // If the user already exists in DB, he/she will not see this page
    // We show it to users to get their username
    useEffect(() => {
        fetch("https://stormy-cliffs-33775.herokuapp.com/checkPhone", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.msg === "user found") {
                    fetch(
                        "https://stormy-cliffs-33775.herokuapp.com/api/auth/login",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ phone }),
                        }
                    )
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
                }
            });
    }, [phone, history, from]);

    return (
        <div className="login-page">
            <Container className="">
                <div className="">
                    <h4 className="">
                        Please provide some information so that we can work
                        better for you
                    </h4>

                    <br />
                    <br />
                    {err && <span className="error">{err}</span>}
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        className="login-form"
                    >
                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                {...register("username", {
                                    required: true,
                                })}
                                type="text"
                                placeholder="Enter Your Name"
                            />
                            {errors.username && (
                                <span className="error">
                                    This field is required
                                </span>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email (optional)</Form.Label>
                            <Form.Control
                                {...register("email", {
                                    pattern:
                                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                })}
                                type="email"
                                placeholder="e.g. johndoe@gmail.com"
                            />
                            {errors.username && (
                                <span className="error">
                                    Please provide a valid e-mail
                                </span>
                            )}
                        </Form.Group>
                        <Button type="submit" className="submit-button">
                            Register
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default SignUpOTPUser;
