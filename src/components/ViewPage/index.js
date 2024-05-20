import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import { CiSearch } from "react-icons/ci";
import { Loading } from '../Loading';
import { useNavigate } from 'react-router-dom';

function ViewPage() {
  const navigate = useNavigate()
  const [input, setInput] = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://eswar-orbysol-assignment.onrender.com/api/data');
        setEnrollments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the enrollments!', error);
      }
    };

    fetchData();
  }, []);

  const onSearchPatient = (e) => {
    const value = e.target.value;
    setInput(value);

    const searchingPatientsList = enrollments.filter(each =>
      each.firstName.toLowerCase().includes(value.toLowerCase()) ||
      each.lastName.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(searchingPatientsList);
  }

  const selectSuggestion = (suggestion) => {
    setInput(`${suggestion.firstName} ${suggestion.lastName}`);
    setSuggestions([]);
  }

  const onFocusInput = () => {
    if (suggestions.length > 0) {
      setInput(`${suggestions[0].firstName} ${suggestions[0].lastName}`);
    }
  }

  return (
    <div className='view'>
      <h1>Enrollment Data</h1>
      <div className='search'>
        <input type='search' placeholder='Search for Patient...' value={input} onChange={onSearchPatient} onFocus={onFocusInput} />
        <CiSearch className='search-icon' />
        {suggestions.length > 0 && (
          <div className="suggestions">
            <ul>
              {suggestions.map((enrollment, index) => (
                <li key={index} onClick={() => selectSuggestion(enrollment)}>
                  {`${enrollment.firstName} ${enrollment.lastName}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="ViewPage">
        <table>
          <thead>
            <tr>
              <th className='tr1'>Name</th>
              <th className='tr2'>Enrollment Type</th>
              <th className='tr3'>Referring Provider</th>
              <th className='tr4'>Gender</th>
              <th className='tr1'>Address</th>
              <th className='tr2'>Date of Birth</th>
              <th className='tr3'>Reading Provider</th>
              <th className='tr4'>Ordering Provider</th>
            </tr>
          </thead>
          {loading ? (<Loading />) : (
            <tbody>
              {enrollments.filter(each =>
                each.firstName.toLowerCase().includes(input.toLowerCase()) ||
                each.lastName.toLowerCase().includes(input.toLowerCase())
              ).map((enrollment, index) => (
                <tr key={index}>
                  <td className='tr1'>{`${enrollment.firstName} ${enrollment.lastName}`}</td>
                  <td className='tr2'>{enrollment.enrollmentType}</td>
                  <td className='tr3'>{enrollment.referringProvider}</td>
                  <td className='tr4'>{enrollment.gender}</td>
                  <td className='tr1'>{`${enrollment.addressLine1}, ${enrollment.addressLine2}, ${enrollment.city}, ${enrollment.state}, ${enrollment.zip}`}</td>
                  <td className='tr2'>{enrollment.dob}</td>
                  <td className='tr3'>{enrollment.readingProvider}</td>
                  <td className='tr4'>{enrollment.orderingProvider}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <button className='btn' onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default ViewPage;
