/**
 * Van Kiff · Descubrí tu Blend — recolector de leads en Google Sheets.
 *
 * Cómo usar:
 * 1. Crear una Google Sheet nueva (o usar una existente).
 * 2. Extensiones → Apps Script. Pegar TODO este archivo.
 * 3. Implementar → Nueva implementación → Tipo: "Aplicación web".
 *      - Ejecutar como: Yo
 *      - Quién tiene acceso: Cualquier usuario
 * 4. Copiar la URL del Web App (termina en /exec) y ponerla en la
 *    env var SHEETS_WEBHOOK_URL de la app (Azure).
 *
 * La app postea JSON: { ts, nombre, email, telefono, edad, genero, blend, personalidad }
 */

var SHEET_NAME = "Leads";
var HEADERS = ["Fecha", "Nombre", "Email", "Teléfono", "Edad", "Género", "Blend", "Personalidad"];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();
    sheet.appendRow([
      data.ts || new Date().toISOString(),
      data.nombre || "",
      data.email || "",
      data.telefono || "",
      data.edad || "",
      data.genero || "",
      data.blend || "",
      data.personalidad || "",
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Útil para probar la URL en el navegador (GET).
function doGet() {
  return json_({ ok: true, msg: "Van Kiff leads webhook activo" });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
