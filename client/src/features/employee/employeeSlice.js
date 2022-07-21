import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    auth: {
        isLoggedIn: false
    },
    employeeData: []
};

export const employeeSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addAllEmployees: (state, action) => {
            state.employeeData = [...action.payload];
        },
        addEmployee: (state, action) => {
            state.employeeData.push(action.payload);
        },
        editEmployee: (state, action) => {
            state.employeeData = state.employeeData.map((ele) => {
                if (ele.id === action.payload.empId) {
                    return {
                        ...ele,
                        ...action.payload.employeeDetail
                    }
                }
                return ele;
            })
        },
        deleteEmployee: (state, action) => {
            state.employeeData = state.employeeData.filter((ele) => ele.id !== action.payload);
        },
    },
});

export const { addAllEmployees, addEmployee, editEmployee, deleteEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;