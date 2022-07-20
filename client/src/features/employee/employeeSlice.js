import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-uuid';

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
        addEmployee: (state, action) => {
            state.employeeData.push({ ...action.payload, id: uuid() });
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
            state.employeeData = state.employeeData.filter((ele, index) => index !== action.payload);
        },
    },
});

export const { addEmployee, editEmployee, deleteEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;