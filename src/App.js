import { useState, useEffect, useReducer } from "react";
import "./index.scss";
import { eyeHandler, handleVerify } from "./imports";
import { reducer } from "./imports";

const DEFAULT_INPUTS = { email: "", name: "", pass: "", passRepeat: "" };
const DEFAULT_VERIFIED = {
    email: null,
    name: null,
    pass: null,
    passRepeat: null,
};

const initialState = {
    values: DEFAULT_INPUTS,
    verified: DEFAULT_VERIFIED,
};

function App() {
    const [eyeActive, setEyeActive] = useState(false);
    const [formState, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        //ОСТАВЬ РЕТЕРН ЯВНЫМ
        return eyeHandler(setEyeActive);
    }, []);

    return (
        <div className="App">
            <div className="banner">
                <div className="banner__inner">
                    <img src="/chat.png" />
                    <h2>Общайся с друзьями</h2>
                    <p>
                        Быстрый и удобный чат для общения с друзьями или
                        коолегами по работе
                    </p>
                </div>
            </div>
            <div className="form">
                <div className="form__content">
                    <h2>Регистрация</h2>
                    <p>
                        Для того, чтобы войти в чат, необходимо произвести
                        авторизоваться
                    </p>
                    <div
                        className={`form__field ${
                            formState.verified.email === false
                                ? "error"
                                : formState.verified.email === true
                                ? "valid"
                                : ""
                        }`}
                    >
                        <input
                            type="text"
                            name="email"
                            spellCheck={false}
                            placeholder="E-Mail"
                            value={formState.email}
                            onChange={(event) =>
                                dispatch({
                                    dataType: "email",
                                    value: event.target.value,
                                })
                            }
                        />
                        <svg
                            className={`check ${
                                formState.verified.email ? "green" : ""
                            }`}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm5.707,8.707-7,7a1,1,0,0,1-1.414,0l-3-3a1,1,0,0,1,1.414-1.414L10,14.586l6.293-6.293a1,1,0,0,1,1.414,1.414Z" />
                        </svg>
                        {formState.verified.email === false && (
                            <span>Неверный формат почты</span>
                        )}
                    </div>
                    <div
                        className={`form__field ${
                            formState.verified.name === false
                                ? "error"
                                : formState.verified.name === true
                                ? "valid"
                                : ""
                        }`}
                    >
                        <input
                            type="text"
                            name="fullName"
                            value={formState.name}
                            onChange={(event) =>
                                dispatch({
                                    dataType: "name",
                                    value: event.target.value,
                                })
                            }
                            // spellCheck={false}
                            placeholder="Полное имя"
                        />
                        {formState.verified.name === false && (
                            <span>Укажите полное имя</span>
                        )}
                    </div>
                    <div
                        className={`form__field ${
                            formState.verified.pass === false
                                ? "error"
                                : formState.verified.pass === true
                                ? "valid"
                                : ""
                        }`}
                    >
                        <input
                            type={!eyeActive ? "password" : "text"}
                            name="password"
                            placeholder="Пароль"
                            value={formState.pass}
                            onChange={(event) =>
                                dispatch({
                                    dataType: "pass",
                                    value: event.target.value,
                                })
                            }
                        />
                        <svg
                            className={`eye ${eyeActive ? "active" : ""}`}
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                        >
                            <path d="M21.821,12.43c-0.083-0.119-2.062-2.944-4.793-4.875C15.612,6.552,13.826,6,12,6c-1.825,0-3.611,0.552-5.03,1.555  c-2.731,1.931-4.708,4.756-4.791,4.875c-0.238,0.343-0.238,0.798,0,1.141c0.083,0.119,2.06,2.944,4.791,4.875  C8.389,19.448,10.175,20,12,20c1.826,0,3.612-0.552,5.028-1.555c2.731-1.931,4.71-4.756,4.793-4.875  C22.06,13.228,22.06,12.772,21.821,12.43z M12,16.5c-1.934,0-3.5-1.57-3.5-3.5c0-1.934,1.566-3.5,3.5-3.5c1.93,0,3.5,1.566,3.5,3.5  C15.5,14.93,13.93,16.5,12,16.5z" />
                            <g>
                                <path d="M14,13c0,1.102-0.898,2-2,2c-1.105,0-2-0.898-2-2c0-1.105,0.895-2,2-2C13.102,11,14,11.895,14,13z" />
                            </g>
                        </svg>
                        {formState.verified.pass === false && (
                            <span>Неверный формат пароля</span>
                        )}
                    </div>
                    <div
                        className={`form__field ${
                            formState.verified.passRepeat === false
                                ? "error"
                                : formState.verified.passRepeat === true
                                ? "valid"
                                : ""
                        }`}
                    >
                        <input
                            type={!eyeActive ? "password" : "text"}
                            name="password"
                            placeholder="Пароль"
                            value={formState.passRepeat}
                            onChange={(event) =>
                                dispatch({
                                    dataType: "passRepeat",
                                    value: event.target.value,
                                })
                            }
                        />
                        <svg
                            className={`eye ${eyeActive ? "active" : ""}`}
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                        >
                            <path d="M21.821,12.43c-0.083-0.119-2.062-2.944-4.793-4.875C15.612,6.552,13.826,6,12,6c-1.825,0-3.611,0.552-5.03,1.555  c-2.731,1.931-4.708,4.756-4.791,4.875c-0.238,0.343-0.238,0.798,0,1.141c0.083,0.119,2.06,2.944,4.791,4.875  C8.389,19.448,10.175,20,12,20c1.826,0,3.612-0.552,5.028-1.555c2.731-1.931,4.71-4.756,4.793-4.875  C22.06,13.228,22.06,12.772,21.821,12.43z M12,16.5c-1.934,0-3.5-1.57-3.5-3.5c0-1.934,1.566-3.5,3.5-3.5c1.93,0,3.5,1.566,3.5,3.5  C15.5,14.93,13.93,16.5,12,16.5z" />
                            <g>
                                <path d="M14,13c0,1.102-0.898,2-2,2c-1.105,0-2-0.898-2-2c0-1.105,0.895-2,2-2C13.102,11,14,11.895,14,13z" />
                            </g>
                        </svg>
                        {formState.verified.passRepeat === false && (
                            <span>Пароли не совпадают</span>
                        )}
                    </div>
                    <div className="form__additional">
                        <div>
                            <input
                                className="styled-checkbox"
                                id="checkbox"
                                type="checkbox"
                                value="value1"
                            />
                            <label htmlFor="checkbox">Запомнить</label>
                        </div>
                        <a>Забыл пароль?</a>
                    </div>

                    <button
                        disabled={
                            Object.values(formState.verified).every(
                                (el) => el === true
                            )
                                ? false
                                : true
                        }
                    >
                        Войти
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
