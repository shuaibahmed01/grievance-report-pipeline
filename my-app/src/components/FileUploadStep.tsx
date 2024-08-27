import React from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"

export type FileUploadKeys = 'insuranceIds' | 'medicalHistory' | 'treatmentPlans' | 'consentForms' | 'preauthorizations' | 'xrays' | 'perioChart';

interface FormData {
  [key: string]: string | File[];
  insuranceIds: File[];
  medicalHistory: File[];
  treatmentPlans: File[];
  consentForms: File[];
  preauthorizations: File[];
  xrays: File[];
  perioChart: File[];
}

interface FileUploadStepProps {
  title: string;
  documentType: FileUploadKeys;
  formData: FormData;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, documentType: FileUploadKeys) => void;
}

export const renderFileUploadStep = (props: FileUploadStepProps) => {
  const { title, documentType, formData, handleFileUpload } = props;
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-blue-700">{title}</h3>
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
              onChange={(e) => handleFileUpload(e, documentType)}
              className="hidden"
            />
          </Label>
        </div>
      </div>
      {formData[documentType].length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2 text-blue-700">Uploaded {title}:</h4>
          <ul className="list-disc pl-5 text-blue-600">
            {(formData[documentType] as File[]).map((doc: File, index: number) => (
              <li key={index}>{doc.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};