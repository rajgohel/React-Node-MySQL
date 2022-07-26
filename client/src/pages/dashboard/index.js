import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import { InputText } from '../../components/input';
import { addAllEmployees, addEmployee, deleteEmployee, editEmployee } from '../../features/employee/employeeSlice';
import EmployeeService from '../../services/employeeService';

const empInputs = [{
    "type": "text",
    "title": "First Name",
    "name": "firstName",
    "class": "text",
    "placeholder": "Enter first name"
},
{
    "type": "text",
    "title": "Last Name",
    "name": "lastName",
    "class": "text",
    "placeholder": "Enter last name"
},
{
    "type": "text",
    "title": "Address",
    "name": "address",
    "class": "text",
    "placeholder": "Address"
},
{
    "type": "date",
    "title": "Date Of Birth",
    "name": "dob",
    "class": "text",
    "placeholder": "Date Of Birth"
},
{
    "type": "text",
    "title": "Mobile Number",
    "name": "mobile",
    "class": "text",
    "placeholder": "Mobile Number"
},
{
    "type": "text",
    "title": "City",
    "name": "city",
    "class": "text",
    "placeholder": "City"
}];

const DashBoard = () => {
    const employeeData = useSelector((store) => store.employee.employeeData);
    const [showModel, setShowModel] = useState(false);
    const [isEmpId, setIsEmpId] = useState(null);

    const [employee, setEmployee] = useState(empInputs.reduce((acc, input) => {
        return { ...acc, [input.name]: '' };
    }, {}));

    const dispatch = useDispatch();

    const handleAddBtnClick = () => setShowModel(true);

    const handleModelClose = () => {
        setEmployee({});
        setShowModel(false);
        setIsEmpId(null);
    };

    // handle model save change click
    const handleSave = () => {
        setShowModel(false);
        if (isEmpId) {
            let payloadData = {
                empId: isEmpId,
                employeeDetail: employee
            }
            EmployeeService.updateEmp(employee).then((updateEmpRes) => {
                dispatch(editEmployee(payloadData));
                setIsEmpId(null);
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            EmployeeService.createEmp(employee).then((addEmpRes) => {
                let empObj = { ...employee, id: addEmpRes.data.id };
                dispatch(addEmployee(empObj));
            }).catch((err) => {
                console.log(err);
            });
        }
        setEmployee({});
    }

    // set value in state while user interacts with input.
    const onChange = (name, value) => {
        setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
    }

    // handle employee delete click.
    const handleDelete = (employeeData) => {
        EmployeeService.deleteEmp(employeeData.id).then((deleteEmpRes) => {
            dispatch(deleteEmployee(employeeData.id));
        }).catch((err) => {
            console.log(err);
        });
    }

    // handle employee edit click.
    const handleEdit = (empId) => {
        let loadEmp = employeeData.find((ele) => ele.id === empId);
        setEmployee(loadEmp);
        setShowModel(true);
        setIsEmpId(empId);
    }

    // list of inputs for UI binding.
    const list = empInputs.map(input => {
        return (
            <InputText
                value={employee[input.name]}
                key={input.name}
                type={input.type}
                name={input.name}
                title={input.title}
                className={input.class}
                placeholder={input.placeholder}
                onChange={onChange}
            />
        );
    });

    // Get all employees from DB while component loads
    const getAllEmployees = () => {
        EmployeeService.getAllEmps(employee).then((getAllEmpRes) => {
            dispatch(addAllEmployees(getAllEmpRes.data));
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        getAllEmployees();
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem" }}>
            <div style={{ width: "60%" }}>
                <div style={{ marginBottom: "1rem", height: "2.5rem" }}>
                    <Button variant="primary" type="button" style={{ float: "right" }} onClick={handleAddBtnClick}>
                        <i className="fa fa-plus"></i>
                    </Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Date Of Birth</th>
                            <th>Mobile</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeData && employeeData.map((ele, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{ele.firstName}</td>
                                <td>{ele.lastName}</td>
                                <td>{ele.address}</td>
                                <td>{ele.dob}</td>
                                <td>{ele.mobile}</td>
                                <td>{ele.city}</td>
                                <td>
                                    <Button variant="primary" size='sm' style={{ marginRight: "4px" }} onClick={() => { handleEdit(ele.id) }}><i className="fa fa-edit"></i></Button>
                                    <Button variant="danger" size='sm' onClick={() => { handleDelete(ele) }}><i className="fa fa-trash"></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Modal show={showModel} onHide={handleModelClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEmpId ? 'Edit' : 'Add'} Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            {list}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModelClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default DashBoard;