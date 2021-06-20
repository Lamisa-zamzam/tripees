import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const PhoneNumber = ({
    value,
    handleChange,
    hashHandleChange,
    setNextStep,
    setPrevStep,
}) => {
    const [phoneNum, setPhoneNum] = useState();
    const [err, setErr] = useState("");
    const Continue = () => {
        if (!phoneNum) {
            setErr("Please provide your phone number");
        } else {
            fetch("https://stormy-cliffs-33775.herokuapp.com/sendOTP", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: phoneNum }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setErr("");
                    setNextStep();
                    const hash = data.hash;
                    hashHandleChange(hash);
                })
                .catch((error) => {
                    // Set error
                    setErr(error);
                    setTimeout(() => {
                        setErr("");
                    }, 5000);
                });
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    return (
        <div>
            {err && <span className="error">{err}</span>}
            <Form onSubmit={handleSubmit(Continue)} className="login-form">
                <Form.Group>
                    <Form.Label>Your Phone Number</Form.Label>
                    {/* <Form.Control
                        {...register("phone", {
                            required: true,
                            pattern:
                                /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g,
                        })}
                        type="tel"
                        placeholder="**************"
                        value={value.phone}
                        onChange={handleChange(`phone`)}
                    /> */}
                    <PhoneInput
                        placeholder="Enter phone number"
                        value={phoneNum}
                        onChange={setPhoneNum}
                        // {...register("phone", {
                        //     required: true,
                        //     pattern:
                        //         /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g,
                        // })}
                    />
                    {errors.phone && (
                        <span className="error">
                            This field is required and must be valid
                        </span>
                    )}
                </Form.Group>
                <Button type="submit" className="submit-button">
                    Send OTP
                </Button>
            </Form>
        </div>
    );
};

export default PhoneNumber;
