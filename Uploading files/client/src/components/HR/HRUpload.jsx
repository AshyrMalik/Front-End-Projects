// Frontend - React Component
import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/HRUpload.css';

const HRUpload = () => {
  const [attendanceFile, setAttendanceFile] = useState(null);
  const [overtimeFile, setOvertimeFile] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const isValidFileType = (file) => {
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 
                       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    return validTypes.includes(file.type);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleAttendanceUpload = (e) => {
    const file = e.target.files[0];
    if (file && isValidFileType(file)) {
      setAttendanceFile(file);
      setMessage('');
    } else {
      setMessage('Please upload a valid Excel or CSV file for attendance');
    }
  };

  const handleOvertimeUpload = (e) => {
    const file = e.target.files[0];
    if (file && isValidFileType(file)) {
      setOvertimeFile(file);
      setMessage('');
    } else {
      setMessage('Please upload a valid Excel or CSV file for overtime');
    }
  };

  const handleAdditionalFiles = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalFiles(prev => [...prev, ...files]);
  };

  const removeAdditionalFile = (index) => {
    setAdditionalFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!attendanceFile || !overtimeFile) {
      setMessage('Both attendance and overtime files are required');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('attendance', attendanceFile);
    formData.append('overtime', overtimeFile);
    additionalFiles.forEach((file, index) => {
      formData.append(`additional${index}`, file);
    });

    try {
      const response = await axios.post('/api/hr/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Files uploaded successfully!');
      // Clear form
      setAttendanceFile(null);
      setOvertimeFile(null);
      setAdditionalFiles([]);
    } catch (error) {
      setMessage('Error uploading files: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="upload-title">HR Payroll Upload</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="file-upload-section">
            <label className="file-label">
              Attendance Sheet (Excel/CSV)*
              <div 
                className={`drop-zone ${dragActive ? 'active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
              >
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleAttendanceUpload}
                  className="file-input"
                  required
                />
                <div className="drop-zone-text">
                  {attendanceFile ? attendanceFile.name : 'Drop file here or click to upload'}
                </div>
              </div>
            </label>
          </div>

          <div className="file-upload-section">
            <label className="file-label">
              Overtime Sheet (Excel/CSV)*
              <div 
                className={`drop-zone ${dragActive ? 'active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
              >
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleOvertimeUpload}
                  className="file-input"
                  required
                />
                <div className="drop-zone-text">
                  {overtimeFile ? overtimeFile.name : 'Drop file here or click to upload'}
                </div>
              </div>
            </label>
          </div>

          <div className="file-upload-section">
            <label className="file-label">
              Additional Files
              <div className="drop-zone">
                <input
                  type="file"
                  multiple
                  onChange={handleAdditionalFiles}
                  className="file-input"
                />
                <div className="drop-zone-text">
                  Drop additional files here or click to upload
                </div>
              </div>
            </label>
          </div>

          {additionalFiles.length > 0 && (
            <div className="additional-files-list">
              {additionalFiles.map((file, index) => (
                <div key={index} className="file-item">
                  <span>{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAdditionalFile(index)}
                    className="remove-file-btn"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {message && (
            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Uploading...' : 'Upload Files'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HRUpload;