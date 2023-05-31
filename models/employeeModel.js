const mongoose = require('mongoose')
const employeeSchema = mongoose.Schema(
    {
        employeeName: {
            type: String,
            required: [true, "Please enter Employee name"]
        },
        employeeNumber: {
            type: Number,
            required: true,
            default: 0

        },
        joiningDate: {
            type: Date,
            required: true,
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;