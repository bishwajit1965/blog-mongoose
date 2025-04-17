import {
  FaExchangeAlt,
  FaExpandArrowsAlt,
  FaFilePdf,
  FaPlusCircle,
} from "react-icons/fa";

import CTAButton from "../../../components/buttons/CTAButton";
import { jsPDF } from "jspdf";
import logo from "/assets/favicon/webDevProF.png"; // Import your logo

const NoticeDetailsView = ({ notice, toggler, isHidden, manageNotice }) => {
  const { _id, title, heading, subject, author, content, pdfUrl } = notice;

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const fileUrl = pdfUrl ? `${apiUrl}${pdfUrl}` : null;

  const handleDownloadNoticeAsPDF = async () => {
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

  return (
    <div className="lg:space-y-4 p-2">
      <p>{_id}</p>
      <h1 className="text-xl font-bold ">{title}</h1>
      <h1 className="text-xl font-bold ">{heading}</h1>
      <h1 className="text-xl font-bold ">{subject}</h1>
      <h1 className="text-xl font-bold ">{author}</h1>
      <div className="overflow-y-auto h-60 p-2 bg-gray-100">
        <p>{content}</p>
      </div>
      <div className="py-2">
        <button
          onClick={handleDownloadNoticeAsPDF}
          className="btn btn-sm btn-primary"
        >
          <FaFilePdf /> Download Notice as PDF
        </button>
      </div>

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

      <div className="flex items-center justify-between sm:space-x-2 p-2">
        {!isHidden && (
          <CTAButton
            onClick={() => manageNotice()}
            label="Go to Create Notice Page"
            icon={<FaPlusCircle />}
            className="m-0 p-2 btn btn-sm"
            variant="primary"
          />
        )}
        <div className="py-2 text-center">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-primary rounded-full"
          >
            <FaFilePdf /> Download Attached PDF
          </a>
        </div>
        <CTAButton
          onClick={() => toggler()}
          label={isHidden ? "Reverse View" : "Expand View"}
          icon={!isHidden ? <FaExpandArrowsAlt /> : <FaExchangeAlt />}
          className="m-0 p-2 btn btn-sm invisible lg:visible "
          variant="primary"
        />
      </div>
    </div>
  );
};

export default NoticeDetailsView;
