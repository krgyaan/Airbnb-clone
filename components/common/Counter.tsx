"use client";

import React, { useState } from "react";
import AnimatedNumbers from "react-animated-numbers";

export default function Counter() {
    // const [show, setShow] = useState<boolean>(false);

    // useEffect(() => {
    //     setShow(true);
    // }, []);
    const [num, setNum] = useState(331231);
    return (
        <>
            <AnimatedNumbers
                animateToNumber={num}
                fontStyle={{ fontSize: 32 }}
                configs={(number, index) => {
                    return { mass: 1, tension: 230 * (index + 1), friction: 140 };
                }}
            ></AnimatedNumbers>

        </>
    );
}