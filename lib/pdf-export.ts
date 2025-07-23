export async function exportToPDF(elementId: string, filename = "resume.pdf") {
  try {
    // Dynamic import to avoid SSR issues
    const html2canvas = (await import("html2canvas")).default
    const jsPDF = (await import("jspdf")).default

    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error("Element not found")
    }

    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    const imgX = (pdfWidth - imgWidth * ratio) / 2
    const imgY = 0

    pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)
    pdf.save(filename)
  } catch (error) {
    console.error("Error exporting PDF:", error)
    alert("Error exporting PDF. Please try again.")
  }
}
