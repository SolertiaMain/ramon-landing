// scripts/generate-pdfs.mjs
// Scans public/files/certificaciones and generates src/content/generated/pdfs.json
// Optional per-file metadata: <name>.meta.json next to the PDF to override title/subtitle.

import fs from "fs";
import path from "path";

const projectRoot = process.cwd();

const CERTS_DIR = path.join(projectRoot, "public", "files", "certificaciones");
const META_REGISTRY_FILE = path.join(CERTS_DIR, "_meta.json");
const OUT_DIR = path.join(projectRoot, "src", "content", "generated");
const OUT_FILE = path.join(OUT_DIR, "pdfs.json");

const toId = (filename) =>
    filename
        .replace(/\.pdf$/i, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const humanize = (filename) =>
    filename
        .replace(/\.pdf$/i, "")
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

function readMetaRegistry() {
    if (!fs.existsSync(META_REGISTRY_FILE)) return {};

    try {
        const raw = fs.readFileSync(META_REGISTRY_FILE, "utf8");
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch (e) {
        console.warn(`⚠️ Could not parse registry meta file: ${META_REGISTRY_FILE}`);
        return {};
    }
}

function readOptionalMeta(pdfPath) {
    const base = pdfPath.replace(/\.pdf$/i, "");
    const metaPath = `${base}.meta.json`;

    if (!fs.existsSync(metaPath)) return null;

    try {
        const raw = fs.readFileSync(metaPath, "utf8");
        return JSON.parse(raw);
    } catch (e) {
        console.warn(`⚠️ Could not parse meta file: ${metaPath}`);
        return null;
    }
}

function main() {
    if (!fs.existsSync(CERTS_DIR)) {
        console.error(`❌ Directory not found: ${CERTS_DIR}`);
        process.exit(1);
    }

    if (!fs.existsSync(OUT_DIR)) {
        fs.mkdirSync(OUT_DIR, { recursive: true });
    }

    const registry = readMetaRegistry();

    const files = fs
        .readdirSync(CERTS_DIR)
        .filter((f) => f.toLowerCase().endsWith(".pdf"))
        .sort((a, b) => a.localeCompare(b));

    const certs = files.map((file) => {
        const absPdfPath = path.join(CERTS_DIR, file);

        const perFileMeta = readOptionalMeta(absPdfPath);

        // Unicode-safe registry lookup (Windows filenames can differ in normalization)
        const norm = (s) => (s ?? "").normalize("NFC").trim();
        const registryMeta =
            registry[file] ??
            registry[norm(file)] ??
            (() => {
                const target = norm(file);
                for (const k of Object.keys(registry)) {
                    if (norm(k) === target) return registry[k];
                }
                return null;
            })();

        // registry overrides per-file meta if both exist
        const meta = { ...(perFileMeta ?? {}), ...(registryMeta ?? {}) };


        const id = meta?.id ?? toId(file);
        const title = meta?.title ?? humanize(file);
        const subtitle = meta?.subtitle ?? "";
        const href = `/files/certificaciones/${file}`;

        return {
            id,
            title,
            subtitle,
            href,
            type: "Certificación",
        };
    });

    const payload = {
        generatedAt: new Date().toISOString(),
        certs,
    };

    fs.writeFileSync(OUT_FILE, JSON.stringify(payload, null, 2), "utf8");
    console.log(`✅ Generated ${OUT_FILE} with ${certs.length} PDFs`);
}

main();
