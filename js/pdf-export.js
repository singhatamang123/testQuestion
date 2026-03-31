// // js/pdf-export.js - Clean & Professional PDF (No emoji issues)

// function exportToPDF(studentName, studentClass, score, totalQuestions) {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF('p', 'mm', 'a4');
    
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();

//     // Blue Header
//     doc.setFillColor(59, 130, 246);
//     doc.rect(0, 0, pageWidth, 55, 'F');

//     // Title
//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(28);
//     doc.text("Alchemist Academy", pageWidth / 2, 28, { align: "center" });
    
//     doc.setFontSize(16);
//     doc.text("Jorpati, Gokarneshwor - 44600", pageWidth / 2, 42, { align: "center" });

//     // Student Details
//     doc.setTextColor(0, 0, 0);
//     doc.setFontSize(13);
    
//     let y = 75;
//     doc.text(`Student Name : ${studentName}`, 25, y);
//     y += 11;
//     doc.text(`Class          : ${studentClass}`, 25, y);
//     y += 11;
//     doc.text(`Date           : ${new Date().toLocaleDateString('en-GB')}`, 25, y);

//     y += 28;

//     // Score
//     doc.setFontSize(58);
//     doc.setTextColor(59, 130, 246);
//     doc.text(`${score}/${totalQuestions}`, pageWidth / 2, y, { align: "center" });

//     y += 22;
//     doc.setFontSize(15);
//     doc.setTextColor(0, 0, 0);
//     doc.text("Marks Obtained", pageWidth / 2, y, { align: "center" });

//     y += 28;

//     // Clean Remark (No emojis)
//     const percentage = Math.round((score / totalQuestions) * 100);
//     let remark = "";
//     if (percentage >= 80) {
//         remark = "Excellent Performance";
//     } else if (percentage >= 60) {
//         remark = "Good Job!";
//     } else {
//         remark = "Keep Practicing";
//     }

//     doc.setFontSize(17);
//     doc.text(remark, pageWidth / 2, y, { align: "center" });

//     y += 12;
//     doc.setFontSize(12);
//     doc.text(`${percentage}%`, pageWidth / 2, y, { align: "center" });

//     // y += 35;
//     // doc.setFontSize(11);
//     // doc.text("This is a computer-generated result from MCQ Master.", 25, y);

//     // Footer
//     doc.setFontSize(10);
//     doc.setTextColor(100, 100, 100);
//     doc.text("Thank you for taking the test!", pageWidth / 2, pageHeight - 18, { align: "center" });

//     // Save PDF
//     const fileName = `${studentName.replace(/[^a-zA-Z0-9]/g, '_')}_Class${studentClass}_MCQ_Result.pdf`;
//     doc.save(fileName);

//     console.log(`✅ PDF downloaded successfully: ${fileName}`);
// }




// js/pdf-export.js - New Professional Alchemist Academy Certificate

function exportToPDF(studentName, studentClass, score, totalQuestions) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // ====================== LOAD LOGO ======================
    fetch('./js/logo-removebg-preview.png')
        .then(response => response.blob())
        .then(blob => {
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        })
        .then(logoBase64 => generatePDF(doc, pageWidth, pageHeight, logoBase64, studentName, studentClass, score, totalQuestions))
        .catch(() => generatePDF(doc, pageWidth, pageHeight, null, studentName, studentClass, score, totalQuestions));
}

function generatePDF(doc, pageWidth, pageHeight, logoBase64, studentName, studentClass, score, totalQuestions) {

    // === NAVY BLUE HEADER ===
    doc.setFillColor(0, 51, 102);          // Professional navy blue
    doc.rect(0, 0, pageWidth, 68, 'F');

    // School Logo (Left side)
    if (logoBase64) {
        doc.addImage(logoBase64, 'PNG', 18, 8, 52, 52);
    } else {
        doc.setFontSize(36);
        doc.setTextColor(255, 215, 0);     // Gold
        doc.text("AA", 32, 42);
    }

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("ALCHEMIST ACADEMY", pageWidth/2 + 10, 32, { align: "center" });
    
    doc.setFontSize(13);
    doc.text("Jorpati, Gokarneshwor - 44600", pageWidth/2 + 10, 44, { align: "center" });

    // Certificate Title
    doc.setFontSize(15);
    doc.text("Phone: 01-4912267", pageWidth/2, 54, { align: "center" });

    // === STUDENT DETAILS BOX ===
    let y = 85;
    doc.setDrawColor(0, 51, 102);
    doc.setLineWidth(0.8);
    doc.rect(20, y, pageWidth - 40, 38, 'S');   // Border

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Student Name :", 30, y + 12);
    doc.text(studentName, 85, y + 12);

    doc.text("Class :", 30, y + 22);
    doc.text(studentClass.toString(), 85, y + 22);

    doc.text("Date :", 30, y + 32);
    doc.text(new Date().toLocaleDateString('en-GB'), 85, y + 32);

    // === RESULT SUMMARY BOX ===
    y += 55;
    doc.setFillColor(245, 245, 245);
    doc.rect(20, y, pageWidth - 40, 55, 'FD');   // Light shaded box

    // Score
    doc.setFontSize(58);
    doc.setTextColor(0, 51, 102);
    doc.text(`${score}/${totalQuestions}`, pageWidth/2, y + 38, { align: "center" });

    // === REMARK (instead of Percentage & Grade) ===
    const percentage = Math.round((score / totalQuestions) * 100);
    let remark = "";
    if (percentage >= 80) {
        remark = "Excellent Performance";
    } else if (percentage >= 60) {
        remark = "Good Job!";
    } else {
        remark = "Keep Practicing";
    }

    y += 68;
    doc.setFontSize(19);
    doc.setTextColor(0, 0, 0);
    doc.text(remark, pageWidth / 2, y, { align: "center" });

    

    // Signature line
    y = pageHeight - 22;
    doc.setLineWidth(0.5);
    doc.line(30, y, 90, y);                    // Signature line
    doc.text("Principal / Examiner", 32, y + 5);

    // Save
    const fileName = `${studentName.replace(/[^a-zA-Z0-9]/g, '_')}_Class${studentClass}_Alchemist_Academy.pdf`;
    doc.save(fileName);

    console.log("✅ Professional Certificate Generated");
}