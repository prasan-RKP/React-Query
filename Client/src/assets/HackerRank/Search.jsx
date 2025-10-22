import React, { useState, useEffect } from "react";
import medical_records from "./records.js";
import './custom.css'

function Search({ setRecord, setId, id }) {
  const [selectedId, setSelectedId] = useState("0");
  
  // Sync with parent id when it changes
  useEffect(() => {
    if (id && id !== "0") {
      setSelectedId(id);
    }
  }, [id]);

  const handlePatientChange = (event) => {
    const newSelectedId = event.target.value;
    setSelectedId(newSelectedId);
    setId(newSelectedId); // Update the selected ID in parent
  };

  const handleShow = () => {
    if (selectedId && selectedId !== "0") {
      // Find the selected patient's records
      const selectedPatient = medical_records.find(record => record.id === selectedId);
      setRecord(selectedPatient); // Update records in parent
    }
  };

  return (
    <div className="layout-row align-items-baseline select-form-container">
      <div className="select">
        <select 
          data-testid="patient-name" 
          defaultValue="0"
          onChange={handlePatientChange}
        >
          <option value="0" disabled>
            Select Patient
          </option>
          {medical_records.map(record => (
            <option key={record.id} value={record.id}>
              {record.data[0].userName}
            </option>
          ))}
        </select>
      </div>

      <button 
        type="button" 
        data-testid="show"
        onClick={handleShow}
        disabled={!selectedId || selectedId === "0"}
      >
        Show
      </button>
    </div>
  );
}

export default Search;