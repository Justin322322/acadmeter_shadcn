'use client'

import React, { useRef } from 'react'
import { PrinterIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { GradeEntryBase, StudentInfo } from '../types'
import { printElement } from '@/services/print-service'

// Define PASSING_GRADE directly to avoid import issues
const PASSING_GRADE = 75;

interface PrintTemplateProps {
  studentInfo: StudentInfo
  grades: GradeEntryBase[]
  generalAverage: number
  hideButton?: boolean
}

export function PrintTemplate({ studentInfo, grades, generalAverage, hideButton = false }: PrintTemplateProps) {
  // Create a ref for the print content
  const printContentRef = useRef<HTMLDivElement>(null);

  // Function to handle printing
  const handlePrint = () => {
    // Use the print service to print the element
    if (printContentRef.current) {
      printElement({ current: printContentRef.current as HTMLElement }, 'Student Report Card');
    }
  }

  return (
    <>
      {/* Hidden div containing the print content */}
      <div ref={printContentRef} style={{ display: 'none' }}>
        <style type="text/css">
          {`
          body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.3;
            margin: 0;
            padding: 0;
            background: white;
            color: #000;
          }

          .report-card {
            width: 210mm;
            height: 297mm;
            margin: 0 auto;
            padding: 10mm;
            background: white;
            box-sizing: border-box;
            position: relative;
          }

          .report-header {
            margin-bottom: 10mm;
            border-bottom: 1px solid #000;
            padding-bottom: 3mm;
            text-align: center;
          }

          .report-title {
            font-size: 18pt;
            font-weight: bold;
            margin-bottom: 5mm;
            text-align: center;
            color: #000;
            text-transform: uppercase;
          }

          .student-info {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-top: 5mm;
          }

          .student-info-item {
            margin-right: 5mm;
            text-align: left;
            font-size: 12px;
          }

          .info-label {
            font-weight: bold;
            margin-right: 2mm;
          }

          .info-value {
            font-weight: normal;
          }

          .report-content {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            height: calc(100% - 40mm);
          }

          .report-card-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 0;
            border: 1px solid #000;
          }

          .report-card-table th {
            background-color: #f5f5f5;
            font-weight: bold;
            text-align: center;
            padding: 2mm;
            border: 1px solid #000;
            color: #000;
          }

          .report-card-table td {
            padding: 2.5mm;
            text-align: center;
            border: 1px solid #000;
            color: #000;
            font-size: 12px;
            height: 6mm;
          }

          .text-left {
            text-align: left;
          }

          .general-average {
            font-weight: bold;
            background-color: #f5f5f5;
          }

          .passing {
            color: #008000;
            font-weight: bold;
          }

          .failing {
            color: #ff0000;
            font-weight: bold;
          }

          .grading-scale-section {
            margin-top: 15mm;
            border-top: 1px solid #000;
            padding-top: 5mm;
          }

          .descriptors-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
            margin-top: 3mm;
            border: 1px solid #000;
          }

          .descriptors-table th {
            background-color: #f5f5f5;
            font-weight: bold;
            text-align: center;
            padding: 1.5mm;
            border: 1px solid #000;
          }

          .descriptors-table td {
            padding: 1.5mm;
            border: 1px solid #000;
            text-align: center;
          }

          .descriptors-title {
            font-weight: bold;
            margin-bottom: 2mm;
            font-size: 12px;
          }

          .spacer {
            height: 30mm;
          }

          @media print {
            @page {
              size: A4 portrait;
              margin: 0;
            }
            html, body {
              width: 210mm;
              height: 297mm;
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            .report-card {
              width: 210mm;
              height: 297mm;
              margin: 0;
              padding: 10mm;
              box-shadow: none;
              page-break-after: always;
              transform: scale(1);
            }
          }
          `}
        </style>

        <div className="report-card">
          <div className="report-header">
            <div className="report-title">STUDENT REPORT CARD</div>

            <div className="student-info">
              <div className="student-info-item">
                <span className="info-label">Student Name:</span> <span className="info-value">{studentInfo.name}</span>
              </div>
              <div className="student-info-item">
                <span className="info-label">Class Section:</span> <span className="info-value">{studentInfo.section}</span>
              </div>
              <div className="student-info-item">
                <span className="info-label">School Year:</span> <span className="info-value">{studentInfo.schoolYear}</span>
              </div>
            </div>
          </div>

          <div className="report-content">
            <div style={{ border: '1px solid #000', marginBottom: '5mm' }}>
            <table className="report-card-table">
              <thead>
                <tr>
                  <th className="text-left" style={{ width: '35%' }}>LEARNING AREAS</th>
                  <th style={{ width: '10%' }}>Q1</th>
                  <th style={{ width: '10%' }}>Q2</th>
                  <th style={{ width: '10%' }}>Q3</th>
                  <th style={{ width: '10%' }}>Q4</th>
                  <th style={{ width: '12%' }}>FINAL GRADE</th>
                  <th style={{ width: '13%' }}>REMARKS</th>
                </tr>
              </thead>
              <tbody>
                {/* Add empty rows if there are fewer than 8 subjects to ensure consistent height */}
                {[...Array(Math.max(8, grades.length))].map((_, index) => {
                  const grade = index < grades.length ? grades[index] : null;
                  return grade ? (
                    <tr key={index}>
                      <td className="text-left">{grade.subject}</td>
                      <td>{grade.q1 || '-'}</td>
                      <td>{grade.q2 || '-'}</td>
                      <td>{grade.q3 || '-'}</td>
                      <td>{grade.q4 || '-'}</td>
                      <td>{grade.final || '-'}</td>
                      <td className={grade.final >= PASSING_GRADE ? 'passing' : 'failing'}>
                        {grade.final >= PASSING_GRADE ? 'PASSED' : grade.final ? 'FAILED' : '-'}
                      </td>
                    </tr>
                  ) : (
                    <tr key={`empty-${index}`}>
                      <td className="text-left">&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                    </tr>
                  );
                })}
                <tr className="general-average">
                  <td className="text-left">GENERAL AVERAGE</td>
                  <td colSpan={4}></td>
                  <td>{generalAverage}</td>
                  <td className={generalAverage >= PASSING_GRADE ? 'passing' : 'failing'}>
                    {generalAverage >= PASSING_GRADE ? 'PASSED' : 'FAILED'}
                  </td>
                </tr>
              </tbody>
            </table>
            </div>

            {/* No spacer needed - using fixed margin */}

            <div className="grading-scale-section">
              <div className="descriptors-title">GRADING SCALE:</div>
              <table className="descriptors-table">
                <thead>
                  <tr>
                    <th style={{ width: '40%' }}>DESCRIPTORS</th>
                    <th style={{ width: '30%' }}>GRADING SCALE</th>
                    <th style={{ width: '30%' }}>REMARKS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Outstanding</td>
                    <td>90 – 100</td>
                    <td>PASSED</td>
                  </tr>
                  <tr>
                    <td>Very Satisfactory</td>
                    <td>85 – 89</td>
                    <td>PASSED</td>
                  </tr>
                  <tr>
                    <td>Satisfactory</td>
                    <td>80 – 84</td>
                    <td>PASSED</td>
                  </tr>
                  <tr>
                    <td>Fairly Satisfactory</td>
                    <td>75 – 79</td>
                    <td>PASSED</td>
                  </tr>
                  <tr>
                    <td>Did Not Meet Expectations</td>
                    <td>Below 75</td>
                    <td>FAILED</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Print button - only shown when not rendered programmatically */}
      {!hideButton && (
        <Button
          variant="default"
          size="default"
          onClick={handlePrint}
        >
          <PrinterIcon className="w-4 h-4" />
          Print Report Card
        </Button>
      )}
    </>
  );
}
