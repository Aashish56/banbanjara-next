import { Schema, model, models, mongoose } from 'mongoose';

const employeeSchema = new Schema({
    firstName: { // Image
        type: String
    },
    lastName: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    manager: {
        type: String
    },
    password: {
        type: String
    },
    department: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}, {
    collection: 'employee'
}
);

const employee = models.employee || model('employee', employeeSchema);

export default employee;