import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const PhoneNumber = ({
    value,
    handleChange,
    hashHandleChange,
    setNextStep,
}) => {
    const Continue = () => {
        setNextStep();
        fetch("http://localhost:5000/sendOTP", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: value.phone }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const hash = data.hash;
                hashHandleChange(hash);
            });
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    return (
        <div>
            <Form onSubmit={handleSubmit(Continue)} className="login-form">
                <Form.Group>
                    <Form.Label>Your Phone Number</Form.Label>
                    <Form.Control
                        {...register("phone", {
                            required: true,
                        })}
                        type="tel"
                        placeholder="**************"
                        value={value.phone}
                        onChange={handleChange(`phone`)}
                    />
                    {errors.phone && (
                        <span className="error">This field is required</span>
                    )}
                </Form.Group>
                <Button type="submit" className="">
                    Send OTP
                </Button>
            </Form>
        </div>
    );
};

export default PhoneNumber;
