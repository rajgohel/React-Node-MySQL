import http from "../shared/http-common";

const login = data => {
    return http.post("/manager/login", data);
};

const signUp = data => {
    return http.post("/manager/signUp", data);
};

const ManagerService = {
    login,
    signUp
};

export default ManagerService;