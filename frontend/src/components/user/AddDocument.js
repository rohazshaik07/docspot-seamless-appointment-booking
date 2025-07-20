"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { Upload, X } from "lucide-react"
import { useNotification } from "../../context/NotificationContext"
import UserNavbar from "./UserNavbar"

const AddDocument = () => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { addNotification } = useNotification()

  const allowedFileTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]

  const maxFileSize = 5 * 1024 * 1024 // 5MB

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = []
    const errors = []

    files.forEach((file) => {
      if (!allowedFileTypes.includes(file.type)) {
        errors.push(`${file.name}: Invalid file type`)
        return
      }

      if (file.size > maxFileSize) {
        errors.push(`${file.name}: File too large (max 5MB)`)
        return
      }

      validFiles.push({
        file,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
        type: file.type,
        id: Date.now() + Math.random(),
      })
    })

    if (errors.length > 0) {
      errors.forEach((error) => addNotification(error, "error"))
    }

    setSelectedFiles((prev) => [...prev, ...validFiles])
  }

  const removeFile = (fileId) => {
    setSelectedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      addNotification("Please select files to upload", "error")
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setUploadProgress(100)
      addNotification("Documents uploaded successfully!", "success")

      // Clear files after successful upload
      setTimeout(() => {
        setSelectedFiles([])
        setUploadProgress(0)
        setUploading(false)
      }, 1000)
    } catch (error) {
      addNotification("Failed to upload documents", "error")
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const getFileIcon = (fileType) => {
    if (fileType.includes("pdf")) return "📄"
    if (fileType.includes("image")) return "🖼️"
    if (fileType.includes("word")) return "📝"
    return "📎"
  }

  return (
    <div>
      <UserNavbar />
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card>
              <Card.Header>
                <h4 className="mb-0">
                  <Upload className="me-2" size={20} />
                  Upload Medical Documents
                </h4>
              </Card.Header>
              <Card.Body>
                <Alert variant="info">
                  <strong>Accepted file types:</strong> PDF, JPG, PNG, DOC, DOCX
                  <br />
                  <strong>Maximum file size:</strong> 5MB per file
                </Alert>

                {/* File Upload Area */}
                <div
                  className="border-2 border-dashed border-primary rounded p-4 text-center mb-4"
                  style={{ minHeight: "150px", cursor: "pointer" }}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <Upload size={48} className="text-primary mb-3" />
                  <h5>Click to select files or drag and drop</h5>
                  <p className="text-muted mb-0">Upload your medical reports, prescriptions, or test results</p>
                  <Form.Control
                    id="fileInput"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                  />
                </div>

                {/* Selected Files */}
                {selectedFiles.length > 0 && (
                  <div className="mb-4">
                    <h6>Selected Files ({selectedFiles.length})</h6>
                    {selectedFiles.map((fileObj) => (
                      <div
                        key={fileObj.id}
                        className="d-flex align-items-center justify-content-between p-2 border rounded mb-2"
                      >
                        <div className="d-flex align-items-center">
                          <span className="me-2">{getFileIcon(fileObj.type)}</span>
                          <div>
                            <div className="fw-medium">{fileObj.name}</div>
                            <small className="text-muted">{fileObj.size} MB</small>
                          </div>
                        </div>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFile(fileObj.id)}
                          disabled={uploading}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Progress */}
                {uploading && (
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${uploadProgress}%` }}
                        aria-valuenow={uploadProgress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <div className="d-grid">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleUpload}
                    disabled={selectedFiles.length === 0 || uploading}
                  >
                    {uploading ? (
                      <>
                        <div className="spinner-border spinner-border-sm me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={20} className="me-2" />
                        Upload Documents
                      </>
                    )}
                  </Button>
                </div>

                {/* Help Text */}
                <div className="mt-4 text-center">
                  <small className="text-muted">
                    Your documents are encrypted and stored securely. Only you and your assigned doctors can access
                    them.
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AddDocument
