/**
 * UBIQUE — Google Apps Script for form submissions
 *
 * HOW TO USE:
 * 1. Go to https://script.google.com
 * 2. Create a new project (or open one linked to a Google Sheet)
 * 3. Paste this entire file in
 * 4. Click Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL
 * 6. In Vercel dashboard → ubique-landing → Settings → Environment Variables
 *    Add: FORM_ENDPOINT = <paste the URL here>
 * 7. Redeploy on Vercel (push a commit or trigger manually)
 *
 * The script will append one row per reservation to the active sheet:
 * Timestamp | Name | Phone | Email | City | Plan
 */

function doGet(e) {
  try {
    const p = e.parameter;

    const sheet = SpreadsheetApp.openById("PASTE_YOUR_SHEET_ID_HERE").getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Phone", "Email", "City", "Plan"]);
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
    }

    sheet.appendRow([
      new Date(),
      p.name || "",
      p.phone || "",
      p.email || "",
      p.city || "",
      p.plan || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Run this in the Apps Script editor to test without deploying
function testDoGet() {
  const mockEvent = {
    parameter: {
      name: "Test User",
      phone: "9999999999",
      email: "test@example.com",
      city: "Mumbai",
      plan: "Essential — ₹7,999 / month",
    },
  };
  const result = doGet(mockEvent);
  Logger.log(result.getContent());
}
