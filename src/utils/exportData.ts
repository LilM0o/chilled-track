// Utility functions for exporting data in different formats
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes
        return typeof value === 'string' && (value.includes(',') || value.includes('"'))
          ? `"${value.replace(/"/g, '""')}"`
          : value;
      }).join(',')
    )
  ].join('\n');

  downloadFile(csvContent, `${filename}.csv`, 'text/csv');
};

export const exportToXLSX = (data: any[], filename: string) => {
  if (data.length === 0) return;

  // Create worksheet from data
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Auto-size columns for better readability
  const maxWidths: number[] = [];
  const headers = Object.keys(data[0]);
  
  headers.forEach((header, colIndex) => {
    maxWidths[colIndex] = header.length;
    data.forEach(row => {
      const value = String(row[header] || '');
      if (value.length > maxWidths[colIndex]) {
        maxWidths[colIndex] = value.length;
      }
    });
  });

  worksheet['!cols'] = maxWidths.map(width => ({ wch: Math.min(width + 2, 50) }));

  // Create workbook and add worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Export');

  // Generate and download file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportToPDF = (data: any[], filename: string) => {
  if (data.length === 0) return;

  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(16);
  doc.text('Export des données', 14, 15);
  
  doc.setFontSize(10);
  doc.text(`Date d'export: ${new Date().toLocaleString('fr-FR')}`, 14, 22);
  
  // Prepare table data
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(header => String(row[header] || '')));
  
  // Generate table
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 28,
    styles: {
      fontSize: 9,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [66, 66, 66],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { top: 28 },
  });
  
  // Add footer with page numbers
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(
      `Page ${i} sur ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  // Save PDF
  doc.save(`${filename}.pdf`);
};

const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
