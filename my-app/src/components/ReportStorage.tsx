"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function GrievanceSummary() {
  const [formData, setFormData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('grievanceFormData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl mx-auto shadow-lg bg-white bg-opacity-80 backdrop-blur-md">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">Grievance Report Summary</CardTitle>
        </CardHeader>
        <CardContent className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-blue-700">Patient Information</h3>
          <p><strong>Name:</strong> {formData.patientName}</p>
          <p><strong>ID:</strong> {formData.patientId}</p>
          <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>

          <h3 className="text-lg font-semibold text-blue-700 mt-6">Incident Details</h3>
          <p><strong>Date:</strong> {formData.incidentDate}</p>
          <p><strong>Description:</strong> {formData.incidentDescription}</p>

          <h3 className="text-lg font-semibold text-blue-700 mt-6">Uploaded Documents</h3>
          {Object.entries(formData).filter(([key, value]) => Array.isArray(value) && value.length > 0).map(([key, files]) => (
            <div key={key} className="mb-4">
              <strong className="text-blue-600">{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
              <ul className="list-disc pl-5 mt-2">
                {(files as { name: string; file: File }[]).map((file, index) => (
                  <li key={index} className="text-sm">{file.name}</li>
                ))}
              </ul>
            </div>
          ))}

          <Button 
            onClick={() => router.push('/')} 
            className="mt-6 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
            >
            Back to Form
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}