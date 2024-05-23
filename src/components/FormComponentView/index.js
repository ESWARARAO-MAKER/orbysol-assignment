import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import './index.css';
import { devices, enrollementTypeList, listOfClinics, orderingProviderList, phoneTypeList, readingProviderList } from '../../data';

function SelectField({ label, required, options, name, value, onChange, onBlur, error }) {
  return (
    <div className="data">
      <label>{label}{required && <span>*</span>}</label>
      <select name={name} required={required} value={value} onChange={onChange} onBlur={onBlur} className='select'>
        <option value="">Select...</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

function RadioButton({ id, name, value, label, required, checked, onChange, onBlur, error }) {
  return (
    <div>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        required={required}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={id}>{label}</label>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

function FormComponentView() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    clinic: '',
    device: '',
    enrollmentType: '',
    lastName: '',
    firstName: '',
    middleName: '',
    dob: '',
    gender: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    primaryPhone: '',
    primaryPhoneType: '',
    secondaryPhone: '',
    secondaryPhoneType: '',
    orderingProvider: '',
    readingProvider: '',
    referringProvider: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';

    if (!value) {
      error = 'This field is required';
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const validate = () => {
    let newErrors = {};

    for (let field in formData) {
      if (!formData[field] && ['clinic', 'device', 'enrollmentType', 'lastName', 'firstName', 'dob', 'gender', 'addressLine1', 'city', 'state', 'zip', 'primaryPhone', 'primaryPhoneType', 'orderingProvider', 'readingProvider', 'referringProvider'].includes(field)) {
        newErrors[field] = 'This field is required';
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post('https://eswar-orbysol-assignment.onrender.com/api/data', formData);
        // window.location.href = '/view';
        navigate("/view")
      } catch (error) {
        console.error('There was an error saving the form data!', error);
      }
    } else {
      console.log('Form contains errors');
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h4>New Enrollment</h4>
        <p>*Required Fields</p>
      </div>
      <form className="data-container" onSubmit={handleSubmit}>
        <SelectField
          label="Select Clinic"
          required
          options={listOfClinics}
          name="clinic"
          value={formData.clinic}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.clinic}
        />

        <SelectField
          label="Select Device"
          required
          options={devices}
          name="device"
          value={formData.device}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.device}
        />

        <div className="data">
          <label>Enrollment Type<span>*</span></label>
          <div>
            <select name="enrollmentType" required value={formData.enrollmentType} onChange={handleChange} onBlur={handleBlur}>
              <option value="">Select...</option>
              {enrollementTypeList.map(each => (
                <option key={each} value={each}>{each}</option>
              ))}
            </select>
            <button type="button">+</button>
          </div>
          {errors.enrollmentType && <span className="error">{errors.enrollmentType}</span>}
        </div>

        <div className="patient-data">
          <label>Enter Patient Info</label>
          <section>
            <div className="patient-name">
              <div>
                <label>Last Name <span>*</span></label>
                <input type="text" name="lastName" placeholder="Last Name*" required value={formData.lastName} onChange={handleChange} onBlur={handleBlur} />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
              </div>

              <div>
                <label>First Name <span>*</span></label>
                <input type="text" name="firstName" placeholder="First Name*" required value={formData.firstName} onChange={handleChange} onBlur={handleBlur} />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
              </div>

              <div>
                <label>Middle Name</label>
                <input type="text" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} />
              </div>
            </div>

            <div className="dob">
              <label>Date of Birth <span>*</span></label>
              <input type="date" name="dob" required value={formData.dob} onChange={handleChange} onBlur={handleBlur} />
              {errors.dob && <span className="error">{errors.dob}</span>}
            </div>

            <div className="gender">
              <label>Gender <span>*</span></label>
              <RadioButton
                id="male"
                name="gender"
                value="male"
                label="Male"
                required
                checked={formData.gender === 'male'}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.gender}
              />
              <RadioButton
                id="female"
                name="gender"
                value="female"
                label="Female"
                required
                checked={formData.gender === 'female'}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.gender}
              />
              {errors.gender && <span className="error">{errors.gender}</span>}
            </div>

            <div className="address">
              <label>Address Line 1<span>*</span></label>
              <input type="text" name="addressLine1" required value={formData.addressLine1} onChange={handleChange} onBlur={handleBlur} />
              {errors.addressLine1 && <span className="error">{errors.addressLine1}</span>}
            </div>

            <div className="address">
              <label>Address Line 2<span>*</span></label>
              <input type="text" name="addressLine2" required value={formData.addressLine2} onChange={handleChange} onBlur={handleBlur} />
              {errors.addressLine2 && <span className="error">{errors.addressLine2}</span>}
            </div>

            <div className="city-state-zipcode">
              <div>
                <label>City <span>*</span></label>
                <input type="text" name="city" placeholder="City *" required value={formData.city} onChange={handleChange} onBlur={handleBlur} />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>

              <div>
                <label>State <span>*</span></label>
                <input type="text" name="state" placeholder="State *" required value={formData.state} onChange={handleChange} onBlur={handleBlur} />
                {errors.state && <span className="error">{errors.state}</span>}
              </div>

              <div>
                <label>Zip <span>*</span></label>
                <input type="text" name="zip" placeholder="Zip code *" required value={formData.zip} onChange={handleChange} onBlur={handleBlur} />
                {errors.zip && <span className="error">{errors.zip}</span>}
              </div>
            </div>

            <div className="phone">
              <div>
                <label>Primary Phone <span>*</span></label>
                <div>
                  <input type="text" name="primaryPhone" placeholder="Primary Phone" required value={formData.primaryPhone} onChange={handleChange} onBlur={handleBlur} />
                  <select name="primaryPhoneType" required value={formData.primaryPhoneType} onChange={handleChange} onBlur={handleBlur}>
                    <option value="">Select...</option>
                    {phoneTypeList.map(each => (
                      <option key={each} value={each}>{each}</option>
                    ))}
                  </select>
                </div>
                {errors.primaryPhone && <span className="error">{errors.primaryPhone}</span>}
                {errors.primaryPhoneType && <span className="error">{errors.primaryPhoneType}</span>}
              </div>

              <div>
                <label>Secondary Phone</label>
                <div>
                  <input type="text" name="secondaryPhone" placeholder="Secondary Phone" value={formData.secondaryPhone} onChange={handleChange} onBlur={handleBlur} />
                  <select name="secondaryPhoneType" value={formData.secondaryPhoneType} onChange={handleChange} onBlur={handleBlur}>
                    <option value="">Select...</option>
                    {phoneTypeList.map(each => (
                      <option key={each} value={each}>{each}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>

        <SelectField
          label="Ordering Provider"
          required
          options={orderingProviderList}
          name="orderingProvider"
          value={formData.orderingProvider}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.orderingProvider}
        />

        <SelectField
          label="Reading Provider"
          required
          options={readingProviderList}
          name="readingProvider"
          value={formData.readingProvider}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.readingProvider}
        />

        <div className="data1">
          <label>Referring Provider<span>*</span></label>
          <input
            type="text"
            name="referringProvider"
            placeholder="Referring Provider Name"
            required
            value={formData.referringProvider}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.referringProvider && <span className="error">{errors.referringProvider}</span>}
        </div>

        <div className="save-btn">
        
          {/* <Link to ="/view" ><button className="btn" type="submit" >Save</button></Link> */}

          <button className="btn save" type="submit" >Save</button>
          <button className="btn back" onClick={() => navigate("/")} >Back</button>
        </div>
      </form>
    </div>
  );
}

export default FormComponentView;
