export const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, isLoading: true };
        case "FETCH_END":
            return { ...state, isLoading: false };
        case "FETCH_SUCCESS":
            console.log(action.payload);
            return { ...state, success: true, data: action.payload };
        case "FETCH_FAIL":
            console.log(action.err);
            return { ...state, success: false, error: true };
        default:
            return state;
    }
};
