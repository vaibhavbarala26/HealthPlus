import React, { useState } from 'react';
import "../App.css"
import img from "../assets/cloud.svg"
import { useNavigate } from 'react-router-dom';
// Import from Heroicon
const Form = () => {
    const [formData, setFormData] = useState({
        name: '',               // fullName -> name
        email: '',
        phone: '',
        DOB: '',                // dob -> DOB
        Gender: '',             // gender -> Gender
        Address: '',            // address -> Address
        Job: '',                // jobTitle -> Job
        emergency: '',          // emergencyContact -> emergency
        Plan: '',               // medicalPlan -> Plan
        Allergies: '',          // allergies -> Allergies
        CurrentMedic: '',       // medications -> CurrentMedic
        FamilyMedHis: '',       // familyHistory -> FamilyMedHis
        PastMedHis: '',         // pastMedicalHistory -> PastMedHis
        BirthCertificate: '',   // birthCertificate -> BirthCertificate
        ID: '',                 // idNumber -> ID
        consent1: false,        // Same
        consent2: false,        // Same
        consent3: false,        // Same
    });
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
       
    };
const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(
            formData
        )
        // Check if all consents are checked
        if (formData.consent1 && formData.consent2 && formData.consent3) {
            
            // Create a new FormData object
            const formDataToSend = new FormData();
    
            // Append all form fields to the FormData object
            for (const key in formData) {
                console.log(formData[key])
                formDataToSend.append(key, formData[key]);
            }
    
            // Append the uploaded file to the FormData
            if (file) {
                formDataToSend.append("pdfFile", file);  // 'pdfFile' must match the field name in your backend
            }
            try {
                // Send the FormData to the server
                const res = await fetch("http://localhost:1042/user/user-details", {
                    method: "POST",
                    credentials: "include",
                    body: formDataToSend, // Send the FormData object, not JSON
                });
    
                if (res.ok) {
                    alert("Data saved successfully!");
                    navigate("/")
                } else {
                    alert("Failed to save data!");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while submitting the form.");
            }
        } else {
            alert("Please select all checkpoints.");
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
                <h2 className="text-3xl font-semibold mb-6">Welcome 👋</h2>
                <p className="mb-6 -mt-3 text-gray-300">Let us know more about yourself!</p>
    
                {/* Personal Information Section */}
                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="input-field"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="input-field"
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="input-field"
                        />
                        <input
                            type="date"
                            name="DOB"
                            value={formData.DOB}
                            onChange={handleChange}
                            placeholder="Date of Birth"
                            className="input-field"
                        />
                        <select
                            name="Gender"
                            value={formData.Gender}
                            onChange={handleChange}
                            className="input-field"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="text"
                            name="Address"
                            value={formData.Address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="input-field"
                        />
                        <input
                            type="text"
                            name="Job"
                            value={formData.Job}
                            onChange={handleChange}
                            placeholder="Job Title"
                            className="input-field"
                        />
                        <input
                            type="text"
                            name="emergency"
                            value={formData.emergency}
                            onChange={handleChange}
                            placeholder="Emergency Contact"
                            className="input-field"
                        />
                    </div>
                </section>
    
                {/* Medical Information Section */}
                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Medical Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select
                            name="Plan"
                            value={formData.Plan}
                            onChange={handleChange}
                            className="input-field"
                        >
                            <option value="">Select Plan</option>
                            <option value="planA">Plan A</option>
                            <option value="planB">Plan B</option>
                        </select>
                        <input
                            type="text"
                            name="Allergies"
                            value={formData.Allergies}
                            onChange={handleChange}
                            placeholder="Allergies"
                            className="input-field"
                        />
                        <input
                            type="text"
                            name="CurrentMedic"
                            value={formData.CurrentMedic}
                            onChange={handleChange}
                            placeholder="Current Medications"
                            className="input-field"
                        />
                        <input
                            type="text"
                            name="FamilyMedHis"
                            value={formData.FamilyMedHis}
                            onChange={handleChange}
                            placeholder="Family Medical History"
                            className="input-field"
                        />
                        <input
                            type="text"
                            name="PastMedHis"
                            value={formData.PastMedHis}
                            onChange={handleChange}
                            placeholder="Past Medical History"
                            className="input-field"
                        />
                    </div>
                </section>
    
                {/* Identification and Verification Section */}
                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Identification and Verification</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="BirthCertificate"
                            value={formData.BirthCertificate}
                            onChange={handleChange}
                            placeholder="Birth Certificate"
                            className="input-field"
                        />
                        <input
                            type="text"
                            name="ID"
                            value={formData.ID}
                            onChange={handleChange}
                            placeholder="ID Number"
                            className="input-field"
                        />
    
                        {/* File Upload Section */}
                        <div className="py-10 text-white">
                            <div className="container mx-auto px-4">
                                <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                                    <h2 className="text-2xl font-semibold mb-4">Upload Your Document</h2>
                                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6 mb-4 hover:border-gray-400">
                                        {!file ? (
                                            <>
                                                <p className="text-gray-400 mb-2">Drag and drop your file here</p>
                                                <p className="text-gray-500">or</p>
                                                <label className="bg-pink-600 hover:bg-pink-500 text-white font-semibold py-2 px-4 rounded-md cursor-pointer mt-4">
                                                    Select File
                                                    <input type="file" className="hidden" onChange={handleFileChange} accept='.pdf' required />
                                                </label>
                                            </>
                                        ) : (
                                            <div className="text-center">
                                                <p className="text-lg mb-2">File uploaded:</p>
                                                <p className="text-gray-400">{file.name}</p>
                                            </div>
                                        )}
                                    </div>
                                    <button className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-md">
                                        Submit File
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
    
                {/* Consent and Privacy Section */}
                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Consent and Privacy</h3>
                    <div className="space-y-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="consent1"
                                checked={formData.consent1}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            I consent to receive treatment for my health condition.
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="consent2"
                                checked={formData.consent2}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            I consent to the use and disclosure of my health information.
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="consent3"
                                checked={formData.consent3}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            I acknowledge that I have reviewed and agree to the privacy policy.
                        </label>
                    </div>
                </section>
    
                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-md w-full"
                    onClick={handleSubmit}
                >
                    Submit and Continue
                </button>
            </div>
        </div>
    </div>
    
    );
};

export default Form;
