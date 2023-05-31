const express = require("express")
const mongoose = require('mongoose');
const Employee = require('./models/employeeModel')

const app = express()
const port = 3000;

app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send("Hello Node API")
})

app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//get or fetch employee data by id
app.get('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
app.post('/employees', async (req, res) => {
    try {
        const employees = await Employee.create(req.body)
        res.status(200).json(employees);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

//update employee data
app.put('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndUpdate(id, req.body);
        // cannot find employee in database
        if (!employee) {
            return res.status(404).json({ message: `Cannot find any employee with ID ${id}` })
        }
        const updatedEmployee = await Employee.findByIdAndUpdate(id);
        res.status(200).json(updatedEmployee)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})
// delete a employee data

app.delete('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndDelete(id)

        //cannot find employee in database
        if (!employee) {
            return res.status(404).json({ message: `Cannot find any employee with ID ${id}` })
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})

mongoose
    .connect('mongodb+srv://atulbhatia:123456Admin@crudassignment.a17z9dh.mongodb.net/your_database_name?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Node API running at http://localhost:${port}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });
