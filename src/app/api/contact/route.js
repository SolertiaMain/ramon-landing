import nodemailer from "nodemailer";

export const runtime = "nodejs";

function isEmail(s = "") {
  return typeof s === "string" && s.includes("@") && s.includes(".");
}

export async function POST(req) {
  try {
    const body = await req.json();

    const nombre = (body?.nombre || "").trim();
    const correo = (body?.correo || "").trim();
    const telefono = (body?.telefono || "").trim();
    const motivo = (body?.motivo || "").trim();

    if (!nombre || !isEmail(correo) || telefono.length < 7 || motivo.length < 4) {
      return Response.json(
        { error: "Datos inválidos. Revisa el formulario." },
        { status: 400 }
      );
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO,
      CONTACT_FROM,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
      return Response.json(
        { error: "Faltan variables de entorno del correo (SMTP_*, CONTACT_TO)." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, 
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const subject = `Nuevo contacto desde la web: ${nombre}`;
    const text = [
      `Nombre: ${nombre}`,
      `Correo: ${correo}`,
      `Teléfono: ${telefono}`,
      "",
      "Motivo:",
      motivo,
    ].join("\n");

    await transporter.sendMail({
    from: CONTACT_FROM || `Sitio Web Ramón Cuevas <${SMTP_USER}>`,
    to: CONTACT_TO,
    replyTo: correo,
    subject,
    text,
    html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 12px 0;">Nuevo contacto desde la web</h2>
        <p style="margin:0 0 10px 0;"><strong>Nombre:</strong> ${nombre}</p>
        <p style="margin:0 0 10px 0;"><strong>Correo:</strong> ${correo}</p>
        <p style="margin:0 0 10px 0;"><strong>Teléfono:</strong> ${telefono}</p>
        <p style="margin:16px 0 6px 0;"><strong>Motivo:</strong></p>
        <div style="padding:12px;border:1px solid #eee;border-radius:10px;background:#fafafa;">
            ${motivo.replace(/\n/g, "<br/>")}
        </div>
        </div>
    `,
    });

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json(
      { error: "Error enviando el mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }
}