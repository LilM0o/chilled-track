// Utility functions for exporting data in different formats

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

export const exportToJSON = (data: any[], filename: string) => {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, `${filename}.json`, 'application/json');
};

export const exportToTXT = (data: any[], filename: string) => {
  // Simple text file export
  const headers = Object.keys(data[0] || {});
  const content = [
    `=== ${filename} ===\n`,
    `Date d'export: ${new Date().toLocaleString('fr-FR')}\n\n`,
    ...data.map((row, idx) => {
      return [
        `Entrée ${idx + 1}:`,
        ...headers.map(header => `  ${header}: ${row[header]}`),
        ''
      ].join('\n');
    })
  ].join('\n');

  downloadFile(content, `${filename}.txt`, 'text/plain');
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
