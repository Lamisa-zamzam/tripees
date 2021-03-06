import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

const OTPVerify = ({
    value,
    handleChange,
    hashHandleChange,
    setNextStep,
    setPrevStep,
}) => {
    // Routing Variables
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/dashboard" } };
    const [err, setErr] = useState("");
    const phone = localStorage.getItem("phone");
    const ConfirmOTP = () => {
        const data = {
            phone: phone,
            hash: value.hash,
            otp: value.otp,
        };
        axios
            .post("https://stormy-cliffs-33775.herokuapp.com/verifyOTP", data)
            .then((res) => {
                if (res.data.msg === "device verified") {
                    history.replace("/signUpOTPUser");
                }
            })
            .catch((error) => {
                // Set error
                // setErr(error.response.data.msg);
                console.log(error);
            });
    };
    const Back = () => {
        setPrevStep();
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    return (
        <div>
            {err && <span className="error">{err}</span>}
            <Form onSubmit={handleSubmit(ConfirmOTP)} className="login-form">
                <Form.Group>
                    <Form.Label>Your OTP</Form.Label>
                    <Form.Control
                        {...register("otp", {
                            required: true,
                        })}
                        type="number"
                        placeholder="******"
                        value={value.otp}
                        onChange={handleChange(`otp`)}
                    />
                    {errors.phone && (
                        <span className="error">This field is required</span>
                    )}
                </Form.Group>
                <Button onClick={Back} className="submit-button">
                    Back
                </Button>
                <Button type="submit" className="submit-button">
                    Verify
                </Button>
            </Form>
        </div>
    );
};

export default OTPVerify;
