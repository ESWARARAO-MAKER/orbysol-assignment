import mongoose from 'mongoose'
const dataSchema = new mongoose.Schema(
    {
        clinic: {
            type : String,
            required : true,
        },
        device: {
            type : String,
        },
        enrollmentType: {
            type : String,
        },
        lastName: {
            type : String,
            required : true,
        },
        firstName: {
            type : String,
            required : true,
        },
        middleName: {
            type : String,
        },
        dob: {
            type : Date,
        },
        gender: {
            type : String,
            required : true
        },
        addressLine1: {
            type : String,
        },
        addressLine2: {
            type : String,
        },
        city: {
            type : String,
        },
        state: {
            type : String,
        },
        zip: {
            type : String,
        },
        primaryPhone: {
            type : String,
            required : true,
        },
        primaryPhoneType: {
            type : String,
        },
        secondaryPhone: {
            type : String,
        },
        secondaryPhoneType: {
            type : String,
        },
        orderingProvider: {
            type : String,
        },
        readingProvider: {
            type : String,
        },
        referringProvider: {
            type : String,
        },
    }
)

export default mongoose.model("Data", dataSchema);