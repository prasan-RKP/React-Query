import React, { useState } from 'react'
import './custom.css'
import Search from './Search.jsx'
import Record from './Record.jsx'

const Root = () => {
  const [currentRecord, setCurrentRecord] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      <div className="content">
        <Search 
          setRecord={setCurrentRecord}
          setId={setSelectedId}
          id={selectedId}
        />
        <Record 
          currentRecord={currentRecord}
          setRecord={setCurrentRecord}
          selectedId={selectedId}
        />
      </div>
    </div>
  )
}

export default Root