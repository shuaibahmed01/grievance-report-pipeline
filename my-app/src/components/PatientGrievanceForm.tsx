"use client";

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Upload } from "lucide-react"

export default function Component() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    dateOfBirth: "",
    incidentDate: "",
    incidentDescription: "",
    documents: [] as File[],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, documents: [...prev.documents, ...Array.from(e.target.files || [])] }))
    }
  }

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 4))
  }

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the formData to your backend
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl mx-auto shadow-lg bg-white bg-opacity-80 backdrop-blur-md">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">Patient Grievance Report</CardTitle>
          <Progress value={(step / 4) * 100} className="w-full mt-4 bg-white bg-opacity-30" indicatorColor="bg-white" />
        </CardHeader>
        <CardContent className="mt-6">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-700">Patient Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName" className="text-blue-600">Patient Name</Label>
                    <Input
                      id="patientName"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      required
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patientId" className="text-blue-600">Patient ID</Label>
                    <Input
                      id="patientId"
                      name="patientId"
                      value={formData.patientId}
                      onChange={handleInputChange}
                      required
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-blue-600">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-700">Incident Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="incidentDate" className="text-green-600">Incident Date</Label>
                  <Input
                    id="incidentDate"
                    name="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={handleInputChange}
                    required
                    className="border-green-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="incidentDescription" className="text-green-600">Incident Description</Label>
                  <Textarea
                    id="incidentDescription"
                    name="incidentDescription"
                    value={formData.incidentDescription}
                    onChange={handleInputChange}
                    required
                    className="min-h-[100px] border-green-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-700">Document Upload</h3>
                <div className="space-y-2">
                  <Label htmlFor="file-upload" className="block text-blue-600">
                    Upload Documents
                  </Label>
                  <div className="flex items-center justify-center w-full">
                    <Label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-4 text-blue-500" />
                        <p className="mb-2 text-sm text-blue-600">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-blue-500">PDF, PNG, JPG or GIF (MAX. 10MB)</p>
                      </div>
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </Label>
                  </div>
                </div>
                {formData.documents.length > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-blue-700">Uploaded Documents:</h4>
                    <ul className="list-disc pl-5 text-blue-600">
                      {formData.documents.map((doc, index) => (
                        <li key={index}>{doc.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-700">Review and Submit</h3>
                <div className="space-y-2 bg-green-50 p-4 rounded-lg">
                  <p><strong className="text-green-700">Patient Name:</strong> <span className="text-green-600">{formData.patientName}</span></p>
                  <p><strong className="text-green-700">Patient ID:</strong> <span className="text-green-600">{formData.patientId}</span></p>
                  <p><strong className="text-green-700">Date of Birth:</strong> <span className="text-green-600">{formData.dateOfBirth}</span></p>
                  <p><strong className="text-green-700">Incident Date:</strong> <span className="text-green-600">{formData.incidentDate}</span></p>
                  <p><strong className="text-green-700">Incident Description:</strong> <span className="text-green-600">{formData.incidentDescription}</span></p>
                  <p><strong className="text-green-700">Uploaded Documents:</strong> <span className="text-green-600">{formData.documents.length}</span></p>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button onClick={handlePrevious} variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
              Previous
            </Button>
          )}
          {step < 4 ? (
            <Button onClick={handleNext} className="ml-auto bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="ml-auto bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
              Submit Report
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}