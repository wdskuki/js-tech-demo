import React from 'react'
import ReactDOM from 'react-dom/client'
import Students from './Students.tsx'
import Student from './Student.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Student /> */}
    <Students />
  </React.StrictMode>,
)
