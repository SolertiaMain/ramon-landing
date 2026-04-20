import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    await resend.emails.send({
      from: "onboarding@resend.dev", // temporal
      to: process.env.CONTACT_TO,
      subject: `Nuevo contacto desde la web: ${nombre}`,
      reply_to: correo,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
          <h2>Nuevo contacto desde la web</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Correo:</strong> ${correo}</p>
          <p><strong>Teléfono:</strong> ${telefono}</p>
          <p><strong>Motivo:</strong></p>
          <div style="padding:12px;border:1px solid #eee;border-radius:10px;background:#fafafa;">
            ${motivo.replace(/\n/g, "<br/>")}
          </div>
        </div>
      `,
    });

    return Response.json({ ok: true });

  } catch (e) {
    console.error("ERROR EN /api/contact:", e);
    return Response.json(
      { error: e?.message || "Error enviando el mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }
}