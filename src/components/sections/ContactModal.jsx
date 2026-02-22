"use client";

import { useEffect, useMemo, useState } from "react";

export default function ContactModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    motivo: "",
  });

  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState("closed"); 

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => {
        setPhase("opening");
        requestAnimationFrame(() => setPhase("open"));
      });
      return;
    }

    if (!open && mounted) {
      setPhase("closing");
      const t = setTimeout(() => {
        setMounted(false);
        setPhase("closed");
      }, 380); 
      return () => clearTimeout(t);
    }
  }, [open, mounted]);

  const canSubmit = useMemo(() => {
    return (
      form.nombre.trim().length > 1 &&
      form.correo.trim().includes("@") &&
      form.telefono.trim().length >= 7 &&
      form.motivo.trim().length > 3
    );
  }, [form]);

  useEffect(() => {
    if (!mounted) return;

    const cls = "modal-open-apple";
    document.body.classList.add(cls);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove(cls);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mounted, onClose]);

  useEffect(() => {
    if (!open) return;
    setOkMsg("");
    setErrMsg("");
  }, [open]);

  if (!mounted) return null;

  const setField = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit || loading) return;

    setLoading(true);
    setOkMsg("");
    setErrMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "No se pudo enviar.");

      setOkMsg(
        "Gracias. Tu mensaje fue enviado correctamente. Me comunicaré contigo a la brevedad."
      );
      setForm({ nombre: "", correo: "", telefono: "", motivo: "" });
    } catch (err) {
      setErrMsg(
        err?.message ||
          "No fue posible enviar el mensaje. Verifica la información e inténtalo nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const btnBase =
    "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-medium " +
    "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 " +
    "active:translate-y-[1px]";

  const btnCancel =
    btnBase +
    " border border-neutral-200 text-neutral-800 bg-white " +
    "hover:bg-neutral-50 hover:-translate-y-[2px] hover:shadow-sm";

  const btnSend =
    btnBase +
    " bg-neutral-900 text-white " +
    "hover:bg-neutral-800 hover:-translate-y-[2px] hover:shadow-md " +
    "disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none";

  const overlayClass =
    "absolute inset-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] " +
    "bg-black/60 " +
    (phase === "closing"
      ? "opacity-0 backdrop-blur-0"
      : "opacity-100 backdrop-blur-[6px]");

  const modalClass =
    "relative mx-4 w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl " +
    "transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform " +
    (phase === "opening"
      ? "opacity-0 translate-y-6 scale-[0.94]"
      : phase === "closing"
      ? "opacity-0 translate-y-3 scale-[0.96]"
      : "opacity-100 translate-y-0 scale-100");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
+      <button
        className={overlayClass}
        onClick={onClose}
        aria-label="Cerrar modal"
        type="button"
      />

      <div className={modalClass}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-neutral-500 transition-all duration-300 hover:bg-neutral-100 hover:text-neutral-800 hover:-translate-y-[1px]"
          aria-label="Cerrar"
          type="button"
        >
          ✕
        </button>

        <h3 className="text-3xl sm:text-4xl font-semibold text-neutral-900">
          Contacto
        </h3>
        <p className="mt-2 text-[10px] text-neutral-500">
          Compárteme tus datos y el motivo de tu consulta. Me pondré en contacto
          contigo a la brevedad.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-neutral-700">Nombre</label>
            <input
              value={form.nombre}
              onChange={setField("nombre")}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[13px] placeholder:text-neutral-400 outline-none transition-colors focus:border-neutral-400"
              placeholder="Tu nombre"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-700">
              Correo electrónico
            </label>
            <input
              value={form.correo}
              onChange={setField("correo")}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[13px] placeholder:text-neutral-400 outline-none transition-colors focus:border-neutral-400"
              placeholder="tu@email.com"
              autoComplete="email"
              inputMode="email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-700">
              Teléfono
            </label>
            <input
              value={form.telefono}
              onChange={setField("telefono")}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[13px] placeholder:text-neutral-400 outline-none transition-colors focus:border-neutral-400"
              placeholder="+52 55 1234 5678"
              autoComplete="tel"
              inputMode="tel"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-700">
              Motivo de contacto
            </label>
            <textarea
              value={form.motivo}
              onChange={setField("motivo")}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-[13px] placeholder:text-neutral-400 outline-none transition-colors focus:border-neutral-400"
              placeholder="Describe brevemente tu solicitud (servicio requerido, fecha, ubicación, etc.)"
            />
          </div>

          {okMsg ? (
            <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              {okMsg}
            </div>
          ) : null}

          {errMsg ? (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {errMsg}
            </div>
          ) : null}

          <div className="pt-2">
            <div className="flex items-center justify-end gap-3">
              <button type="button" onClick={onClose} className={btnCancel}>
                Cancelar
              </button>

              <button
                type="submit"
                disabled={!canSubmit || loading}
                className={btnSend}
              >
                {loading ? "Enviando…" : "Enviar"}
              </button>
            </div>

            <p className="mt-3 text-[9px] leading-tight  text-neutral-400">
              Aviso de privacidad: la información proporcionada se utilizará
              únicamente para atender tu solicitud de contacto. No compartimos
              tus datos con terceros.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}