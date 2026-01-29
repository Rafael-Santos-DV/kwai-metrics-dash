import { IPage } from "@/domain/user";
import { sheet } from "@/lib/google";

export async function getAllSheetsData(): Promise<{
  previewPages: Array<string>;
  pages: IPage[];
}> {
  try {
    const spreadsheetId = "10BhyTu-nv0T6M75fnkc59vx_KjMlHUgnp4nddM0cyis";

    const spreadsheet = await sheet.spreadsheets.get({
      spreadsheetId,
    });

    const sheetNames = spreadsheet.data.sheets
      ?.map((sheet) => sheet?.properties?.title)
      .filter(Boolean) as string[];

    if (sheetNames.length === 0) return { pages: [], previewPages: [] };

    const response = await sheet.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges: sheetNames.map((name) => `'${name}'!A2:E`),
    });

    const valueRanges = response.data.valueRanges || [];

    const allUsers: Pages[] = valueRanges.map((valueRange, index) => {
      const rows = valueRange.values || [];
      const originalName = sheetNames[index];

      return {
        page: originalName,
        users: rows
          .filter((row) => row[0] || row[1])
          .map((row) => ({
            uid: row[0] ?? "",
            kwaiId: row[1] ?? "",
            agency: row[2] ?? "",
            type: row[3] ?? "",
            date: row[4] ?? "",
          })),
      };
    });

    return { pages: allUsers, previewPages: sheetNames };
  } catch (err) {
    console.error("Erro no Service do Sheets:", err);
    return { pages: [], previewPages: [] };
  }
}
