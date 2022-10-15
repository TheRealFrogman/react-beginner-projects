export const eyeHandler = (setEyeActive) => {
    let eyes = document.querySelectorAll(".eye");
    const handleDown = (event) => {
        setEyeActive(true);
    };
    const handleUp = (event) => {
        setEyeActive(false);
    };

    eyes.forEach((element) => {
        element.addEventListener("mouseup", handleUp);
        element.addEventListener("mousedown", handleDown);
    });

    return () => {
        eyes.forEach((element) => {
            element.removeEventListener("mousedown", handleDown);
            element.addEventListener("mousedown", handleDown);
        });
    };
};

export const handleVerify = (function () {
    let timeout;
    function verifyEmail(email) {
        const regexp =
            /^(([^<>()\[\]\\    .,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email) return regexp.test(email);
    }
    function verifyName(name) {
        const regexp = /\w{2,}/;
        if (name) return regexp.test(name);
    }
    function verifyPass(password) {
        const regex = /^\w{6,}$/;
        if (password) return regex.test(password);
    }
    function verifyPassRepeat({ first, second }) {
        if (first && second) return first === second;
    }
    return (type, inputValue) => {
        let fn;
        switch (type) {
            case "email":
                fn = verifyEmail;
                break;
            case "name":
                fn = verifyName;
                break;
            case "pass":
                fn = verifyPass;
                break;
            case "passRepeat":
                fn = verifyPassRepeat;
                break;
        }

        return fn(inputValue);
        // clearTimeout(timeout);
        // setOk(null);
        // timeout = setTimeout(() => {
        //     setOk(() => fn(inputValue));
        // }, 1000);
    };
})();

export const reducer = (state, action) => {
    switch (action.dataType) {
        case "email":
            return {
                values: { ...state.values, email: action.value },
                verified: {
                    ...state.verified,
                    email: handleVerify("email", action.value),
                },
            };
        case "name":
            return {
                values: { ...state.values, name: action.value },
                verified: {
                    ...state.verified,
                    name: handleVerify("name", action.value),
                },
            };
        case "pass":
            return {
                values: { ...state.values, pass: action.value },
                verified: {
                    ...state.verified,
                    pass: handleVerify("pass", action.value),
                    passRepeat: handleVerify("passRepeat", {
                        first: action.value,
                        second: state.values.passRepeat,
                    }),
                },
            };
        case "passRepeat":
            return {
                values: { ...state.values, passRepeat: action.value },
                verified: {
                    ...state.verified,
                    passRepeat: handleVerify("passRepeat", {
                        first: state.values.pass,
                        second: action.value,
                    }),
                },
            };
        default:
            return state;
    }
};
