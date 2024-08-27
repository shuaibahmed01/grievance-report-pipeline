"use client";

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Upload } from "lucide-react"
import { renderFileUploadStep, FileUploadKeys } from './FileUploadStep';
import { useRouter } from 'next/navigation';

export default function Component() {
  const router = useRouter();
  const [step, setStep] = useState(1)
  interface FormData {
    [key: string]: string | File[];
    patientName: string;
    patientId: string;
    dateOfBirth: string;
    incidentDate: string;
    incidentDescription: string;
  }
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    dateOfBirth: "",
    incidentDate: "",
    incidentDescription: "",
    insuranceIds: [] as File[],
    medicalHistory: [] as File[],
    treatmentPlans: [] as File[],
    consentForms: [] as File[],
    preauthorizations: [] as File[],
    xrays: [] as File[],
    perioChart: [] as File[],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, documentType: FileUploadKeys) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        [documentType]: [
          ...prev[documentType],
          ...Array.from(e.target.files || []).map(file => ({ name: file.name, file }))
        ]
      }))
    }
  }

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 10))
  }

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store the form data in localStorage or a state management solution
    localStorage.setItem('grievanceFormData', JSON.stringify(formData));
    // Navigate to the summary page
    router.push('/grievance-summary');
  }

  type FileUploadKeys = 'insuranceIds' | 'medicalHistory' | 'treatmentPlans' | 'consentForms' | 'preauthorizations' | 'xrays' | 'perioChart';


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl mx-auto shadow-lg bg-white bg-opacity-80 backdrop-blur-md">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">Patient Grievance Report</CardTitle>
          <Progress value={(step / 10) * 100} className="w-full mt-4 bg-white bg-opacity-30"/>
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
                <h3 className="text-lg font-semibold text-blue-700">Incident Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="incidentDate" className="text-blue-600">Incident Date</Label>
                  <Input
                    id="incidentDate"
                    name="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={handleInputChange}
                    required
                    className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="incidentDescription" className="text-blue-600">Incident Description</Label>
                  <Textarea
                    id="incidentDescription"
                    name="incidentDescription"
                    value={formData.incidentDescription}
                    onChange={handleInputChange}
                    required
                    className="min-h-[100px] border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {step === 3 && renderFileUploadStep({ title: "Insurance/IDs", documentType: "insuranceIds", formData, handleFileUpload })}
            {step === 4 && renderFileUploadStep({ title: "Patient Medical History", documentType: "medicalHistory", formData, handleFileUpload })}
            {step === 5 && renderFileUploadStep({ title: "Treatment Plans", documentType: "treatmentPlans", formData, handleFileUpload })}
            {step === 6 && renderFileUploadStep({ title: "Consent Forms", documentType: "consentForms", formData, handleFileUpload })}
            {step === 7 && renderFileUploadStep({ title: "Preauthorizations", documentType: "preauthorizations", formData, handleFileUpload })}
            {step === 8 && renderFileUploadStep({ title: "X-Rays", documentType: "xrays", formData, handleFileUpload })}
            {step === 9 && renderFileUploadStep({ title: "Perio Chart", documentType: "perioChart", formData, handleFileUpload })}

            {step === 10 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-700">Review and Submit</h3>
                <div className="space-y-2 bg-blue-50 p-4 rounded-lg">
                  <p><strong className="text-blue-700">Patient Name:</strong> <span className="text-blue-600">{formData.patientName}</span></p>
                  <p><strong className="text-blue-700">Patient ID:</strong> <span className="text-blue-600">{formData.patientId}</span></p>
                  <p><strong className="text-blue-700">Date of Birth:</strong> <span className="text-blue-600">{formData.dateOfBirth}</span></p>
                  <p><strong className="text-blue-700">Incident Date:</strong> <span className="text-blue-600">{formData.incidentDate}</span></p>
                  <p><strong className="text-blue-700">Incident Description:</strong> <span className="text-blue-600">{formData.incidentDescription}</span></p>
                  <p><strong className="text-blue-700">Uploaded Documents:</strong> <span className="text-blue-600">
                    {Object.values(formData).filter(Array.isArray).reduce((total, arr) => total + arr.length, 0)}
                    </span></p>
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
          {step < 10 ? (
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