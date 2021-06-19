import React, { useState } from "react";
import OTPVerify from "./OTPVerify";
import PhoneNumber from "./PhoneNumber";

const OTPForm = () => {
    const [userInfo, setUserInfo] = useState({
        phone: "",
        hash: "",
        otp: "",
    });

    const [step, setStep] = useState(1);

    const handleChange = (input) => (e) => {
        setUserInfo({ ...userInfo, [input]: e.target.value });
    };

    const hashHandleChange = (hash) => {
        setUserInfo({ ...userInfo, hash: hash });
    };

    const setNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const setPrevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const { phone, hash, otp } = userInfo;

    const value = { phone, hash, otp };

    switch (step) {
        case 1:
            return (
                <PhoneNumber
                    setNextStep={setNextStep}
                    hashHandleChange={hashHandleChange}
                    handleChange={handleChange}
                    value={value}
                />
            );
        case 2:
            return (
                <OTPVerify
                    setNextStep={setNextStep}
                    hashHandleChange={hashHandleChange}
                    handleChange={handleChange}
                    value={value}
                    setPrevStep={setPrevStep}
                />
            );
        default:
            return;
    }
};

export default OTPForm;
