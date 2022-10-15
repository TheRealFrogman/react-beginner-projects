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
    function verifyPassRepeat(first, second) {
        if (first && second) {
            console.log(first, second);
            return first === second;
        }
    }
    return (type, inputValue, ...rest) => {
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

        return fn(inputValue, ...rest);
        clearTimeout(timeout);
        timeout = setTimeout(() => {}, 1000);
    };
})();

export const reducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            // console.log(state);
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.target.name]: action.target.value,
                },
            };
        case "INPUT_VERIFY":
            return {
                ...state,
                verified: {
                    ...state.verified,
                    [action.target.name]: handleVerify(
                        action.target.name,
                        action.target.value,
                        state.inputs.pass
                    ),
                },
            };
        default:
            return state;
    }
};
