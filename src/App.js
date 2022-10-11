import React, { useEffect, useState } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
    const [fromCur, setFromCur] = useState("RUB");
    const [toCur, setToCur] = useState("USD");
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(1);

    const [rates, setRates] = useState({});

    useEffect(() => {
        fetch("https://cdn.cur.su/api/latest.json")
            .then((response) => response.json())
            .then((json) => {
                setRates(() => json.rates);
            })
            .catch((err) => {
                console.log(err, "Ошибка");
            });
    }, []);

    const onChangeFrom = (value) => {
        const price = value / rates[fromCur];
        const result = price * rates[toCur];
        setToValue(result.toFixed(2));
        setFromValue(value);
    };
    const onChangeTo = (value) => {
        const price = value / rates[toCur];
        const result = price * rates[fromCur];
        setFromValue(result.toFixed(2));
        setToValue(value);
    };
    const onEnter = (event) => {
        if (event.key === "Enter") event.target.blur();
    };

    useEffect(() => {
        onChangeFrom(fromValue);
    }, [fromCur]);

    useEffect(() => {
        onChangeTo(toValue);
    }, [toCur]);

    useEffect(() => {
        onChangeTo("1");
    }, [rates]);

    return (
        <div className="App">
            <Block
                value={fromValue}
                currency={fromCur}
                onChangeCurrency={setFromCur}
                onChangeValue={onChangeFrom}
                onKeyPress={onEnter}
            />
            <Block
                value={toValue}
                currency={toCur}
                onChangeCurrency={setToCur}
                onChangeValue={onChangeTo}
            />
        </div>
    );
}

export default App;
