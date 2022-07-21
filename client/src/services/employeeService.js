import http from "../shared/http-common";

// Get all employees
const getAllEmps = data => {
    return http.get("/employees");
};

// Add new employee
const createEmp = data => {
    return http.post("/employees", data);
};

// Update employee
const updateEmp = data => {
    return http.put(`/employees/${data.id}`, data);
};

// Delete employee
const deleteEmp = id => {
    return http.delete(`/employees/${id}`);
};

const EmployeeService = {
    createEmp,
    updateEmp,
    deleteEmp,
    getAllEmps
};

export default EmployeeService;