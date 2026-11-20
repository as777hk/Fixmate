import type { ReactNode } from "react";
export interface Column<T> { key: string; label: string; render?: (row: T) => ReactNode; align?: "left" | "right" }
export function DataTable<T extends object>({ columns, rows, empty = "No records found." }: { columns: Column<T>[]; rows: T[]; empty?: string }) {
  if (!rows.length) return <div className="table-empty">{empty}</div>;
  return <div className="table-scroll"><table className="data-table"><thead><tr>{columns.map((column) => <th key={column.key} className={column.align === "right" ? "align-right" : ""}>{column.label}</th>)}</tr></thead><tbody>{rows.map((row, index) => { const record = row as Record<string, unknown>; return <tr key={String(record._id || record.id || index)}>{columns.map((column) => <td key={column.key} className={column.align === "right" ? "align-right" : ""}>{column.render ? column.render(row) : String(record[column.key] ?? "—")}</td>)}</tr>; })}</tbody></table></div>;
}
