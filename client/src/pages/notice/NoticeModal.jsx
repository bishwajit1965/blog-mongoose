import { FaRegFilePdf, FaTimes } from "react-icons/fa";

import Button from "../../components/buttons/Button";
import jsPDF from "jspdf";
import logo from "/assets/favicon/webDevProF.png"; // Import your logo

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const NoticeModal = ({ notice, onClose }) => {
  const { title, heading, subject, noticeDate, content, pdfUrl } = notice;

  const fileUrl = pdfUrl ? `${apiUrl}${pdfUrl}` : null;

  const handleGeneratePdf = async () => {
    const doc = new jsPDF({
      unit: "in",
      format: "a4",
    });

    const margin = { top: 1.2, bottom: 1, left: 1, right: 1 };
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const usableWidth = pageWidth - margin.left - margin.right;

    let y = margin.top + 1.3;
    // let pageNumber = 1;
    const pages = [];

    const drawLetterhead = () => {
      const logoWidth = 1;
      const logoHeight = 1;

      doc.addImage(
        logo,
        "PNG",
        margin.left,
        margin.top - 0.8,
        logoWidth,
        logoHeight
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor("#000");
      doc.text("WebDevPro Foundation", margin.left + 1.2, margin.top - 0.4);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor("#333");
      doc.text(
        "123 Developer Lane, Code City, 456789",
        margin.left + 1.2,
        margin.top - 0.15
      );
      doc.text(
        "Email: contact@webdevpro.org | Phone: +91 98765 43210",
        margin.left + 1.2,
        margin.top + 0.1
      );

      doc.setDrawColor(180);
      doc.setLineWidth(0.01);
      doc.line(
        margin.left,
        margin.top + 0.3,
        pageWidth - margin.right,
        margin.top + 0.3
      );
    };

    const drawWatermark = () => {
      doc.saveGraphicsState?.();
      doc.setTextColor(220);
      doc.setFontSize(60);
      doc.setFont("helvetica", "italic");
      doc.text("WEBDEVPRO", pageWidth / 2, pageHeight / 1.5, {
        angle: 35,
        align: "center",
      });
      doc.restoreGraphicsState?.();
    };

    const drawFooter = (pageNum, totalPages) => {
      doc.setDrawColor(180);
      doc.setLineWidth(0.005);
      doc.line(
        margin.left,
        pageHeight - 0.6,
        pageWidth - margin.right,
        pageHeight - 0.6
      );

      doc.setFontSize(10);
      doc.setTextColor("#555");
      doc.setFont("helvetica", "italic");
      doc.text(
        "© 2025 WebDevPro Foundation | www.webdevpro.org",
        pageWidth / 2,
        pageHeight - 0.4,
        { align: "center" }
      );
      doc.text(
        `Page ${pageNum} of ${totalPages}`,
        pageWidth - margin.right,
        pageHeight - 0.4,
        { align: "right" }
      );
    };

    drawLetterhead();
    drawWatermark();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor("#000");
    const titleLines = doc.splitTextToSize(notice.title, usableWidth);
    titleLines.forEach((line) => {
      doc.text(line, margin.left, y);
      y += 0.3;
    });
    y += 0.2;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);

    if (title) {
      doc.text(`Title: ${title}`, margin.left, y);
      y += 0.3;
    }

    if (notice.subject) {
      doc.text(`Subject: ${notice.subject}`, margin.left, y);
      y += 0.3;
    }

    if (notice.author) {
      doc.text(`Author: ${notice.author}`, margin.left, y);
      y += 0.3;
    }

    if (notice.noticeDate) {
      const rawDate = new Date(notice.noticeDate);
      const formattedDate = rawDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      doc.text(`Date: ${formattedDate}`, margin.left, y);
      y += 0.4;
    }

    if (!notice.subject && !notice.author && !notice.noticeDate) {
      y += 0.5;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#555");
    doc.text("Notice Content", margin.left, y);
    y += 0.3;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor("#000");

    const contentLines = doc.splitTextToSize(notice.content, usableWidth);
    const lineHeight = 0.22;

    for (let i = 0; i < contentLines.length; i++) {
      if (y + lineHeight > pageHeight - margin.bottom - 1) {
        pages.push(doc.internal.getCurrentPageInfo().pageNumber);
        doc.addPage();
        // pageNumber++;
        y = margin.top + 1.3;

        drawLetterhead();
        drawWatermark();

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor("#000");
      }
      doc.text(contentLines[i], margin.left, y);
      y += lineHeight;
    }

    // Signature block (only last page)
    y += 0.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Sincerely,", margin.left, y);
    y += 0.3;
    doc.text("Bishwajit Paul", margin.left, y);
    y += 0.25;
    doc.text("Super Admin, WebDevPro Foundation", margin.left, y);

    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      drawFooter(i, totalPages);
    }

    doc.save(`${notice.title.replace(/\s+/g, "_")}.pdf`);
  };

  // Download the PDF file if uploaded as notice
  const handleDownloadPDF = async () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
      return;
    }

    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text(heading, 10, 20);
    pdf.setFontSize(12);
    pdf.text(`Date: ${new Date(noticeDate).toLocaleDateString()}`, 10, 30);
    pdf.text(subject, 10, 40);
    pdf.text(content, 10, 50, { maxWidth: 180 });

    pdf.save(`${heading}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/2 max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4">{heading}</h2>
        <p className="text-sm mb-2">
          Date: {new Date(noticeDate).toLocaleDateString()}
        </p>
        <h3 className="font-semibold mb-2">{subject}</h3>
        <div className="max-h-60 overflow-y-auto mb-4">
          <p className="mb-4">{content}</p>
        </div>
        <div className="">
          {fileUrl && (
            <>
              <div className="">
                <embed
                  src={fileUrl}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-5">
          <Button
            onClick={onClose}
            label="Close"
            icon={<FaTimes />}
            variant="danger"
            className="btn btn-sm"
          />

          <Button
            onClick={handleGeneratePdf}
            label="Generate PDF"
            icon={<FaRegFilePdf />}
            className="btn btn-sm"
          />

          {pdfUrl && (
            <Button
              className="btn btn-sm"
              onClick={handleDownloadPDF}
              label="Download PDF"
            >
              Download as PDF
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;
