/**
 * UBIQUE - Google Apps Script for form submissions.
 *
 * Writes one row per reservation:
 *   Timestamp | Name | Phone | Email | City | Pincode | Plan | Variant
 *
 * The Variant column tags which landing variant the submission came from
 * (v1 or v2) so A/B conversion can be measured directly in the sheet.
 *
 * DEPLOY:
 * 1. Open script.google.com -> your existing project (the one whose web
 *    app URL is set as FORM_ENDPOINT on Vercel).
 * 2. Replace the entire file with this version.
 * 3. Paste your Google Sheet ID into SHEET_ID below (the long string in the
 *    sheet URL between /d/ and /edit).
 * 4. Save (Cmd+S). Do NOT click Run.
 * 5. Deploy -> Manage deployments -> pencil on the active web app -> Version:
 *    "New version" -> Deploy. The URL stays the same so FORM_ENDPOINT on
 *    Vercel does not need updating.
 *
 * Existing rows are untouched. The header row picks up the new Pincode +
 * Variant columns on the next submission.
 */

var SHEET_ID = "PASTE_YOUR_SHEET_ID_HERE";
var HEADERS = ["Timestamp", "Name", "Phone", "Email", "City", "Pincode", "Plan", "Variant"];

function doGet(e) {
  try {
    var p = e.parameter;
    var sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    var lastCol = sheet.getLastColumn();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    } else if (lastCol < HEADERS.length) {
      sheet.getRange(1, lastCol + 1, 1, HEADERS.length - lastCol)
        .setValues([HEADERS.slice(lastCol)])
        .setFontWeight("bold");
    }

    sheet.appendRow([
      new Date(),
      p.name || "",
      p.phone || "",
      p.email || "",
      p.city || "",
      p.pincode || "",
      p.plan || "",
      p.variant || ""
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

// Pick this function from the dropdown in the script editor and click Run to
// dry-test without redeploying. It writes one test row to the sheet.
function testDoGet() {
  var mockEvent = {
    parameter: {
      name: "Test User",
      phone: "9999999999",
      email: "test@example.com",
      city: "Mumbai",
      pincode: "400001",
      plan: "A",
      variant: "v1"
    }
  };
  var result = doGet(mockEvent);
  Logger.log(result.getContent());
}
