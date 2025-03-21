import { processAllEpubFiles } from "./convert";

// Start the EPUB to PDF conversion process
processAllEpubFiles().catch((error) => {
    console.error("❌ An error occurred:", error);
});
