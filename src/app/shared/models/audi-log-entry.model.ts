export interface AuditLogEntry {
    id: string;
    action: string;
    table_name: string;
    record_id: string | null;
    performed_by: string;
    performed_at: string;
    target_name?: string;
  }