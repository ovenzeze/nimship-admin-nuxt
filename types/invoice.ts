export interface UniuniTemplateData {
    // 定义 UniuniTemplate 所需的字段
    invoice_number: string;
    invoice_date: string;
    due_date: string;
    total: number;
    recipient_id: string | null;
    sender_id: string | null;
    status: 'DRAFT' | 'SEND' | 'PAID' | 'CANCEL';
    amount_paid: number;
  }