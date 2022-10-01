export const fetchConditions = {
    fetch_start: "FETCH_START",
    fetch_final: "FETCH_FINAL",
    fetch_success: "FETCH_SUCCESS",
    fetch_fail: "FETCH_FAIL",
};
export const INITIAL_STATE = { userList: [], isLoading: true, error: null };
export const fetchReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, isLoading: true, error: false };
        case "FETCH_FINAL":
            return { ...state, isLoading: false };
        case "FETCH_SUCCESS":
            return { ...state, userList: action.payload };
        case "FETCH_FAIL":
            return { ...state, isLoading: false, error: true };
        default:
            return state;
    }
};
