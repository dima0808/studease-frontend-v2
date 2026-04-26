const escapeHtml = (value) => {
  const text = value === null || value === undefined ? '' : String(value);

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const csvEscape = (value) => {
  const text = value === null || value === undefined ? '' : String(value);
  return `"${text.replace(/"/g, '""')}"`;
};

const getResultsFilenamePart = (value) =>
  String(value || 'test-results')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'test-results';

const getExportDate = () => new Date().toISOString().slice(0, 10);

const downloadBlob = (content, filename, type) => {
  const blob = new Blob([`\uFEFF${content}`], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const createResultsExcelHtml = ({ testId, testName, sessions }) => `
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #292929;
        }

        table {
          border-collapse: collapse;
          width: 100%;
        }

        .meta th {
          width: 180px;
          background: #f3f6fb;
          font-weight: 700;
          text-align: left;
        }

        .meta th,
        .meta td,
        .results th,
        .results td {
          border: 1px solid #cfd7e3;
          padding: 8px 10px;
        }

        .results th {
          background: #292929;
          color: #ffffff;
          font-weight: 700;
          text-align: left;
        }

        .results td {
          background: #ffffff;
        }

        .score {
          font-weight: 700;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <table class="meta">
        <tr>
          <th>Test ID</th>
          <td>${escapeHtml(testId)}</td>
        </tr>
        <tr>
          <th>Test Name</th>
          <td>${escapeHtml(testName)}</td>
        </tr>
      </table>

      <br />

      <table class="results">
        <thead>
          <tr>
            <th>Group</th>
            <th>Student Full Name</th>
            <th>Score</th>
            <th>Started At</th>
            <th>Finished At</th>
          </tr>
        </thead>
        <tbody>
          ${sessions
            .map(
              (session) => `
                <tr>
                  <td>${escapeHtml(session.studentGroup)}</td>
                  <td>${escapeHtml(session.studentName)}</td>
                  <td class="score">${escapeHtml(session.mark)}</td>
                  <td>${escapeHtml(session.startedAt)}</td>
                  <td>${escapeHtml(session.finishedAt)}</td>
                </tr>
              `,
            )
            .join('')}
        </tbody>
      </table>
    </body>
  </html>
`;

const createCsvRows = ({ testId, testName, sessions }) => [
  ['Test ID', testId],
  ['Test Name', testName],
  [],
  ['Group', 'Student Full Name', 'Score', 'Started At', 'Finished At'],
  ...sessions.map((session) => [
    session.studentGroup,
    session.studentName,
    session.mark,
    session.startedAt,
    session.finishedAt,
  ]),
];

export const exportTestResultsCsv = ({ testId, testName, sessions }) => {
  const rows = createCsvRows({ testId, testName, sessions });
  const csv = rows.map((row) => row.map(csvEscape).join(';')).join('\n');
  const filename = `${getResultsFilenamePart(testName)}-results-${getExportDate()}.csv`;

  downloadBlob(csv, filename, 'text/csv;charset=utf-8;');
};

export const exportTestResultsExcel = ({ testId, testName, sessions }) => {
  const html = createResultsExcelHtml({ testId, testName, sessions });
  const filename = `${getResultsFilenamePart(testName)}-results-${getExportDate()}.xls`;

  downloadBlob(html, filename, 'application/vnd.ms-excel;charset=utf-8;');
};
