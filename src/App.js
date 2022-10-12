import React, { useState, useEffect } from "react";
import "./index.scss";

const MINIMAL_LENGTH = 8;
const MAXIMAL_LENGTH = 18;
const PASSWORD_CHARS = {
    numbers: "1234567890",
    lowerCase: "abcdefghijklmnopqrstuvwxyz",
    upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    symbols: "~`!@#$%^&*()_-+={[}]|:;\"'<,>.?/",
};
const DEFAULT_CHECKBOXES = {
    lowerCase: true,
    upperCase: false,
    symbols: false,
    numbers: true,
};

function App() {
    const [password, setPassword] = useState("");
    const [passLength, setPassLength] = useState(MINIMAL_LENGTH);
    const [checkBoxes, setCheckboxes] = useState(DEFAULT_CHECKBOXES);
    const [stateCopied, setCopied] = useState(false);

    const onClickPassword = (event, password) => {
        navigator.clipboard.writeText(password);
        setCopied(true);
    };
    const onChangeLength = (value) => {
        if (value >= MINIMAL_LENGTH) setPassLength(value);
    };
    const onChangeCheckBox = (event) => {
        const target = event.target.id;
        setCheckboxes((prev) => {
            return { ...prev, [target]: !prev[target] };
        });
        // console.log(checkBoxes);
    };

    const generatePassowrd = (length, options, chars) => {
        let computedCharset = "";
        for (let key in options) {
            if (options[key]) computedCharset += chars[key];
        }
        let result = "";

        for (let i = 0; i < length; i++) {
            result +=
                computedCharset[
                    Math.floor(Math.random() * computedCharset.length)
                ];
        }
        setPassword(result);
        // console.log(computedCharset);
    };
    useEffect(() => {
        generatePassowrd(passLength, checkBoxes, PASSWORD_CHARS);
    }, []);
    return (
        <div className="App noselect">
            <span className="subtitle">Password:</span>
            <h2
                className={`password noselect ${stateCopied ? "copied" : ""}`}
                onClick={(event) => onClickPassword(event, password)}
                onAnimationEnd={() => setCopied(false)}
            >
                {password}
            </h2>
            <div className="row">
                <span>Pass length:</span>
                <span className="pass-length">
                    {passLength}
                    <input
                        type="range"
                        step={1}
                        min={MINIMAL_LENGTH}
                        max={MAXIMAL_LENGTH}
                        onChange={(event) => onChangeLength(event.target.value)}
                        value={passLength}
                    />
                </span>
            </div>
            <div className="row">
                <span>Uppercase chars:</span>
                <input
                    disabled={checkBoxes.lowerCase ? false : true}
                    className={`styled-checkbox ${
                        checkBoxes.lowerCase ? "" : "disabled"
                    }`}
                    onChange={onChangeCheckBox}
                    id="upperCase"
                    type="checkbox"
                    checked={checkBoxes.upperCase}
                />
                <label htmlFor="upperCase" />
            </div>
            <div className="row">
                <span>Lowercase chars:</span>
                <input
                    disabled={checkBoxes.upperCase ? false : true}
                    className={`styled-checkbox ${
                        checkBoxes.upperCase ? "" : "disabled"
                    }`}
                    onChange={onChangeCheckBox}
                    id="lowerCase"
                    type="checkbox"
                    checked={checkBoxes.lowerCase}
                />
                <label htmlFor="lowerCase" />
            </div>
            <div className="row">
                <span>Numbers:</span>
                <input
                    checked={checkBoxes.numbers}
                    onChange={onChangeCheckBox}
                    className="styled-checkbox"
                    id="numbers"
                    type="checkbox"
                />
                <label htmlFor="numbers" />
            </div>
            <div className="row">
                <span>Symbols:</span>
                <input
                    checked={checkBoxes.symbols}
                    onChange={onChangeCheckBox}
                    className="styled-checkbox"
                    id="symbols"
                    type="checkbox"
                />
                <label htmlFor="symbols" />
            </div>
            <button
                onClick={() =>
                    generatePassowrd(passLength, checkBoxes, PASSWORD_CHARS)
                }
            >
                Generate
            </button>
        </div>
    );
}

export default App;
