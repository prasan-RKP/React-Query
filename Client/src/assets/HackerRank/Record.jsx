import React from "react";
import medical_records from "./records.js";
import './custom.css'

function Record({ currentRecord, setRecord, selectedId }) {
  
  const handleNext = () => {
    if (!selectedId) return;
    
    const currentIndex = medical_records.findIndex(record => record.id === selectedId);
    const nextIndex = (currentIndex + 1) % medical_records.length;
    const nextRecord = medical_records[nextIndex];
    
    setRecord(nextRecord);
  };

  // If no record is selected, don't show anything
  if (!currentRecord) {
    return null;
  }

  const patientData = currentRecord.data[0];

  return (
    <div className="patient-profile-container" id="profile-view">
      <div className="layout-row justify-content-center">
        <div id="patient-profile" data-testid="patient-profile" className="mx-auto">
          <h4 id="patient-name">{patientData.userName}</h4>
          <h5 id="patient-dob">DOB: {patientData.userDob}</h5>
          <h5 id="patient-height">Height: {patientData.meta.height} cm</h5>
          <h5 id="patient-weight">Weight: {patientData.meta.weight} lbs</h5>
        </div>
        <button 
          className="mt-10 mr-10" 
          data-testid="next-btn"
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      <table id="patient-records-table">
        <thead id="table-header">
          <tr>
            <th>SL</th>
            <th>Date</th>
            <th>Diagnosis</th>
            <th>Weight</th>
            <th>Doctor</th>
          </tr>
        </thead>
        <tbody id="table-body" data-testid="patient-table">
          {currentRecord.data.map((record, index) => (
            <tr key={record.id}>
              <td>{index + 1}</td>
              <td>{new Date(record.timestamp).toLocaleDateString()}</td>
              <td>{record.diagnosis.name}</td>
              <td>{record.meta.weight} lbs</td>
              <td>{record.doctor.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Record;