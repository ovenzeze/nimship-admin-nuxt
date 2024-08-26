export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      __retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_ac8c_1: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          source: string | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          source?: string | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          source?: string | null
        }
        Relationships: []
      }
      __retool_vector__demo__vector___zemin_lu_78996ac3_f54e_48c4_b0f: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          source: string | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          source?: string | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          source?: string | null
        }
        Relationships: []
      }
      __retool_vector_deduction_table_struct_cda06ff5_b4bd_49f2_af8b_: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          source: string | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          source?: string | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          source?: string | null
        }
        Relationships: []
      }
      buildings: {
        Row: {
          address: string | null
          created_at: string | null
          id: number
          img_url: string | null
          name: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          id: number
          img_url?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          id?: number
          img_url?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          bill_address: string
          email: string | null
          id: number
          mail_address: string
          name: string
          phone: string | null
          site: string | null
        }
        Insert: {
          bill_address: string
          email?: string | null
          id?: number
          mail_address: string
          name: string
          phone?: string | null
          site?: string | null
        }
        Update: {
          bill_address?: string
          email?: string | null
          id?: number
          mail_address?: string
          name?: string
          phone?: string | null
          site?: string | null
        }
        Relationships: []
      }
      deductions: {
        Row: {
          amount: number | null
          cover_by: string | null
          custom_id: Database["public"]["Enums"]["custom_id_enum"] | null
          deduction_cycle_start: string | null
          driver_id: number | null
          due_time: string | null
          event_cycle_start: string | null
          haulblaze_id: string | null
          id: number
          notes: string | null
          payment_id: number | null
          pick_up_time: string | null
          reason: string | null
          status: string | null
          team_name: Database["public"]["Enums"]["team_name_enum"] | null
          tracking_number: string | null
          uid: string | null
          warehouse: string | null
        }
        Insert: {
          amount?: number | null
          cover_by?: string | null
          custom_id?: Database["public"]["Enums"]["custom_id_enum"] | null
          deduction_cycle_start?: string | null
          driver_id?: number | null
          due_time?: string | null
          event_cycle_start?: string | null
          haulblaze_id?: string | null
          id?: number
          notes?: string | null
          payment_id?: number | null
          pick_up_time?: string | null
          reason?: string | null
          status?: string | null
          team_name?: Database["public"]["Enums"]["team_name_enum"] | null
          tracking_number?: string | null
          uid?: string | null
          warehouse?: string | null
        }
        Update: {
          amount?: number | null
          cover_by?: string | null
          custom_id?: Database["public"]["Enums"]["custom_id_enum"] | null
          deduction_cycle_start?: string | null
          driver_id?: number | null
          due_time?: string | null
          event_cycle_start?: string | null
          haulblaze_id?: string | null
          id?: number
          notes?: string | null
          payment_id?: number | null
          pick_up_time?: string | null
          reason?: string | null
          status?: string | null
          team_name?: Database["public"]["Enums"]["team_name_enum"] | null
          tracking_number?: string | null
          uid?: string | null
          warehouse?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deductions_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "haulblaze_contact"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "linkpayment"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "deduction_with_driver"
            referencedColumns: ["payment_id"]
          },
          {
            foreignKeyName: "linkpayment"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payment_record"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_import_records: {
        Row: {
          customer: string
          cycle_end: string
          cycle_start: string
          file_name: string
          file_size: number
          file_url: string
          id: number
          import_time: string
          record_count: number
          status: string
          team_name: string
        }
        Insert: {
          customer: string
          cycle_end: string
          cycle_start: string
          file_name: string
          file_size: number
          file_url: string
          id?: number
          import_time: string
          record_count: number
          status: string
          team_name: string
        }
        Update: {
          customer?: string
          cycle_end?: string
          cycle_start?: string
          file_name?: string
          file_size?: number
          file_url?: string
          id?: number
          import_time?: string
          record_count?: number
          status?: string
          team_name?: string
        }
        Relationships: []
      }
      delivery_record: {
        Row: {
          create_time: string | null
          custom_id: Database["public"]["Enums"]["custom_id_enum"]
          custom_uid: number | null
          cycle_end: string | null
          cycle_start: string
          date: string
          driver_salary: number | null
          driver_str: string
          order_cnt_0_1: number
          order_cnt_0_5: number
          order_cnt_1_10: number
          order_cnt_10: number
          order_cnt_5_10: number
          payment_id: number | null
          record_id: number
          salary_0_1: number
          salary_0_5: number
          salary_1_10: number
          salary_10: number
          salary_5_10: number
          settle_rate: number
          team_id: number
          team_name: Database["public"]["Enums"]["team_name_enum"] | null
          total_mul_ord_fst_order_cnt: number
          total_mul_ord_fst_salary: number
          total_mul_ord_rst_order_cnt: number
          total_mul_ord_rst_salary: number
          total_mul_ord_salary: number
          total_mul_order_cnt: number
          total_order_cnt: number
          total_salary: number
          total_single_order_cnt: number
          total_single_salary: number
          uid: string | null
          update_time: string | null
          warehouse: Database["public"]["Enums"]["area_code_enum_bd3e18a1"]
          warehouse_temp: Database["public"]["Enums"]["warehouse_enum"] | null
        }
        Insert: {
          create_time?: string | null
          custom_id: Database["public"]["Enums"]["custom_id_enum"]
          custom_uid?: number | null
          cycle_end?: string | null
          cycle_start?: string
          date: string
          driver_salary?: number | null
          driver_str: string
          order_cnt_0_1?: number
          order_cnt_0_5?: number
          order_cnt_1_10?: number
          order_cnt_10?: number
          order_cnt_5_10?: number
          payment_id?: number | null
          record_id?: number
          salary_0_1?: number
          salary_0_5?: number
          salary_1_10?: number
          salary_10?: number
          salary_5_10?: number
          settle_rate: number
          team_id: number
          team_name?: Database["public"]["Enums"]["team_name_enum"] | null
          total_mul_ord_fst_order_cnt?: number
          total_mul_ord_fst_salary?: number
          total_mul_ord_rst_order_cnt?: number
          total_mul_ord_rst_salary?: number
          total_mul_ord_salary?: number
          total_mul_order_cnt?: number
          total_order_cnt?: number
          total_salary?: number
          total_single_order_cnt?: number
          total_single_salary?: number
          uid?: string | null
          update_time?: string | null
          warehouse: Database["public"]["Enums"]["area_code_enum_bd3e18a1"]
          warehouse_temp?: Database["public"]["Enums"]["warehouse_enum"] | null
        }
        Update: {
          create_time?: string | null
          custom_id?: Database["public"]["Enums"]["custom_id_enum"]
          custom_uid?: number | null
          cycle_end?: string | null
          cycle_start?: string
          date?: string
          driver_salary?: number | null
          driver_str?: string
          order_cnt_0_1?: number
          order_cnt_0_5?: number
          order_cnt_1_10?: number
          order_cnt_10?: number
          order_cnt_5_10?: number
          payment_id?: number | null
          record_id?: number
          salary_0_1?: number
          salary_0_5?: number
          salary_1_10?: number
          salary_10?: number
          salary_5_10?: number
          settle_rate?: number
          team_id?: number
          team_name?: Database["public"]["Enums"]["team_name_enum"] | null
          total_mul_ord_fst_order_cnt?: number
          total_mul_ord_fst_salary?: number
          total_mul_ord_rst_order_cnt?: number
          total_mul_ord_rst_salary?: number
          total_mul_ord_salary?: number
          total_mul_order_cnt?: number
          total_order_cnt?: number
          total_salary?: number
          total_single_order_cnt?: number
          total_single_salary?: number
          uid?: string | null
          update_time?: string | null
          warehouse?: Database["public"]["Enums"]["area_code_enum_bd3e18a1"]
          warehouse_temp?: Database["public"]["Enums"]["warehouse_enum"] | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_record_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "deduction_with_driver"
            referencedColumns: ["payment_id"]
          },
          {
            foreignKeyName: "delivery_record_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payment_record"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_report: {
        Row: {
          create_time: string | null
          date: string
          delivered_count: number | null
          driver_id: number
          id: number
          missing_count: number | null
          next_day_est_count: number | null
          retry_count: number
          retry_pkg_list: Json | null
          return_count: number | null
          support_images: string[] | null
          support_notes: string | null
          total_count: number | null
          uid: string | null
          update_time: string | null
          wrong_count: number | null
        }
        Insert: {
          create_time?: string | null
          date: string
          delivered_count?: number | null
          driver_id: number
          id?: number
          missing_count?: number | null
          next_day_est_count?: number | null
          retry_count?: number
          retry_pkg_list?: Json | null
          return_count?: number | null
          support_images?: string[] | null
          support_notes?: string | null
          total_count?: number | null
          uid?: string | null
          update_time?: string | null
          wrong_count?: number | null
        }
        Update: {
          create_time?: string | null
          date?: string
          delivered_count?: number | null
          driver_id?: number
          id?: number
          missing_count?: number | null
          next_day_est_count?: number | null
          retry_count?: number
          retry_pkg_list?: Json | null
          return_count?: number | null
          support_images?: string[] | null
          support_notes?: string | null
          total_count?: number | null
          uid?: string | null
          update_time?: string | null
          wrong_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_report_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "haulblaze_contact"
            referencedColumns: ["uid"]
          },
        ]
      }
      financial_record: {
        Row: {
          amount: number
          created_at: string | null
          debt_status: Database["public"]["Enums"]["fin_debt_status_enum"]
          description: string | null
          id: number
          payment_status: Database["public"]["Enums"]["fin_payment_status_enum"]
          payment_type: Database["public"]["Enums"]["fin_payment_type_enum"]
          type: Database["public"]["Enums"]["fin_type_enum"]
          uid: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number
          created_at?: string | null
          debt_status?: Database["public"]["Enums"]["fin_debt_status_enum"]
          description?: string | null
          id?: number
          payment_status?: Database["public"]["Enums"]["fin_payment_status_enum"]
          payment_type?: Database["public"]["Enums"]["fin_payment_type_enum"]
          type?: Database["public"]["Enums"]["fin_type_enum"]
          uid?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          debt_status?: Database["public"]["Enums"]["fin_debt_status_enum"]
          description?: string | null
          id?: number
          payment_status?: Database["public"]["Enums"]["fin_payment_status_enum"]
          payment_type?: Database["public"]["Enums"]["fin_payment_type_enum"]
          type?: Database["public"]["Enums"]["fin_type_enum"]
          uid?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_uid"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "haulblaze_contact"
            referencedColumns: ["uid"]
          },
        ]
      }
      haulblaze_contact: {
        Row: {
          account_number: string | null
          commisson_rate: number
          date_of_birth: string
          dl_expired_time: string | null
          driver_id: number[]
          driver_license_no: string | null
          driver_type: Database["public"]["Enums"]["driver_type_enum"]
          email: string | null
          enroll_time: string | null
          first_name: string
          has_notification: number | null
          haulblaze_id: string | null
          id: number
          last_name: string
          last_update: string | null
          mail_city: string | null
          mail_state: string | null
          mail_street: string | null
          mail_zip: number | null
          phone: string | null
          routing_number: string | null
          social_security_no: string | null
          status: Database["public"]["Enums"]["status_enum_31d11e70"] | null
          team_name: Database["public"]["Enums"]["team_name_enum"] | null
          uid: string
          warehouse: string | null
          zelle: string | null
        }
        Insert: {
          account_number?: string | null
          commisson_rate?: number
          date_of_birth?: string
          dl_expired_time?: string | null
          driver_id?: number[]
          driver_license_no?: string | null
          driver_type?: Database["public"]["Enums"]["driver_type_enum"]
          email?: string | null
          enroll_time?: string | null
          first_name: string
          has_notification?: number | null
          haulblaze_id?: string | null
          id?: number
          last_name: string
          last_update?: string | null
          mail_city?: string | null
          mail_state?: string | null
          mail_street?: string | null
          mail_zip?: number | null
          phone?: string | null
          routing_number?: string | null
          social_security_no?: string | null
          status?: Database["public"]["Enums"]["status_enum_31d11e70"] | null
          team_name?: Database["public"]["Enums"]["team_name_enum"] | null
          uid?: string
          warehouse?: string | null
          zelle?: string | null
        }
        Update: {
          account_number?: string | null
          commisson_rate?: number
          date_of_birth?: string
          dl_expired_time?: string | null
          driver_id?: number[]
          driver_license_no?: string | null
          driver_type?: Database["public"]["Enums"]["driver_type_enum"]
          email?: string | null
          enroll_time?: string | null
          first_name?: string
          has_notification?: number | null
          haulblaze_id?: string | null
          id?: number
          last_name?: string
          last_update?: string | null
          mail_city?: string | null
          mail_state?: string | null
          mail_street?: string | null
          mail_zip?: number | null
          phone?: string | null
          routing_number?: string | null
          social_security_no?: string | null
          status?: Database["public"]["Enums"]["status_enum_31d11e70"] | null
          team_name?: Database["public"]["Enums"]["team_name_enum"] | null
          uid?: string
          warehouse?: string | null
          zelle?: string | null
        }
        Relationships: []
      }
      id_record: {
        Row: {
          create_time: string | null
          custom_id: Database["public"]["Enums"]["custom_id_enum"]
          custom_uid: number
          id: number
          is_active: boolean
          update_time: string | null
          warehouse: Database["public"]["Enums"]["warehouse_enum"]
        }
        Insert: {
          create_time?: string | null
          custom_id: Database["public"]["Enums"]["custom_id_enum"]
          custom_uid: number
          id?: number
          is_active?: boolean
          update_time?: string | null
          warehouse: Database["public"]["Enums"]["warehouse_enum"]
        }
        Update: {
          create_time?: string | null
          custom_id?: Database["public"]["Enums"]["custom_id_enum"]
          custom_uid?: number
          id?: number
          is_active?: boolean
          update_time?: string | null
          warehouse?: Database["public"]["Enums"]["warehouse_enum"]
        }
        Relationships: []
      }
      inspections: {
        Row: {
          created_at: string | null
          id: number
          image_url: string | null
          kitchen_checklist: Json | null
          livingroom_checklist: Json | null
          notes: string | null
          unit_id: number | null
          updated_at: string | null
          visit_type: string | null
        }
        Insert: {
          created_at?: string | null
          id: number
          image_url?: string | null
          kitchen_checklist?: Json | null
          livingroom_checklist?: Json | null
          notes?: string | null
          unit_id?: number | null
          updated_at?: string | null
          visit_type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          image_url?: string | null
          kitchen_checklist?: Json | null
          livingroom_checklist?: Json | null
          notes?: string | null
          unit_id?: number | null
          updated_at?: string | null
          visit_type?: string | null
        }
        Relationships: []
      }
      invoice_items: {
        Row: {
          amount: number
          id: number
          invoice_number: string
          item_name: string
          quantity: number
          rate: number | null
        }
        Insert: {
          amount: number
          id?: number
          invoice_number: string
          item_name: string
          quantity: number
          rate?: number | null
        }
        Update: {
          amount?: number
          id?: number
          invoice_number?: string
          item_name?: string
          quantity?: number
          rate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_number_fkey"
            columns: ["invoice_number"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["invoice_number"]
          },
        ]
      }
      invoices: {
        Row: {
          adjustment: number | null
          amount_paid: number
          created_at: string | null
          due_balance: number
          due_date: string
          id: number
          invoice_date: string
          invoice_number: string
          recipient_id: number | null
          sender_id: number | null
          status: Database["public"]["Enums"]["invoice_status"]
          tax: number
          total: number
        }
        Insert: {
          adjustment?: number | null
          amount_paid: number
          created_at?: string | null
          due_balance: number
          due_date: string
          id?: number
          invoice_date: string
          invoice_number: string
          recipient_id?: number | null
          sender_id?: number | null
          status?: Database["public"]["Enums"]["invoice_status"]
          tax: number
          total: number
        }
        Update: {
          adjustment?: number | null
          amount_paid?: number
          created_at?: string | null
          due_balance?: number
          due_date?: string
          id?: number
          invoice_date?: string
          invoice_number?: string
          recipient_id?: number | null
          sender_id?: number | null
          status?: Database["public"]["Enums"]["invoice_status"]
          tax?: number
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      mobile_app_sample_data: {
        Row: {
          email: string | null
          id: number
          image: string | null
          name: string | null
          sales: number | null
        }
        Insert: {
          email?: string | null
          id: number
          image?: string | null
          name?: string | null
          sales?: number | null
        }
        Update: {
          email?: string | null
          id?: number
          image?: string | null
          name?: string | null
          sales?: number | null
        }
        Relationships: []
      }
      payment_record: {
        Row: {
          actual_amount_paid: number
          allowance: number
          attendance: number
          bonus: number
          custom_id: Database["public"]["Enums"]["custom_id_enum"]
          custom_uid: number
          cycle_end: string
          cycle_start: string
          deduction_amount: number
          description: string | null
          gross_pay: number
          haulblaze_id: number
          id: number
          net_pay: number
          payment_method: number | null
          payment_time: string | null
          pre_paid: number
          team_name: Database["public"]["Enums"]["team_name_enum"] | null
          uid: string | null
          warehouse: string
        }
        Insert: {
          actual_amount_paid?: number
          allowance?: number
          attendance?: number
          bonus?: number
          custom_id: Database["public"]["Enums"]["custom_id_enum"]
          custom_uid?: number
          cycle_end: string
          cycle_start: string
          deduction_amount?: number
          description?: string | null
          gross_pay?: number
          haulblaze_id?: number
          id?: number
          net_pay?: number
          payment_method?: number | null
          payment_time?: string | null
          pre_paid?: number
          team_name?: Database["public"]["Enums"]["team_name_enum"] | null
          uid?: string | null
          warehouse: string
        }
        Update: {
          actual_amount_paid?: number
          allowance?: number
          attendance?: number
          bonus?: number
          custom_id?: Database["public"]["Enums"]["custom_id_enum"]
          custom_uid?: number
          cycle_end?: string
          cycle_start?: string
          deduction_amount?: number
          description?: string | null
          gross_pay?: number
          haulblaze_id?: number
          id?: number
          net_pay?: number
          payment_method?: number | null
          payment_time?: string | null
          pre_paid?: number
          team_name?: Database["public"]["Enums"]["team_name_enum"] | null
          uid?: string | null
          warehouse?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_record_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "haulblaze_contact"
            referencedColumns: ["uid"]
          },
        ]
      }
      sample_transactions: {
        Row: {
          account_number: string | null
          company: string | null
          id: number
          payment_type: string | null
          plan: string | null
          transaction_date: string | null
        }
        Insert: {
          account_number?: string | null
          company?: string | null
          id?: number
          payment_type?: string | null
          plan?: string | null
          transaction_date?: string | null
        }
        Update: {
          account_number?: string | null
          company?: string | null
          id?: number
          payment_type?: string | null
          plan?: string | null
          transaction_date?: string | null
        }
        Relationships: []
      }
      sample_users: {
        Row: {
          email: string | null
          enabled: boolean | null
          id: number
          name: string | null
          role: string | null
          signup_date: string | null
        }
        Insert: {
          email?: string | null
          enabled?: boolean | null
          id?: number
          name?: string | null
          role?: string | null
          signup_date?: string | null
        }
        Update: {
          email?: string | null
          enabled?: boolean | null
          id?: number
          name?: string | null
          role?: string | null
          signup_date?: string | null
        }
        Relationships: []
      }
      units: {
        Row: {
          building_id: number | null
          created_at: string | null
          id: number
          img_url: string | null
          number: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          building_id?: number | null
          created_at?: string | null
          id: number
          img_url?: string | null
          number?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          building_id?: number | null
          created_at?: string | null
          id?: number
          img_url?: string | null
          number?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      update_log: {
        Row: {
          id: number
          modification_time: string | null
          modified_by: string
          new_value: Json | null
          old_value: Json | null
          reason: string | null
          uid: string
        }
        Insert: {
          id?: number
          modification_time?: string | null
          modified_by: string
          new_value?: Json | null
          old_value?: Json | null
          reason?: string | null
          uid: string
        }
        Update: {
          id?: number
          modification_time?: string | null
          modified_by?: string
          new_value?: Json | null
          old_value?: Json | null
          reason?: string | null
          uid?: string
        }
        Relationships: []
      }
      zion_enum: {
        Row: {
          create_time: string | null
          id: number
          label: string | null
          notes: string | null
          status: number
          type: string | null
          value: string | null
        }
        Insert: {
          create_time?: string | null
          id?: number
          label?: string | null
          notes?: string | null
          status?: number
          type?: string | null
          value?: string | null
        }
        Update: {
          create_time?: string | null
          id?: number
          label?: string | null
          notes?: string | null
          status?: number
          type?: string | null
          value?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      best_drivers: {
        Row: {
          best_driver_uid: string | null
          best_effitive_uid: string | null
          custom_id: Database["public"]["Enums"]["custom_id_enum"] | null
          cycle_start: string | null
          team_name: Database["public"]["Enums"]["team_name_enum"] | null
        }
        Relationships: []
      }
      deduction_with_driver: {
        Row: {
          cycle_start: string | null
          deduction_amount: number | null
          deduction_id: number | null
          deduction_reason: string | null
          driver_email: string | null
          driver_first_name: string | null
          driver_id: number | null
          driver_last_name: string | null
          driver_phone: string | null
          driver_uid: string | null
          driver_warehouse: string | null
          notes: string | null
          original_payment_id: number | null
          payment_id: number | null
          team_name: Database["public"]["Enums"]["team_name_enum"] | null
          tracking_number: string | null
        }
        Relationships: [
          {
            foreignKeyName: "linkpayment"
            columns: ["original_payment_id"]
            isOneToOne: false
            referencedRelation: "payment_record"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "linkpayment"
            columns: ["original_payment_id"]
            isOneToOne: false
            referencedRelation: "deduction_with_driver"
            referencedColumns: ["payment_id"]
          },
          {
            foreignKeyName: "payment_record_uid_fkey"
            columns: ["driver_uid"]
            isOneToOne: false
            referencedRelation: "haulblaze_contact"
            referencedColumns: ["uid"]
          },
        ]
      }
      delivery_summary: {
        Row: {
          attendance: number | null
          custom_uid: number | null
          driver_str: string | null
          month: string | null
          order_cnt_0_1: number | null
          order_cnt_0_5: number | null
          order_cnt_1_10: number | null
          order_cnt_10: number | null
          order_cnt_5_10: number | null
          salary_0_1: number | null
          salary_0_5: number | null
          salary_1_10: number | null
          salary_10: number | null
          salary_5_10: number | null
          team_id: number | null
          team_name: Database["public"]["Enums"]["team_name_enum"] | null
          total_mul_ord_fst_order_cnt: number | null
          total_mul_ord_fst_salary: number | null
          total_mul_ord_rst_order_cnt: number | null
          total_mul_ord_rst_salary: number | null
          total_mul_ord_salary: number | null
          total_mul_order_cnt: number | null
          total_order_cnt: number | null
          total_salary: number | null
          total_single_order_cnt: number | null
          total_single_salary: number | null
          warehouse:
            | Database["public"]["Enums"]["area_code_enum_bd3e18a1"]
            | null
        }
        Relationships: []
      }
      driver_summary: {
        Row: {
          custom_id: Database["public"]["Enums"]["custom_id_enum"] | null
          driver_id: number | null
          last_active_date: string | null
          max_daily_order_cnt: number | null
          team_name: Database["public"]["Enums"]["team_name_enum"] | null
          total_order_cnt: number | null
          total_salary: number | null
          warehouse:
            | Database["public"]["Enums"]["area_code_enum_bd3e18a1"]
            | null
          working_days: number | null
        }
        Relationships: []
      }
      driver_uid_summary: {
        Row: {
          avg_trip_order_cnt: number | null
          custom_id: Database["public"]["Enums"]["custom_id_enum"] | null
          last_active_date: string | null
          max_trip_order_cnt: number | null
          team_name: Database["public"]["Enums"]["team_name_enum"] | null
          total_order_cnt: number | null
          total_salary: number | null
          uid: string | null
          warehouse:
            | Database["public"]["Enums"]["area_code_enum_bd3e18a1"]
            | null
          working_days: number | null
        }
        Relationships: []
      }
      invoice_view: {
        Row: {
          avg_price: number | null
          custom_id: Database["public"]["Enums"]["custom_id_enum"] | null
          net_salary: number | null
          payment_cycle_end: string | null
          payment_cycle_start: string | null
          team_name: Database["public"]["Enums"]["team_name_enum"] | null
          total_deductions: number | null
          total_order_cnt: number | null
          total_salary: number | null
          warehouse:
            | Database["public"]["Enums"]["area_code_enum_bd3e18a1"]
            | null
        }
        Relationships: []
      }
      pay_cycle_summary: {
        Row: {
          avg_order_count_per_trip: number | null
          custom_id: Database["public"]["Enums"]["custom_id_enum"] | null
          cycle_end: string | null
          cycle_month: string | null
          cycle_start: string | null
          team_name: Database["public"]["Enums"]["team_name_enum"] | null
          total_delivery_trips: number | null
          total_driver_count: number | null
          total_driver_salary: number | null
          total_order_count: number | null
          total_salary: number | null
          warehouse:
            | Database["public"]["Enums"]["area_code_enum_bd3e18a1"]
            | null
        }
        Relationships: []
      }
      pay_method_stat: {
        Row: {
          custom_id: Database["public"]["Enums"]["custom_id_enum"] | null
          cycle_start: string | null
          pay_method_stat: Json | null
          team_name: Database["public"]["Enums"]["team_name_enum"] | null
        }
        Relationships: []
      }
      pay_method_summary: {
        Row: {
          custom_id: Database["public"]["Enums"]["custom_id_enum"] | null
          cycle_end: string | null
          cycle_start: string | null
          payment_count: number | null
          payment_method: number | null
          team_name: Database["public"]["Enums"]["team_name_enum"] | null
          total_paid_amount: number | null
          warehouse: string | null
        }
        Relationships: []
      }
      payment_agg: {
        Row: {
          actual_paid_amount: number | null
          actual_paid_count: number | null
          allowance_amount: number | null
          attendance_count: number | null
          bonus_amount: number | null
          custom_id: Database["public"]["Enums"]["custom_id_enum"] | null
          cycle_end: string | null
          cycle_start: string | null
          deduction_amount: number | null
          deduction_count: number | null
          driver_count: number | null
          gross_pay_amount: number | null
          net_pay_amount: number | null
          pre_paid_amount: number | null
          team_name: Database["public"]["Enums"]["team_name_enum"] | null
          warehouse: string | null
        }
        Relationships: []
      }
      payment_record_driver_summary: {
        Row: {
          avg_actual_amount_paid: number | null
          avg_allowance: number | null
          avg_bonus: number | null
          avg_deductions: number | null
          avg_gross_pay: number | null
          avg_net_pay: number | null
          avg_pre_paid: number | null
          driver_id: number | null
          total_actual_amount_paid: number | null
          total_allowance: number | null
          total_bonus: number | null
          total_deductions: number | null
          total_gross_pay: number | null
          total_net_pay: number | null
          total_payments: number | null
          total_pre_paid: number | null
        }
        Relationships: []
      }
      payment_record_monthly_summary: {
        Row: {
          avg_actual_amount_paid: number | null
          avg_allowance: number | null
          avg_bonus: number | null
          avg_deductions: number | null
          avg_gross_pay: number | null
          avg_net_pay: number | null
          avg_pre_paid: number | null
          driver_id: number | null
          month: string | null
          total_actual_amount_paid: number | null
          total_allowance: number | null
          total_bonus: number | null
          total_deductions: number | null
          total_gross_pay: number | null
          total_net_pay: number | null
          total_payments: number | null
          total_pre_paid: number | null
        }
        Relationships: []
      }
      payment_record_yearly_summary: {
        Row: {
          avg_actual_amount_paid: number | null
          avg_allowance: number | null
          avg_bonus: number | null
          avg_deductions: number | null
          avg_gross_pay: number | null
          avg_net_pay: number | null
          avg_pre_paid: number | null
          total_actual_amount_paid: number | null
          total_allowance: number | null
          total_bonus: number | null
          total_deductions: number | null
          total_gross_pay: number | null
          total_net_pay: number | null
          total_payments: number | null
          total_pre_paid: number | null
          year: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      get_payment_id: {
        Args: {
          p_driver_id: number
          p_custom_id: Database["public"]["Enums"]["custom_id_enum"]
          p_cycle_start: string
          p_warehouse: string
        }
        Returns: number
      }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      area_code_enum_bd3e18a1:
        | "LAS"
        | "PHX"
        | "SAN"
        | "LAX"
        | "SEA"
        | "IRV"
        | "USA"
      cover_by_enum: "DRIVER" | "UNIUNI" | "COMPANY" | "SHARE" | "OTHERS"
      custom_id_enum: "HAULBLAZE" | "UNIUNI" | "SPEEDX" | "PIGGY" | "OTHERS"
      driver_type_enum: "HAULER" | "TRUCK" | "FLEET" | "MANAGER" | "OTHERS"
      fin_debt_status_enum: "PROCESSING" | "FINISHED" | "VOID" | "OTHERS"
      fin_payment_status_enum:
        | "WAITING"
        | "PAID"
        | "REJECTED"
        | "VOID"
        | "OTHERS"
      fin_payment_type_enum: "ACH" | "CHECK" | "ZELLE" | "CASH" | "OTHERS"
      fin_type_enum: "DEBT" | "PRE-PAID" | "DIVIDEND" | "OTHERS"
      invoice_status: "DRAFT" | "SEND" | "PAID" | "CANCEL"
      payment_bank_enum:
        | "CHASE"
        | "USBANK"
        | "BOA"
        | "MERCURY"
        | "FOUND"
        | "OTHERS"
      payment_method_enum:
        | "ZELLE-CHASE"
        | "ZELLE-USBANK"
        | "ACH-CHASE"
        | "ACH-NOVO"
        | "ACH-FOUND"
        | "APP-FOUND"
        | "CHECK"
        | "CASH"
        | "DEDUCTION"
        | "OTHERS"
      payment_way_enum: "ACH" | "ZELLE" | "VENMO" | "PAYPAL" | "CASH" | "OTHERS"
      status_enum: "FINISHED" | "PROCESSING" | "EXPIRED"
      status_enum_31d11e70: "Employed" | "Quit" | "Onboarding"
      team_name_enum: "HAULBLAZE" | "HORIZON"
      warehouse_enum: "LAX" | "LAS" | "SFO" | "SEA" | "SAN" | "PHX" | "IRV"
      warehouse_enum_5de5a3fb:
        | "LAX"
        | "LAS"
        | "SEA"
        | "SAN"
        | "PHX"
        | "IRV"
        | "USA"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
