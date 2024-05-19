import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import { CiSearch } from "react-icons/ci";


function ViewPage() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/data');
        setEnrollments(response.data);
      } catch (error) {
        console.error('There was an error fetching the enrollments!', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='view'>
        <h1>Enrollment Data</h1>
        <div className='search'>
          <input type='search' placeholder='Search for Patient...'/>
          <CiSearch className='search-icon'/>
        </div>
        <div className="ViewPage">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Enrollment Type</th>
                <th>Referring Provider</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Date of Birth</th>
                <th>Reading Provider</th>
                <th>Ordering Provider</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment, index) => (
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
          </table>
        </div>
      </div>
  );
}

export default ViewPage;
