// js/pdf-export.js - Clean & Professional PDF (No emoji issues)

function exportToPDF(studentName, studentClass, score, totalQuestions) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Blue Header
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, pageWidth, 55, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text("MCQ MASTER", pageWidth / 2, 28, { align: "center" });
    
    doc.setFontSize(16);
    doc.text("20 Marks Achievement Certificate", pageWidth / 2, 42, { align: "center" });

    // Student Details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(13);
    
    let y = 75;
    doc.text(`Student Name : ${studentName}`, 25, y);
    y += 11;
    doc.text(`Class          : ${studentClass}`, 25, y);
    y += 11;
    doc.text(`Date           : ${new Date().toLocaleDateString('en-GB')}`, 25, y);

    y += 28;

    // Score
    doc.setFontSize(58);
    doc.setTextColor(59, 130, 246);
    doc.text(`${score}/${totalQuestions}`, pageWidth / 2, y, { align: "center" });

    y += 22;
    doc.setFontSize(15);
    doc.setTextColor(0, 0, 0);
    doc.text("Marks Obtained", pageWidth / 2, y, { align: "center" });

    y += 28;

    // Clean Remark (No emojis)
    const percentage = Math.round((score / totalQuestions) * 100);
    let remark = "";
    if (percentage >= 80) {
        remark = "Excellent Performance";
    } else if (percentage >= 60) {
        remark = "Good Job!";
    } else {
        remark = "Keep Practicing";
    }

    doc.setFontSize(17);
    doc.text(remark, pageWidth / 2, y, { align: "center" });

    y += 12;
    doc.setFontSize(12);
    doc.text(`${percentage}%`, pageWidth / 2, y, { align: "center" });

    y += 35;
    doc.setFontSize(11);
    doc.text("This is a computer-generated result from MCQ Master.", 25, y);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for taking the test!", pageWidth / 2, pageHeight - 18, { align: "center" });

    // Save PDF
    const fileName = `${studentName.replace(/[^a-zA-Z0-9]/g, '_')}_Class${studentClass}_MCQ_Result.pdf`;
    doc.save(fileName);

    console.log(`✅ PDF downloaded successfully: ${fileName}`);
}