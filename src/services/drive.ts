import { drive } from "@/lib/google";

export async function getFileInfo(fileName: string) {
  try {
    const response = await drive.files.list({
      q: `name contains '${fileName}' and trashed = false`,
      fields: "files(id, name)",
    });

    const files = response.data.files;

    if (!files || files.length === 0) {
      return { error: "Ficheiro não encontrado." };
    }

    return {
      id: files[0].id,
      name: files[0].name,
    };
  } catch (error) {
    console.error("Erro ao procurar metadados no Drive:", error);
    return { error: "Falha na comunicação com o Google Drive." };
  }
}
