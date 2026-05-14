/**
 * UBIQUE — Google Apps Script for form submissions
 *
 * Writes one row per reservation:
 *   Timestamp | Name | Phone | Email | City | Pincode | Plan | Variant
 *
 * The Variant column tags which landing variant the submission came from
 * (v1 or v2) so A/B conversion can be measured directly in the sheet.
 *
 * HOW TO DEPLOY:
 * 1. Open https://script.google.com → your existing project (the one whose
 *    Web App URL is set as FORM_ENDPOINT on Vercel).
 * 2. Replace the entire file contents with this version.
 * 3. Click Deploy → Manage deployments → pick the active web app → ✎ Edit
 *    → Version: "New version" → Deploy. The URL stays the same.
 *    (Do NOT create a new deployment — that gives a new URL and breaks the env var.)
 * 4. Existing rows in the sheet are untouched; the header row picks up the new
 *    columns lazily — see HEADERS array below.
 */

const HEADERS = ["Timestamp", "Name", "Phone", "Email", "City", "Pincode", "Plan", "Variant"];

function doGet(e) {
  try {
    const p = e.parameter;

    // SHEET_ID: open the sheet, copy the long ID from the URL (between /d/ and /edit).
    const sheet = SpreadsheetApp.openById("PASTE_YOUR_SHEET_ID_HERE").getActiveSheet();

    // Backfill / repair header row so the new Variant + Pincode columns get titles.
    const lastCol = sheet.getLastColumn();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    } else if (lastCol < HEADERS.length) {
      sheet.getRange(1, lastCol + 1, 1, HEADERS.length - lastCol).setValues([HEADERS.slice(lastCol)]).setFontWeight("bold");
    }

    sheet.appendRow([
      new Date(),
      p.name || "",
      p.phone || "",
      p.email || "",
      p.city || "",
      p.pincode || "",
      p.plan || "",
      p.variant || "",
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

// Run this in the Apps Script editor to test without redeploying
function testDoGet() {
  const mockEvent = {
    parameter: {
      name: "Test User",
      phone: "9999999999",
      email: "test@example.com",
      city: "Mumbai",
      pincode: "400001",
      plan: "A",
      variant: "v1",
    },
  };
  const result = doGet(mockEvent);
  Logger.log(result.getContent());
}
