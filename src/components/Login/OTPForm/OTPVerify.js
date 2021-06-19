import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

const OTPVerify = ({
    value,
    handleChange,
    hashHandleChange,
    setNextStep,
    setPrevStep,
}) => {
    axios.defaults.withCredentials = true;
    const ConfirmOTP = () => {
        const data = {
            phone: value.phone,
            hash: value.hash,
            otp: value.otp,
        };
        setNextStep();
        axios
            .post("http://localhost:5000/verifyOTP", data)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error.response.data);
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
            <Form onSubmit={handleSubmit(ConfirmOTP)} className="login-form">
                <Form.Group>
                    <Form.Label>Your OTP</Form.Label>
                    <Form.Control
                        {...register("phone", {
                            required: true,
                        })}
                        type="tel"
                        placeholder="*****"
                        value={value.otp}
                        onChange={handleChange(`otp`)}
                    />
                    {errors.phone && (
                        <span className="error">This field is required</span>
                    )}
                </Form.Group>
                <Button onClick={Back}>Back</Button>
                <Button type="submit" className="">
                    Verify
                </Button>
            </Form>
        </div>
    );
};

export default OTPVerify;
