import React, { useEffect, useState } from "react";

const Home = () => {
    const [hotels, setHotels] = useState(null);
    useEffect(() => {
        fetch(
            "https://api.tektravels.com/BookingEngineService_Hotel/hotelservice.svc/rest/GetHotelInfo",
            {
                method: "POST",
                headers: {
                    EndUserIp: "192.168.10.117",
                    TokenId: "f7759827-87d0-4ee0-9166-29bc99ec0590",
                    TraceId: "da0d3038-d448-4ac9-98b7-adb7fb6fe354",
                    ResultIndex: 28,
                    HotelCode: "HOL9|DXB",
                    CategoryId: "2###HOL9|DXB",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => console.log(data));
    }, []);
    return (
        <div>
            <h1>This is home</h1>
            <div>{hotels}</div>
        </div>
    );
};

export default Home;
