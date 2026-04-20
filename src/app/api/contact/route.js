import { Resend } from "resend";

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

    const apiKey = process.env.RESEND_API_KEY;
    const contactTo = process.env.CONTACT_TO;

    if (!apiKey || !contactTo) {
      return Response.json(
        { error: "Faltan variables de entorno (RESEND_API_KEY o CONTACT_TO)." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev", // temporal
      to: contactTo,
      subject: `Nuevo contacto desde la web: ${nombre}`,
      replyTo: correo,
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

    if (error) {
      console.error("RESEND ERROR:", error);
      return Response.json(
        { error: "Error enviando el mensaje." },
        { status: 500 }
      );
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error("ERROR EN /api/contact:", e);
    return Response.json(
      { error: e?.message || "Error enviando el mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }
}