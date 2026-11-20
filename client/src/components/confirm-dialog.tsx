"use client";

import { AlertTriangle, X } from "lucide-react";
export function ConfirmDialog({ open, title, description, confirmLabel = "Confirm", danger = true, busy = false, onConfirm, onClose }: { open: boolean; title: string; description: string; confirmLabel?: string; danger?: boolean; busy?: boolean; onConfirm: () => void; onClose: () => void }) {
  if (!open) return null;
  return <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title"><button className="dialog-close" onClick={onClose} aria-label="Close"><X size={18}/></button><span className="dialog-alert"><AlertTriangle size={22}/></span><h2 id="confirm-title">{title}</h2><p>{description}</p><div className="dialog-actions"><button className="button button-quiet" onClick={onClose} disabled={busy}>Go back</button><button className={`button ${danger ? "button-danger" : "button-primary"}`} onClick={onConfirm} disabled={busy}>{busy ? "Working…" : confirmLabel}</button></div></section></div>;
}
