import Employee from "../Model/employeeModel.js";

export const addEmployee = async (req, res) => {
  try {
    const { last_name, first_name, email, phone_no, company, priority } =
      req.body;

    if (
      !last_name ||
      !first_name ||
      !email || 
      !phone_no ||
      !company ||
      !priority
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the fields",
      });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists",
      });
    }

    const newEmployee = await Employee.create({
      first_name,
      last_name,
      email,
      phone_no,
      company,
      priority,
    });

    res.status(200).json({
      success: true,
      message: "Employee added successfully",
      employee: newEmployee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const allEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      status: true,
      employees: employees, // Ensure 'employees' key matches with what is expected in the frontend
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const searchEmployee = async (req, res) => {
  try {
    const { first_name, last_name, priority } = req.query;

    const searchCriteria = {};

    if (first_name) {
      searchCriteria.first_name = { $regex: first_name, $options: "i" }; // Case-insensitive search
    }

    if (last_name) {
      searchCriteria.last_name = { $regex: last_name, $options: "i" }; // Case-insensitive search
    }

    if (priority) {
      searchCriteria.priority = priority;
    }

    const employees = await Employee.find(searchCriteria);

    if (employees.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No employees found matching the criteria",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employees found",
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
