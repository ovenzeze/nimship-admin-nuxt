

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "__segment_reverse_etl";


ALTER SCHEMA "__segment_reverse_etl" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "pg_catalog";






CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "public";






CREATE TYPE "public"."area_code_enum_bd3e18a1" AS ENUM (
    'LAS',
    'PHX',
    'SAN',
    'LAX',
    'SEA',
    'IRV',
    'USA'
);


ALTER TYPE "public"."area_code_enum_bd3e18a1" OWNER TO "postgres";


CREATE TYPE "public"."cover_by_enum" AS ENUM (
    'DRIVER',
    'UNIUNI',
    'COMPANY',
    'SHARE',
    'OTHERS'
);


ALTER TYPE "public"."cover_by_enum" OWNER TO "postgres";


CREATE TYPE "public"."custom_id_enum" AS ENUM (
    'HAULBLAZE',
    'UNIUNI',
    'SPEEDX',
    'PIGGY',
    'OTHERS'
);


ALTER TYPE "public"."custom_id_enum" OWNER TO "postgres";


CREATE TYPE "public"."driver_type_enum" AS ENUM (
    'HAULER',
    'TRUCK',
    'FLEET',
    'MANAGER',
    'OTHERS'
);


ALTER TYPE "public"."driver_type_enum" OWNER TO "postgres";


CREATE TYPE "public"."fin_debt_status_enum" AS ENUM (
    'PROCESSING',
    'FINISHED',
    'VOID',
    'OTHERS'
);


ALTER TYPE "public"."fin_debt_status_enum" OWNER TO "postgres";


CREATE TYPE "public"."fin_payment_status_enum" AS ENUM (
    'WAITING',
    'PAID',
    'REJECTED',
    'VOID',
    'OTHERS'
);


ALTER TYPE "public"."fin_payment_status_enum" OWNER TO "postgres";


CREATE TYPE "public"."fin_payment_type_enum" AS ENUM (
    'ACH',
    'CHECK',
    'ZELLE',
    'CASH',
    'OTHERS'
);


ALTER TYPE "public"."fin_payment_type_enum" OWNER TO "postgres";


CREATE TYPE "public"."fin_type_enum" AS ENUM (
    'DEBT',
    'PRE-PAID',
    'DIVIDEND',
    'OTHERS'
);


ALTER TYPE "public"."fin_type_enum" OWNER TO "postgres";


CREATE TYPE "public"."invoice_status" AS ENUM (
    'DRAFT',
    'SEND',
    'PAID',
    'CANCEL'
);


ALTER TYPE "public"."invoice_status" OWNER TO "postgres";


CREATE TYPE "public"."payment_bank_enum" AS ENUM (
    'CHASE',
    'USBANK',
    'BOA',
    'MERCURY',
    'FOUND',
    'OTHERS'
);


ALTER TYPE "public"."payment_bank_enum" OWNER TO "postgres";


CREATE TYPE "public"."payment_method_enum" AS ENUM (
    'ZELLE-CHASE',
    'ZELLE-USBANK',
    'ACH-CHASE',
    'ACH-NOVO',
    'ACH-FOUND',
    'APP-FOUND',
    'CHECK',
    'CASH',
    'DEDUCTION',
    'OTHERS'
);


ALTER TYPE "public"."payment_method_enum" OWNER TO "postgres";


CREATE TYPE "public"."payment_way_enum" AS ENUM (
    'ACH',
    'ZELLE',
    'VENMO',
    'PAYPAL',
    'CASH',
    'OTHERS'
);


ALTER TYPE "public"."payment_way_enum" OWNER TO "postgres";


CREATE TYPE "public"."status_enum" AS ENUM (
    'FINISHED',
    'PROCESSING',
    'EXPIRED'
);


ALTER TYPE "public"."status_enum" OWNER TO "postgres";


CREATE TYPE "public"."status_enum_31d11e70" AS ENUM (
    'Employed',
    'Quit',
    'Onboarding'
);


ALTER TYPE "public"."status_enum_31d11e70" OWNER TO "postgres";


CREATE TYPE "public"."team_name_enum" AS ENUM (
    'HAULBLAZE',
    'HORIZON'
);


ALTER TYPE "public"."team_name_enum" OWNER TO "postgres";


CREATE TYPE "public"."warehouse_enum" AS ENUM (
    'LAX',
    'LAS',
    'SFO',
    'SEA',
    'SAN',
    'PHX',
    'IRV'
);


ALTER TYPE "public"."warehouse_enum" OWNER TO "postgres";


CREATE TYPE "public"."warehouse_enum_5de5a3fb" AS ENUM (
    'LAX',
    'LAS',
    'SEA',
    'SAN',
    'PHX',
    'IRV',
    'USA'
);


ALTER TYPE "public"."warehouse_enum_5de5a3fb" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."calculate_driver_salary"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.driver_salary = NEW.settle_rate * NEW.total_order_cnt;
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."calculate_driver_salary"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_payment_id"("p_driver_id" integer, "p_custom_id" "public"."custom_id_enum", "p_cycle_start" "date", "p_warehouse" character varying) RETURNS integer
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_payment_id INT;
BEGIN
  SELECT id INTO v_payment_id
  FROM payment_record
  WHERE custom_uid = p_driver_id
    AND custom_id = p_custom_id
    AND cycle_start = p_cycle_start
    AND warehouse = p_warehouse
  LIMIT 1;

  RETURN v_payment_id;
END;
$$;


ALTER FUNCTION "public"."get_payment_id"("p_driver_id" integer, "p_custom_id" "public"."custom_id_enum", "p_cycle_start" "date", "p_warehouse" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_deductions_payment_id"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.payment_id := get_payment_id(
    NEW.driver_id,
    NEW.custom_id,
    NEW.event_cycle_start,
    NEW.warehouse
  );

  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_deductions_payment_id"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_custom_id"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    IF TG_OP = 'INSERT' OR OLD.driver_str IS DISTINCT FROM NEW.driver_str THEN
        NEW.custom_uid := substring(NEW.driver_str FROM '^\d+');
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_custom_id"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_delivery_record_payment_id"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    IF NEW.payment_id IS NOT NULL THEN
        UPDATE delivery_record
        SET payment_id = NEW.payment_id
        WHERE custom_id = NEW.custom_id
            AND custom_uid = NEW.custom_uid
            AND cycle_start = NEW.cycle_start
            AND cycle_end = NEW.cycle_end
            AND team_name = NEW.team_name
            AND payment_id IS NULL;
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_delivery_record_payment_id"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_haulblaze_info"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  
    NEW.custom_driver_id := SUBSTRING(NEW.driver_name FROM 1 FOR 5);
    NEW.haulblaze_salary := NEW.haulblaze_rate * NEW.total_order_cnt;

    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_haulblaze_info"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_payment_record"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    total_driver_salary NUMERIC;
    total_attendance INTEGER;
    existing_record payment_record%ROWTYPE;
BEGIN
    -- 计算同一司机在相同周期内的 driver_salary 总和
    SELECT COALESCE(SUM(driver_salary), 0) INTO total_driver_salary
    FROM delivery_record
    WHERE custom_id = NEW.custom_id
        AND custom_uid = NEW.custom_uid
        AND cycle_start = NEW.cycle_start
        AND cycle_end = NEW.cycle_end
        AND team_name = NEW.team_name;

    SELECT COUNT(driver_str) INTO total_attendance
    FROM delivery_record
    WHERE custom_id = NEW.custom_id
        AND custom_uid = NEW.custom_uid
        AND cycle_start = NEW.cycle_start
        AND cycle_end = NEW.cycle_end
        AND team_name = NEW.team_name;

    -- 检查是否已经存在相同的记录
    SELECT * INTO existing_record
    FROM payment_record
    WHERE custom_id = NEW.custom_id
        AND custom_uid = NEW.custom_uid
        AND cycle_start = NEW.cycle_start
        AND cycle_end = NEW.cycle_end
        AND team_name = NEW.team_name;

    IF existing_record IS NULL THEN
        -- 如果不存在相同的记录,则插入新记录
        INSERT INTO payment_record (haulblaze_id, custom_id, custom_uid, warehouse, cycle_start, cycle_end, gross_pay, net_pay, attendance, team_name)
        VALUES (0, NEW.custom_id, NEW.custom_uid, NEW.warehouse, NEW.cycle_start, NEW.cycle_end, total_driver_salary, total_driver_salary, total_attendance, NEW.team_name);
    ELSE
        -- 如果存在相同的记录,则更新现有记录
        UPDATE payment_record
        SET gross_pay = total_driver_salary,
            warehouse = NEW.warehouse,
            net_pay = total_driver_salary + COALESCE(existing_record.bonus, 0) + COALESCE(existing_record.allowance, 0) - COALESCE(existing_record.pre_paid, 0) - COALESCE(existing_record."deduction_amount", 0),
            attendance = total_attendance
        WHERE custom_id = NEW.custom_id
            AND custom_uid = NEW.custom_uid
            AND cycle_start = NEW.cycle_start
            AND cycle_end = NEW.cycle_end
            AND team_name = NEW.team_name;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_payment_record"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_payment_time"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.payment_time := NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_payment_time"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_timestamp"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.update_time = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_timestamp"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "__segment_reverse_etl"."checkpoints" (
    "source_id" character varying(64) NOT NULL,
    "model_id" character varying(64) NOT NULL,
    "checkpoint" timestamp without time zone
);


ALTER TABLE "__segment_reverse_etl"."checkpoints" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "__segment_reverse_etl"."records" (
    "source_id" character varying(64) NOT NULL,
    "model_id" character varying(64) NOT NULL,
    "record_id" character varying(512) NOT NULL,
    "checksum" character varying(512)
);


ALTER TABLE "__segment_reverse_etl"."records" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."__retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_ac8c_1" (
    "id" integer NOT NULL,
    "embedding" "public"."vector"(1536),
    "content" "text",
    "source" "text"
);


ALTER TABLE "public"."__retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_ac8c_1" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."__retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."__retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."__retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_id_seq" OWNED BY "public"."__retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_ac8c_1"."id";



CREATE TABLE IF NOT EXISTS "public"."__retool_vector__demo__vector___zemin_lu_78996ac3_f54e_48c4_b0f" (
    "id" integer NOT NULL,
    "embedding" "public"."vector"(1536),
    "content" "text",
    "source" "text"
);


ALTER TABLE "public"."__retool_vector__demo__vector___zemin_lu_78996ac3_f54e_48c4_b0f" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."__retool_vector__demo__vector___zemin_lu_78996ac3_f54e_4_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."__retool_vector__demo__vector___zemin_lu_78996ac3_f54e_4_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."__retool_vector__demo__vector___zemin_lu_78996ac3_f54e_4_id_seq" OWNED BY "public"."__retool_vector__demo__vector___zemin_lu_78996ac3_f54e_48c4_b0f"."id";



CREATE TABLE IF NOT EXISTS "public"."__retool_vector_deduction_table_struct_cda06ff5_b4bd_49f2_af8b_" (
    "id" integer NOT NULL,
    "embedding" "public"."vector"(1536),
    "content" "text",
    "source" "text"
);


ALTER TABLE "public"."__retool_vector_deduction_table_struct_cda06ff5_b4bd_49f2_af8b_" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."__retool_vector_deduction_table_struct_cda06ff5_b4bd_49f_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."__retool_vector_deduction_table_struct_cda06ff5_b4bd_49f_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."__retool_vector_deduction_table_struct_cda06ff5_b4bd_49f_id_seq" OWNED BY "public"."__retool_vector_deduction_table_struct_cda06ff5_b4bd_49f2_af8b_"."id";



CREATE TABLE IF NOT EXISTS "public"."payment_record" (
    "id" integer NOT NULL,
    "haulblaze_id" integer DEFAULT 0 NOT NULL,
    "custom_id" "public"."custom_id_enum" NOT NULL,
    "custom_uid" integer DEFAULT 0 NOT NULL,
    "warehouse" character varying(255) NOT NULL,
    "cycle_start" "date" NOT NULL,
    "cycle_end" "date" NOT NULL,
    "gross_pay" numeric(15,2) DEFAULT '0'::numeric NOT NULL,
    "pre_paid" numeric(15,2) DEFAULT '0'::numeric NOT NULL,
    "bonus" numeric(15,2) DEFAULT '0'::numeric NOT NULL,
    "deduction_amount" numeric(15,2) DEFAULT '0'::numeric NOT NULL,
    "allowance" numeric(15,2) DEFAULT '0'::numeric NOT NULL,
    "net_pay" numeric(15,2) DEFAULT '0'::numeric NOT NULL,
    "description" "text",
    "actual_amount_paid" numeric DEFAULT '0'::numeric NOT NULL,
    "payment_time" timestamp without time zone,
    "attendance" integer DEFAULT 0 NOT NULL,
    "uid" "uuid",
    "team_name" "public"."team_name_enum",
    "payment_method" integer DEFAULT 0
);


ALTER TABLE "public"."payment_record" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."best_drivers" AS
 WITH "ranked_drivers" AS (
         SELECT "payment_record"."team_name",
            "payment_record"."custom_id",
            "payment_record"."cycle_start",
            "payment_record"."uid",
            "rank"() OVER (PARTITION BY "payment_record"."team_name", "payment_record"."custom_id", "payment_record"."cycle_start" ORDER BY ("sum"("payment_record"."gross_pay")) DESC) AS "rank",
            "rank"() OVER (PARTITION BY "payment_record"."team_name", "payment_record"."custom_id", "payment_record"."cycle_start" ORDER BY ("sum"("payment_record"."gross_pay") / ("count"(DISTINCT "date_trunc"('day'::"text", "payment_record"."payment_time")))::numeric) DESC) AS "eff_rank"
           FROM "public"."payment_record"
          GROUP BY "payment_record"."team_name", "payment_record"."custom_id", "payment_record"."cycle_start", "payment_record"."uid"
        )
 SELECT "ranked_drivers"."team_name",
    "ranked_drivers"."custom_id",
    "ranked_drivers"."cycle_start",
    "ranked_drivers"."uid" AS "best_driver_uid",
    NULL::"uuid" AS "best_effitive_uid"
   FROM "ranked_drivers"
  WHERE ("ranked_drivers"."rank" = 1)
UNION ALL
 SELECT "ranked_drivers"."team_name",
    "ranked_drivers"."custom_id",
    "ranked_drivers"."cycle_start",
    NULL::"uuid" AS "best_driver_uid",
    "ranked_drivers"."uid" AS "best_effitive_uid"
   FROM "ranked_drivers"
  WHERE ("ranked_drivers"."eff_rank" = 1);


ALTER TABLE "public"."best_drivers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."buildings" (
    "id" bigint NOT NULL,
    "img_url" "text",
    "name" "text",
    "address" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."buildings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."customers" (
    "id" integer NOT NULL,
    "name" character varying(100) NOT NULL,
    "bill_address" "text" NOT NULL,
    "mail_address" "text" NOT NULL,
    "site" character varying(100),
    "email" character varying(100),
    "phone" character varying(20)
);


ALTER TABLE "public"."customers" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."customers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."customers_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."customers_id_seq" OWNED BY "public"."customers"."id";



CREATE TABLE IF NOT EXISTS "public"."deductions" (
    "id" integer NOT NULL,
    "haulblaze_id" character(6),
    "warehouse" character varying(50),
    "driver_id" integer,
    "tracking_number" character varying(50),
    "amount" numeric,
    "reason" "text",
    "cover_by" "text",
    "status" "text",
    "payment_id" integer,
    "pick_up_time" timestamp without time zone,
    "due_time" timestamp without time zone,
    "custom_id" "public"."custom_id_enum",
    "team_name" "public"."team_name_enum",
    "uid" "uuid",
    "event_cycle_start" "date",
    "deduction_cycle_start" "date",
    "notes" "text"
);


ALTER TABLE "public"."deductions" OWNER TO "postgres";


COMMENT ON COLUMN "public"."deductions"."event_cycle_start" IS 'deduction origin cycle';



COMMENT ON COLUMN "public"."deductions"."deduction_cycle_start" IS 'deduction submit cycle';



CREATE SEQUENCE IF NOT EXISTS "public"."deduction_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."deduction_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."deduction_id_seq" OWNED BY "public"."deductions"."id";



CREATE TABLE IF NOT EXISTS "public"."haulblaze_contact" (
    "id" integer NOT NULL,
    "haulblaze_id" "text",
    "first_name" character varying NOT NULL,
    "last_name" character varying NOT NULL,
    "date_of_birth" "date" DEFAULT '1970-01-01'::"date" NOT NULL,
    "warehouse" "text",
    "phone" character varying,
    "email" character varying,
    "driver_license_no" character varying,
    "social_security_no" character varying,
    "routing_number" character varying,
    "account_number" character varying,
    "zelle" character varying,
    "enroll_time" timestamp without time zone DEFAULT "now"(),
    "status" "public"."status_enum_31d11e70" DEFAULT 'Onboarding'::"public"."status_enum_31d11e70",
    "driver_id" integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
    "team_name" "public"."team_name_enum",
    "driver_type" "public"."driver_type_enum" DEFAULT 'HAULER'::"public"."driver_type_enum" NOT NULL,
    "commisson_rate" double precision DEFAULT 0.00 NOT NULL,
    "mail_street" character varying,
    "dl_expired_time" "date",
    "uid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "mail_city" character varying(255),
    "mail_state" character varying(255),
    "mail_zip" integer,
    "last_update" "date",
    "has_notification" integer DEFAULT 0
);


ALTER TABLE "public"."haulblaze_contact" OWNER TO "postgres";


COMMENT ON COLUMN "public"."haulblaze_contact"."haulblaze_id" IS 'last 6 char of DL';



CREATE OR REPLACE VIEW "public"."deduction_with_driver" AS
 SELECT "d"."id" AS "deduction_id",
    "d"."amount" AS "deduction_amount",
    "d"."reason" AS "deduction_reason",
    "d"."event_cycle_start" AS "cycle_start",
    "d"."tracking_number",
    "d"."team_name",
    "d"."notes",
    "d"."payment_id" AS "original_payment_id",
    "d"."driver_id",
    "pr"."id" AS "payment_id",
    "pr"."uid" AS "driver_uid",
    "dr"."first_name" AS "driver_first_name",
    "dr"."last_name" AS "driver_last_name",
    "dr"."warehouse" AS "driver_warehouse",
    "dr"."email" AS "driver_email",
    "dr"."phone" AS "driver_phone"
   FROM (("public"."deductions" "d"
     LEFT JOIN "public"."payment_record" "pr" ON (("d"."payment_id" = "pr"."id")))
     LEFT JOIN "public"."haulblaze_contact" "dr" ON (("pr"."uid" = "dr"."uid")));


ALTER TABLE "public"."deduction_with_driver" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."delivery_import_records" (
    "id" integer NOT NULL,
    "file_name" character varying(255) NOT NULL,
    "import_time" timestamp without time zone NOT NULL,
    "file_size" bigint NOT NULL,
    "record_count" integer NOT NULL,
    "customer" character varying(255) NOT NULL,
    "team_name" character varying(255) NOT NULL,
    "cycle_start" "date" NOT NULL,
    "cycle_end" "date" NOT NULL,
    "file_url" character varying(255) NOT NULL,
    "status" character varying(50) NOT NULL
);


ALTER TABLE "public"."delivery_import_records" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."delivery_import_records_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."delivery_import_records_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."delivery_import_records_id_seq" OWNED BY "public"."delivery_import_records"."id";



CREATE TABLE IF NOT EXISTS "public"."delivery_record" (
    "warehouse" "public"."area_code_enum_bd3e18a1" NOT NULL,
    "team_id" integer NOT NULL,
    "team_name" "public"."team_name_enum" DEFAULT 'HAULBLAZE'::"public"."team_name_enum",
    "custom_id" "public"."custom_id_enum" NOT NULL,
    "settle_rate" numeric(5,2) NOT NULL,
    "driver_str" character varying(100) NOT NULL,
    "date" "date" NOT NULL,
    "order_cnt_0_1" integer DEFAULT 0 NOT NULL,
    "salary_0_1" numeric(8,2) DEFAULT 0 NOT NULL,
    "order_cnt_0_5" integer DEFAULT 0 NOT NULL,
    "salary_0_5" numeric(8,2) DEFAULT 0 NOT NULL,
    "order_cnt_5_10" integer DEFAULT 0 NOT NULL,
    "salary_5_10" numeric(8,2) DEFAULT 0 NOT NULL,
    "order_cnt_1_10" integer DEFAULT 0 NOT NULL,
    "salary_1_10" numeric(8,2) DEFAULT 0 NOT NULL,
    "order_cnt_10" integer DEFAULT 0 NOT NULL,
    "salary_10" numeric(8,2) DEFAULT 0 NOT NULL,
    "total_single_order_cnt" integer DEFAULT 0 NOT NULL,
    "total_single_salary" numeric(8,2) DEFAULT 0 NOT NULL,
    "total_mul_ord_fst_order_cnt" integer DEFAULT 0 NOT NULL,
    "total_mul_ord_fst_salary" numeric(8,2) DEFAULT 0 NOT NULL,
    "total_mul_ord_rst_order_cnt" integer DEFAULT 0 NOT NULL,
    "total_mul_ord_rst_salary" numeric(8,2) DEFAULT 0 NOT NULL,
    "total_mul_order_cnt" integer DEFAULT 0 NOT NULL,
    "total_mul_ord_salary" numeric(8,2) DEFAULT 0 NOT NULL,
    "total_order_cnt" integer DEFAULT 0 NOT NULL,
    "total_salary" numeric(8,2) DEFAULT 0 NOT NULL,
    "record_id" integer NOT NULL,
    "create_time" timestamp without time zone DEFAULT "now"(),
    "update_time" timestamp without time zone DEFAULT "now"(),
    "driver_salary" numeric(10,2),
    "custom_uid" integer,
    "cycle_start" "date" DEFAULT '2024-01-01'::"date" NOT NULL,
    "cycle_end" "date" DEFAULT '2024-01-01'::"date",
    "uid" character(36),
    "payment_id" integer,
    "warehouse_temp" "public"."warehouse_enum"
);


ALTER TABLE "public"."delivery_record" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."delivery_records_record_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."delivery_records_record_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."delivery_records_record_id_seq" OWNED BY "public"."delivery_record"."record_id";



CREATE TABLE IF NOT EXISTS "public"."delivery_report" (
    "id" integer NOT NULL,
    "uid" "uuid",
    "driver_id" integer NOT NULL,
    "date" "date" NOT NULL,
    "delivered_count" integer DEFAULT 0,
    "total_count" integer DEFAULT 0,
    "return_count" integer DEFAULT 0,
    "missing_count" integer DEFAULT 0,
    "wrong_count" integer DEFAULT 0,
    "next_day_est_count" integer DEFAULT 0,
    "support_images" "text"[],
    "support_notes" "text",
    "create_time" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "update_time" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "retry_count" integer DEFAULT 0 NOT NULL,
    "retry_pkg_list" "jsonb"
);


ALTER TABLE "public"."delivery_report" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."delivery_report_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."delivery_report_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."delivery_report_id_seq" OWNED BY "public"."delivery_report"."id";



CREATE OR REPLACE VIEW "public"."delivery_summary" AS
 SELECT "delivery_record"."warehouse",
    "delivery_record"."team_id",
    "delivery_record"."team_name",
    "delivery_record"."driver_str",
    "delivery_record"."custom_uid",
    "date_trunc"('month'::"text", ("delivery_record"."date")::timestamp without time zone) AS "month",
    "count"(*) AS "attendance",
    "sum"("delivery_record"."order_cnt_0_1") AS "order_cnt_0_1",
    "sum"("delivery_record"."salary_0_1") AS "salary_0_1",
    "sum"("delivery_record"."order_cnt_0_5") AS "order_cnt_0_5",
    "sum"("delivery_record"."salary_0_5") AS "salary_0_5",
    "sum"("delivery_record"."order_cnt_5_10") AS "order_cnt_5_10",
    "sum"("delivery_record"."salary_5_10") AS "salary_5_10",
    "sum"("delivery_record"."order_cnt_1_10") AS "order_cnt_1_10",
    "sum"("delivery_record"."salary_1_10") AS "salary_1_10",
    "sum"("delivery_record"."order_cnt_10") AS "order_cnt_10",
    "sum"("delivery_record"."salary_10") AS "salary_10",
    "sum"("delivery_record"."total_single_order_cnt") AS "total_single_order_cnt",
    "sum"("delivery_record"."total_single_salary") AS "total_single_salary",
    "sum"("delivery_record"."total_mul_ord_fst_order_cnt") AS "total_mul_ord_fst_order_cnt",
    "sum"("delivery_record"."total_mul_ord_fst_salary") AS "total_mul_ord_fst_salary",
    "sum"("delivery_record"."total_mul_ord_rst_order_cnt") AS "total_mul_ord_rst_order_cnt",
    "sum"("delivery_record"."total_mul_ord_rst_salary") AS "total_mul_ord_rst_salary",
    "sum"("delivery_record"."total_mul_order_cnt") AS "total_mul_order_cnt",
    "sum"("delivery_record"."total_mul_ord_salary") AS "total_mul_ord_salary",
    "sum"("delivery_record"."total_order_cnt") AS "total_order_cnt",
    "sum"("delivery_record"."total_salary") AS "total_salary"
   FROM "public"."delivery_record"
  GROUP BY "delivery_record"."warehouse", "delivery_record"."team_id", "delivery_record"."team_name", "delivery_record"."driver_str", "delivery_record"."custom_uid", ("date_trunc"('month'::"text", ("delivery_record"."date")::timestamp without time zone));


ALTER TABLE "public"."delivery_summary" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."id_record" (
    "id" integer NOT NULL,
    "custom_id" "public"."custom_id_enum" NOT NULL,
    "custom_uid" integer NOT NULL,
    "warehouse" "public"."warehouse_enum" NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "create_time" timestamp without time zone DEFAULT "now"(),
    "update_time" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."id_record" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."driver_id_record_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."driver_id_record_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."driver_id_record_id_seq" OWNED BY "public"."id_record"."id";



CREATE OR REPLACE VIEW "public"."driver_summary" AS
 SELECT "dr"."team_name",
    "dr"."custom_id",
    "dr"."warehouse",
    "dr"."custom_uid" AS "driver_id",
    "max"("dr"."date") AS "last_active_date",
    "sum"("dr"."total_order_cnt") AS "total_order_cnt",
    "sum"("dr"."total_salary") AS "total_salary",
    "count"(DISTINCT "dr"."date") AS "working_days",
    "max"("dr"."total_order_cnt") AS "max_daily_order_cnt"
   FROM "public"."delivery_record" "dr"
  GROUP BY "dr"."team_name", "dr"."custom_id", "dr"."warehouse", "dr"."custom_uid";


ALTER TABLE "public"."driver_summary" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."driver_uid_summary" AS
 SELECT "dr"."team_name",
    "dr"."custom_id",
    "dr"."warehouse",
    "dr"."uid",
    "max"("dr"."date") AS "last_active_date",
    "sum"("dr"."total_order_cnt") AS "total_order_cnt",
    "sum"("dr"."total_salary") AS "total_salary",
    "count"(DISTINCT "dr"."date") AS "working_days",
    "max"("dr"."total_order_cnt") AS "max_trip_order_cnt",
    "avg"("dr"."total_order_cnt") AS "avg_trip_order_cnt"
   FROM "public"."delivery_record" "dr"
  GROUP BY "dr"."team_name", "dr"."custom_id", "dr"."warehouse", "dr"."uid";


ALTER TABLE "public"."driver_uid_summary" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."financial_record" (
    "id" integer NOT NULL,
    "type" "public"."fin_type_enum" DEFAULT 'DEBT'::"public"."fin_type_enum" NOT NULL,
    "payment_type" "public"."fin_payment_type_enum" DEFAULT 'ACH'::"public"."fin_payment_type_enum" NOT NULL,
    "payment_status" "public"."fin_payment_status_enum" DEFAULT 'WAITING'::"public"."fin_payment_status_enum" NOT NULL,
    "debt_status" "public"."fin_debt_status_enum" DEFAULT 'PROCESSING'::"public"."fin_debt_status_enum" NOT NULL,
    "amount" numeric DEFAULT 0 NOT NULL,
    "description" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "uid" "uuid"
);


ALTER TABLE "public"."financial_record" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."financial_record_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."financial_record_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."financial_record_id_seq" OWNED BY "public"."financial_record"."id";



CREATE SEQUENCE IF NOT EXISTS "public"."haulblaze_contact_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."haulblaze_contact_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."haulblaze_contact_id_seq" OWNED BY "public"."haulblaze_contact"."id";



CREATE TABLE IF NOT EXISTS "public"."inspections" (
    "id" bigint NOT NULL,
    "visit_type" "text",
    "unit_id" bigint,
    "image_url" "text",
    "notes" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "kitchen_checklist" "jsonb",
    "livingroom_checklist" "jsonb"
);


ALTER TABLE "public"."inspections" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."invoice_items" (
    "id" integer NOT NULL,
    "invoice_number" character varying(255) NOT NULL,
    "item_name" character varying(100) NOT NULL,
    "quantity" integer NOT NULL,
    "rate" numeric(10,2),
    "amount" numeric(10,2) NOT NULL
);


ALTER TABLE "public"."invoice_items" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."invoice_items_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."invoice_items_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."invoice_items_id_seq" OWNED BY "public"."invoice_items"."id";



CREATE OR REPLACE VIEW "public"."invoice_view" AS
 WITH "delivery_data" AS (
         SELECT "delivery_record"."warehouse",
            "delivery_record"."team_name",
            "delivery_record"."custom_id",
            "delivery_record"."cycle_start",
            "delivery_record"."cycle_end",
            "sum"("delivery_record"."total_order_cnt") AS "total_order_cnt",
            "sum"("delivery_record"."total_salary") AS "total_salary",
            "round"(("sum"("delivery_record"."total_salary") / (NULLIF("sum"("delivery_record"."total_order_cnt"), 0))::numeric), 3) AS "avg_price"
           FROM "public"."delivery_record"
          GROUP BY "delivery_record"."warehouse", "delivery_record"."team_name", "delivery_record"."custom_id", "delivery_record"."cycle_start", "delivery_record"."cycle_end"
        ), "deduction_data" AS (
         SELECT ("deductions"."warehouse")::"public"."area_code_enum_bd3e18a1" AS "warehouse",
            "deductions"."team_name",
            "deductions"."custom_id",
            "deductions"."event_cycle_start",
            "sum"("deductions"."amount") AS "total_deductions"
           FROM "public"."deductions"
          GROUP BY "deductions"."warehouse", "deductions"."team_name", "deductions"."custom_id", "deductions"."event_cycle_start"
        )
 SELECT "d"."warehouse",
    "d"."team_name",
    "d"."custom_id",
    "d"."cycle_start" AS "payment_cycle_start",
    "d"."cycle_end" AS "payment_cycle_end",
    "d"."total_order_cnt",
    "d"."total_salary",
    "d"."avg_price",
    COALESCE("dd"."total_deductions", (0)::numeric) AS "total_deductions",
    ("d"."total_salary" - COALESCE("dd"."total_deductions", (0)::numeric)) AS "net_salary"
   FROM ("delivery_data" "d"
     LEFT JOIN "deduction_data" "dd" ON ((("d"."warehouse" = "dd"."warehouse") AND ("d"."team_name" = "dd"."team_name") AND ("d"."custom_id" = "dd"."custom_id") AND ("d"."cycle_start" = "dd"."event_cycle_start"))))
  ORDER BY "d"."warehouse", "d"."team_name", "d"."custom_id", "d"."cycle_start";


ALTER TABLE "public"."invoice_view" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."invoices" (
    "id" integer NOT NULL,
    "invoice_number" character varying NOT NULL,
    "sender_id" integer,
    "recipient_id" integer,
    "invoice_date" "date" NOT NULL,
    "due_date" "date" NOT NULL,
    "tax" numeric(10,2) NOT NULL,
    "adjustment" numeric(10,2) DEFAULT 0,
    "total" numeric(10,2) NOT NULL,
    "amount_paid" numeric(10,2) NOT NULL,
    "due_balance" numeric(10,2) NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."invoice_status" DEFAULT 'DRAFT'::"public"."invoice_status" NOT NULL
);


ALTER TABLE "public"."invoices" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."invoices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."invoices_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."invoices_id_seq" OWNED BY "public"."invoices"."id";



CREATE TABLE IF NOT EXISTS "public"."mobile_app_sample_data" (
    "id" bigint NOT NULL,
    "name" "text",
    "email" "text",
    "sales" bigint,
    "image" "text"
);


ALTER TABLE "public"."mobile_app_sample_data" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."pay_cycle_summary" AS
 SELECT "dr"."warehouse",
    "dr"."team_name",
    "dr"."custom_id",
    "dr"."cycle_start",
    "dr"."cycle_end",
    ("date_trunc"('month'::"text", ("dr"."cycle_start")::timestamp without time zone))::"date" AS "cycle_month",
    ("count"(DISTINCT "dr"."custom_uid"))::integer AS "total_driver_count",
    ("count"(*))::integer AS "total_delivery_trips",
    ("sum"("dr"."total_order_cnt"))::integer AS "total_order_count",
    ("sum"("dr"."total_salary"))::integer AS "total_salary",
    ("sum"("dr"."driver_salary"))::integer AS "total_driver_salary",
    ("round"("avg"("dr"."total_order_cnt"), 2))::numeric(10,2) AS "avg_order_count_per_trip"
   FROM "public"."delivery_record" "dr"
  GROUP BY "dr"."warehouse", "dr"."team_name", "dr"."custom_id", "dr"."cycle_start", "dr"."cycle_end";


ALTER TABLE "public"."pay_cycle_summary" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."pay_method_stat" AS
 SELECT "subquery"."team_name",
    "subquery"."custom_id",
    "subquery"."cycle_start",
    "json_object_agg"("subquery"."payment_method", "subquery"."count") AS "pay_method_stat"
   FROM ( SELECT "payment_record"."team_name",
            "payment_record"."custom_id",
            "payment_record"."cycle_start",
            "payment_record"."payment_method",
            "count"(*) AS "count"
           FROM "public"."payment_record"
          GROUP BY "payment_record"."team_name", "payment_record"."custom_id", "payment_record"."cycle_start", "payment_record"."payment_method") "subquery"
  GROUP BY "subquery"."team_name", "subquery"."custom_id", "subquery"."cycle_start";


ALTER TABLE "public"."pay_method_stat" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."pay_method_summary" AS
 SELECT "p"."cycle_start",
    "p"."cycle_end",
    "p"."payment_method",
    "p"."team_name",
    "p"."custom_id",
    "p"."warehouse",
    "count"(*) AS "payment_count",
    "sum"("p"."actual_amount_paid") AS "total_paid_amount"
   FROM "public"."payment_record" "p"
  GROUP BY "p"."cycle_start", "p"."cycle_end", "p"."payment_method", "p"."team_name", "p"."custom_id", "p"."warehouse";


ALTER TABLE "public"."pay_method_summary" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."payment_agg" AS
 SELECT "payment_record"."team_name",
    "payment_record"."custom_id",
    "payment_record"."cycle_start",
    "payment_record"."warehouse",
    "payment_record"."cycle_end",
    "count"(DISTINCT "payment_record"."custom_uid") AS "driver_count",
    "sum"("payment_record"."attendance") AS "attendance_count",
    "sum"("payment_record"."actual_amount_paid") AS "actual_paid_amount",
    "count"(DISTINCT
        CASE
            WHEN ("payment_record"."actual_amount_paid" > (0)::numeric) THEN "payment_record"."custom_uid"
            ELSE NULL::integer
        END) AS "actual_paid_count",
    "sum"("payment_record"."net_pay") AS "net_pay_amount",
    "sum"("payment_record"."gross_pay") AS "gross_pay_amount",
    "sum"("payment_record"."pre_paid") AS "pre_paid_amount",
    "sum"("payment_record"."allowance") AS "allowance_amount",
    "sum"("payment_record"."bonus") AS "bonus_amount",
    "count"(DISTINCT
        CASE
            WHEN ("payment_record"."deduction_amount" > (0)::numeric) THEN "payment_record"."custom_uid"
            ELSE NULL::integer
        END) AS "deduction_count",
    "sum"("payment_record"."deduction_amount") AS "deduction_amount"
   FROM "public"."payment_record"
  GROUP BY "payment_record"."team_name", "payment_record"."custom_id", "payment_record"."cycle_start", "payment_record"."warehouse", "payment_record"."cycle_end";


ALTER TABLE "public"."payment_agg" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."payment_record_driver_summary" AS
 SELECT "payment_record"."custom_uid" AS "driver_id",
    "count"(*) AS "total_payments",
    "sum"("payment_record"."gross_pay") AS "total_gross_pay",
    "sum"("payment_record"."pre_paid") AS "total_pre_paid",
    "sum"("payment_record"."bonus") AS "total_bonus",
    "sum"("payment_record"."deduction_amount") AS "total_deductions",
    "sum"("payment_record"."allowance") AS "total_allowance",
    "sum"("payment_record"."net_pay") AS "total_net_pay",
    "sum"("payment_record"."actual_amount_paid") AS "total_actual_amount_paid",
    "avg"("payment_record"."gross_pay") AS "avg_gross_pay",
    "avg"("payment_record"."pre_paid") AS "avg_pre_paid",
    "avg"("payment_record"."bonus") AS "avg_bonus",
    "avg"("payment_record"."deduction_amount") AS "avg_deductions",
    "avg"("payment_record"."allowance") AS "avg_allowance",
    "avg"("payment_record"."net_pay") AS "avg_net_pay",
    "avg"("payment_record"."actual_amount_paid") AS "avg_actual_amount_paid"
   FROM "public"."payment_record"
  GROUP BY "payment_record"."custom_uid"
  ORDER BY "payment_record"."custom_uid";


ALTER TABLE "public"."payment_record_driver_summary" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."payment_record_monthly_summary" AS
 SELECT "payment_record"."custom_uid" AS "driver_id",
    "date_trunc"('month'::"text", ("payment_record"."cycle_start")::timestamp without time zone) AS "month",
    "count"(*) AS "total_payments",
    "sum"("payment_record"."gross_pay") AS "total_gross_pay",
    "sum"("payment_record"."pre_paid") AS "total_pre_paid",
    "sum"("payment_record"."bonus") AS "total_bonus",
    "sum"("payment_record"."deduction_amount") AS "total_deductions",
    "sum"("payment_record"."allowance") AS "total_allowance",
    "sum"("payment_record"."net_pay") AS "total_net_pay",
    "sum"("payment_record"."actual_amount_paid") AS "total_actual_amount_paid",
    "avg"("payment_record"."gross_pay") AS "avg_gross_pay",
    "avg"("payment_record"."pre_paid") AS "avg_pre_paid",
    "avg"("payment_record"."bonus") AS "avg_bonus",
    "avg"("payment_record"."deduction_amount") AS "avg_deductions",
    "avg"("payment_record"."allowance") AS "avg_allowance",
    "avg"("payment_record"."net_pay") AS "avg_net_pay",
    "avg"("payment_record"."actual_amount_paid") AS "avg_actual_amount_paid"
   FROM "public"."payment_record"
  GROUP BY "payment_record"."custom_uid", ("date_trunc"('month'::"text", ("payment_record"."cycle_start")::timestamp without time zone))
  ORDER BY "payment_record"."custom_uid", ("date_trunc"('month'::"text", ("payment_record"."cycle_start")::timestamp without time zone));


ALTER TABLE "public"."payment_record_monthly_summary" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."payment_record_yearly_summary" AS
 SELECT "date_trunc"('year'::"text", ("payment_record"."cycle_start")::timestamp with time zone) AS "year",
    "count"(*) AS "total_payments",
    "sum"("payment_record"."gross_pay") AS "total_gross_pay",
    "sum"("payment_record"."pre_paid") AS "total_pre_paid",
    "sum"("payment_record"."bonus") AS "total_bonus",
    "sum"("payment_record"."deduction_amount") AS "total_deductions",
    "sum"("payment_record"."allowance") AS "total_allowance",
    "sum"("payment_record"."net_pay") AS "total_net_pay",
    "sum"("payment_record"."actual_amount_paid") AS "total_actual_amount_paid",
    "avg"("payment_record"."gross_pay") AS "avg_gross_pay",
    "avg"("payment_record"."pre_paid") AS "avg_pre_paid",
    "avg"("payment_record"."bonus") AS "avg_bonus",
    "avg"("payment_record"."deduction_amount") AS "avg_deductions",
    "avg"("payment_record"."allowance") AS "avg_allowance",
    "avg"("payment_record"."net_pay") AS "avg_net_pay",
    "avg"("payment_record"."actual_amount_paid") AS "avg_actual_amount_paid"
   FROM "public"."payment_record"
  GROUP BY ("date_trunc"('year'::"text", ("payment_record"."cycle_start")::timestamp with time zone))
  ORDER BY ("date_trunc"('year'::"text", ("payment_record"."cycle_start")::timestamp with time zone));


ALTER TABLE "public"."payment_record_yearly_summary" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."phx payment@0220-0226_summary_vercel_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."phx payment@0220-0226_summary_vercel_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."phx payment@0220-0226_summary_vercel_id_seq" OWNED BY "public"."payment_record"."id";



CREATE TABLE IF NOT EXISTS "public"."sample_transactions" (
    "id" integer NOT NULL,
    "account_number" "text",
    "company" "text",
    "transaction_date" timestamp without time zone,
    "payment_type" "text",
    "plan" "text"
);


ALTER TABLE "public"."sample_transactions" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."sample_transactions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."sample_transactions_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."sample_transactions_id_seq" OWNED BY "public"."sample_transactions"."id";



CREATE TABLE IF NOT EXISTS "public"."sample_users" (
    "id" integer NOT NULL,
    "name" "text",
    "email" "text",
    "signup_date" timestamp without time zone,
    "role" "text",
    "enabled" boolean
);


ALTER TABLE "public"."sample_users" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."sample_users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."sample_users_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."sample_users_id_seq" OWNED BY "public"."sample_users"."id";



CREATE TABLE IF NOT EXISTS "public"."units" (
    "id" bigint NOT NULL,
    "building_id" bigint,
    "img_url" "text",
    "number" "text",
    "status" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."units" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."update_log" (
    "id" integer NOT NULL,
    "uid" character varying(255) NOT NULL,
    "modified_by" character varying(255) NOT NULL,
    "modification_time" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "old_value" "json",
    "new_value" "json",
    "reason" "text"
);


ALTER TABLE "public"."update_log" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."update_log_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."update_log_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."update_log_id_seq" OWNED BY "public"."update_log"."id";



CREATE TABLE IF NOT EXISTS "public"."zion_enum" (
    "id" integer NOT NULL,
    "type" "text",
    "value" "text",
    "label" "text",
    "create_time" timestamp with time zone,
    "notes" "text",
    "status" integer DEFAULT 2 NOT NULL
);


ALTER TABLE "public"."zion_enum" OWNER TO "postgres";


COMMENT ON COLUMN "public"."zion_enum"."status" IS '1 = Active 2 = inactive';



CREATE SEQUENCE IF NOT EXISTS "public"."zion_enum_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."zion_enum_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."zion_enum_id_seq" OWNED BY "public"."zion_enum"."id";



ALTER TABLE ONLY "public"."__retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_ac8c_1" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."__retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."__retool_vector__demo__vector___zemin_lu_78996ac3_f54e_48c4_b0f" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."__retool_vector__demo__vector___zemin_lu_78996ac3_f54e_4_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."__retool_vector_deduction_table_struct_cda06ff5_b4bd_49f2_af8b_" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."__retool_vector_deduction_table_struct_cda06ff5_b4bd_49f_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."customers" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."customers_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."deductions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."deduction_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."delivery_import_records" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."delivery_import_records_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."delivery_record" ALTER COLUMN "record_id" SET DEFAULT "nextval"('"public"."delivery_records_record_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."delivery_report" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."delivery_report_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."financial_record" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."financial_record_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."haulblaze_contact" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."haulblaze_contact_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."id_record" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."driver_id_record_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."invoice_items" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."invoice_items_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."invoices" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."invoices_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."payment_record" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."phx payment@0220-0226_summary_vercel_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."sample_transactions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."sample_transactions_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."sample_users" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."sample_users_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."update_log" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."update_log_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."zion_enum" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."zion_enum_id_seq"'::"regclass");



ALTER TABLE ONLY "__segment_reverse_etl"."checkpoints"
    ADD CONSTRAINT "checkpoints_pkey" PRIMARY KEY ("source_id", "model_id");



ALTER TABLE ONLY "__segment_reverse_etl"."records"
    ADD CONSTRAINT "records_pkey" PRIMARY KEY ("source_id", "model_id", "record_id");



ALTER TABLE ONLY "public"."__retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_ac8c_1"
    ADD CONSTRAINT "__retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_a_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."__retool_vector__demo__vector___zemin_lu_78996ac3_f54e_48c4_b0f"
    ADD CONSTRAINT "__retool_vector__demo__vector___zemin_lu_78996ac3_f54e_48c_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."__retool_vector_deduction_table_struct_cda06ff5_b4bd_49f2_af8b_"
    ADD CONSTRAINT "__retool_vector_deduction_table_struct_cda06ff5_b4bd_49f2__pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."buildings"
    ADD CONSTRAINT "buildings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deductions"
    ADD CONSTRAINT "deduction_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."delivery_import_records"
    ADD CONSTRAINT "delivery_import_records_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."delivery_record"
    ADD CONSTRAINT "delivery_records_pkey" PRIMARY KEY ("record_id");



ALTER TABLE ONLY "public"."delivery_report"
    ADD CONSTRAINT "delivery_report_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."id_record"
    ADD CONSTRAINT "driver_id_record_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."financial_record"
    ADD CONSTRAINT "financial_record_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."haulblaze_contact"
    ADD CONSTRAINT "haulblaze_contact_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."inspections"
    ADD CONSTRAINT "inspections_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."invoice_items"
    ADD CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."invoices"
    ADD CONSTRAINT "invoices_invoice_number_key" UNIQUE ("invoice_number");



ALTER TABLE ONLY "public"."invoices"
    ADD CONSTRAINT "invoices_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."mobile_app_sample_data"
    ADD CONSTRAINT "mobile_app_sample_data_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payment_record"
    ADD CONSTRAINT "phx payment@0220-0226_summary_vercel_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."sample_transactions"
    ADD CONSTRAINT "sample_transactions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."sample_users"
    ADD CONSTRAINT "sample_users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."units"
    ADD CONSTRAINT "units_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."update_log"
    ADD CONSTRAINT "update_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."zion_enum"
    ADD CONSTRAINT "zion_enum_pkey" PRIMARY KEY ("id");



CREATE UNIQUE INDEX "first_name_last_name_date_of_birth_1714329623745_index" ON "public"."haulblaze_contact" USING "btree" ("first_name", "last_name", "date_of_birth");



CREATE UNIQUE INDEX "haulblaze_id_1711779654957_index" ON "public"."haulblaze_contact" USING "btree" ("haulblaze_id");



CREATE INDEX "idx_delivery_record_payment_lookup" ON "public"."delivery_record" USING "btree" ("custom_id", "custom_uid", "cycle_start", "cycle_end", "team_name", "payment_id");



CREATE INDEX "idx_payment_record_unique_combination" ON "public"."payment_record" USING "btree" ("custom_id", "custom_uid", "cycle_start", "cycle_end", "team_name");



CREATE UNIQUE INDEX "invoice_number_1719997172867_index" ON "public"."invoices" USING "btree" ("invoice_number");



CREATE UNIQUE INDEX "uid_1714329706495_index" ON "public"."haulblaze_contact" USING "btree" ("uid");



CREATE UNIQUE INDEX "warehouse_team_name_custom_id_driver_str_date_cycle_start_cycle" ON "public"."delivery_record" USING "btree" ("warehouse", "team_name", "custom_id", "driver_str", "date", "cycle_start", "cycle_end");



CREATE OR REPLACE TRIGGER "set_payment_id" BEFORE INSERT OR UPDATE ON "public"."deductions" FOR EACH ROW EXECUTE FUNCTION "public"."set_deductions_payment_id"();



CREATE OR REPLACE TRIGGER "tr_update_payment_record" AFTER INSERT OR UPDATE ON "public"."delivery_record" FOR EACH ROW EXECUTE FUNCTION "public"."update_payment_record"();



CREATE OR REPLACE TRIGGER "trigger_update_payment_time" BEFORE UPDATE OF "actual_amount_paid" ON "public"."payment_record" FOR EACH ROW EXECUTE FUNCTION "public"."update_payment_time"();



ALTER TABLE ONLY "public"."financial_record"
    ADD CONSTRAINT "contact_uid" FOREIGN KEY ("uid") REFERENCES "public"."haulblaze_contact"("uid") ON UPDATE CASCADE;



ALTER TABLE ONLY "public"."deductions"
    ADD CONSTRAINT "deductions_uid_fkey" FOREIGN KEY ("uid") REFERENCES "public"."haulblaze_contact"("uid");



ALTER TABLE ONLY "public"."delivery_record"
    ADD CONSTRAINT "delivery_record_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "public"."payment_record"("id");



ALTER TABLE ONLY "public"."delivery_report"
    ADD CONSTRAINT "delivery_report_uid_fkey" FOREIGN KEY ("uid") REFERENCES "public"."haulblaze_contact"("uid");



ALTER TABLE ONLY "public"."invoice_items"
    ADD CONSTRAINT "invoice_items_invoice_number_fkey" FOREIGN KEY ("invoice_number") REFERENCES "public"."invoices"("invoice_number");



ALTER TABLE ONLY "public"."invoices"
    ADD CONSTRAINT "invoices_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "public"."customers"("id");



ALTER TABLE ONLY "public"."invoices"
    ADD CONSTRAINT "invoices_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."customers"("id");



ALTER TABLE ONLY "public"."deductions"
    ADD CONSTRAINT "linkpayment" FOREIGN KEY ("payment_id") REFERENCES "public"."payment_record"("id");



ALTER TABLE ONLY "public"."payment_record"
    ADD CONSTRAINT "payment_record_uid_fkey" FOREIGN KEY ("uid") REFERENCES "public"."haulblaze_contact"("uid") ON DELETE RESTRICT;



CREATE PUBLICATION "prisma_pulse_fe93430a" FOR ALL TABLES WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION "prisma_pulse_fe93430a" OWNER TO "postgres";




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_in"("cstring", "oid", integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_in"("cstring", "oid", integer) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_in"("cstring", "oid", integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_in"("cstring", "oid", integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_out"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_out"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_out"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_out"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_recv"("internal", "oid", integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_recv"("internal", "oid", integer) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_recv"("internal", "oid", integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_recv"("internal", "oid", integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_send"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_send"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_send"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_send"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_typmod_in"("cstring"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_typmod_in"("cstring"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_typmod_in"("cstring"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_typmod_in"("cstring"[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_in"("cstring", "oid", integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_in"("cstring", "oid", integer) TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_in"("cstring", "oid", integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_in"("cstring", "oid", integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_out"("public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_out"("public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_out"("public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_out"("public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_recv"("internal", "oid", integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_recv"("internal", "oid", integer) TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_recv"("internal", "oid", integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_recv"("internal", "oid", integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_send"("public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_send"("public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_send"("public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_send"("public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_typmod_in"("cstring"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_typmod_in"("cstring"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_typmod_in"("cstring"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_typmod_in"("cstring"[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_in"("cstring", "oid", integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_in"("cstring", "oid", integer) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_in"("cstring", "oid", integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_in"("cstring", "oid", integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_out"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_out"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_out"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_out"("public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_recv"("internal", "oid", integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_recv"("internal", "oid", integer) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_recv"("internal", "oid", integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_recv"("internal", "oid", integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_send"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_send"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_send"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_send"("public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_typmod_in"("cstring"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_typmod_in"("cstring"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_typmod_in"("cstring"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_typmod_in"("cstring"[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_halfvec"(real[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(real[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(real[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(real[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_vector"(real[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_vector"(real[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_vector"(real[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_vector"(real[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_halfvec"(double precision[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(double precision[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(double precision[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(double precision[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_vector"(double precision[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_vector"(double precision[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_vector"(double precision[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_vector"(double precision[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_halfvec"(integer[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(integer[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(integer[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(integer[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_vector"(integer[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_vector"(integer[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_vector"(integer[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_vector"(integer[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_halfvec"(numeric[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(numeric[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(numeric[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(numeric[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_vector"(numeric[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_vector"(numeric[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_vector"(numeric[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_vector"(numeric[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_to_float4"("public"."halfvec", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_to_float4"("public"."halfvec", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_to_float4"("public"."halfvec", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_to_float4"("public"."halfvec", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec"("public"."halfvec", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec"("public"."halfvec", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec"("public"."halfvec", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec"("public"."halfvec", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_to_sparsevec"("public"."halfvec", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_to_sparsevec"("public"."halfvec", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_to_sparsevec"("public"."halfvec", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_to_sparsevec"("public"."halfvec", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_to_vector"("public"."halfvec", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_to_vector"("public"."halfvec", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_to_vector"("public"."halfvec", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_to_vector"("public"."halfvec", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_to_halfvec"("public"."sparsevec", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_to_halfvec"("public"."sparsevec", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_to_halfvec"("public"."sparsevec", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_to_halfvec"("public"."sparsevec", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec"("public"."sparsevec", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec"("public"."sparsevec", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec"("public"."sparsevec", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec"("public"."sparsevec", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_to_vector"("public"."sparsevec", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_to_vector"("public"."sparsevec", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_to_vector"("public"."sparsevec", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_to_vector"("public"."sparsevec", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_to_float4"("public"."vector", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_to_float4"("public"."vector", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_to_float4"("public"."vector", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_to_float4"("public"."vector", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_to_halfvec"("public"."vector", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_to_halfvec"("public"."vector", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_to_halfvec"("public"."vector", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_to_halfvec"("public"."vector", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_to_sparsevec"("public"."vector", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_to_sparsevec"("public"."vector", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_to_sparsevec"("public"."vector", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_to_sparsevec"("public"."vector", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector"("public"."vector", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector"("public"."vector", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."vector"("public"."vector", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector"("public"."vector", integer, boolean) TO "service_role";









































































































































































































GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."calculate_driver_salary"() TO "anon";
GRANT ALL ON FUNCTION "public"."calculate_driver_salary"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."calculate_driver_salary"() TO "service_role";



GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_payment_id"("p_driver_id" integer, "p_custom_id" "public"."custom_id_enum", "p_cycle_start" "date", "p_warehouse" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."get_payment_id"("p_driver_id" integer, "p_custom_id" "public"."custom_id_enum", "p_cycle_start" "date", "p_warehouse" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_payment_id"("p_driver_id" integer, "p_custom_id" "public"."custom_id_enum", "p_cycle_start" "date", "p_warehouse" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_accum"(double precision[], "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_accum"(double precision[], "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_accum"(double precision[], "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_accum"(double precision[], "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_add"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_add"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_add"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_add"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_avg"(double precision[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_avg"(double precision[]) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_avg"(double precision[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_avg"(double precision[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_cmp"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_cmp"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_cmp"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_cmp"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_combine"(double precision[], double precision[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_combine"(double precision[], double precision[]) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_combine"(double precision[], double precision[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_combine"(double precision[], double precision[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_concat"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_concat"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_concat"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_concat"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_eq"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_eq"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_eq"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_eq"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_ge"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_ge"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_ge"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_ge"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_gt"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_gt"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_gt"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_gt"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_l2_squared_distance"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_l2_squared_distance"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_l2_squared_distance"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_l2_squared_distance"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_le"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_le"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_le"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_le"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_lt"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_lt"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_lt"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_lt"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_mul"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_mul"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_mul"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_mul"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_ne"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_ne"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_ne"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_ne"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_negative_inner_product"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_negative_inner_product"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_negative_inner_product"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_negative_inner_product"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_spherical_distance"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_spherical_distance"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_spherical_distance"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_spherical_distance"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_sub"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_sub"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_sub"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_sub"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."hamming_distance"(bit, bit) TO "postgres";
GRANT ALL ON FUNCTION "public"."hamming_distance"(bit, bit) TO "anon";
GRANT ALL ON FUNCTION "public"."hamming_distance"(bit, bit) TO "authenticated";
GRANT ALL ON FUNCTION "public"."hamming_distance"(bit, bit) TO "service_role";



GRANT ALL ON FUNCTION "public"."hnsw_bit_support"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."hnsw_bit_support"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."hnsw_bit_support"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."hnsw_bit_support"("internal") TO "service_role";



GRANT ALL ON FUNCTION "public"."hnsw_halfvec_support"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."hnsw_halfvec_support"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."hnsw_halfvec_support"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."hnsw_halfvec_support"("internal") TO "service_role";



GRANT ALL ON FUNCTION "public"."hnsw_sparsevec_support"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."hnsw_sparsevec_support"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."hnsw_sparsevec_support"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."hnsw_sparsevec_support"("internal") TO "service_role";



GRANT ALL ON FUNCTION "public"."hnswhandler"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."hnswhandler"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."hnswhandler"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."hnswhandler"("internal") TO "service_role";



GRANT ALL ON FUNCTION "public"."inner_product"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."inner_product"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."inner_product"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."ivfflat_bit_support"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."ivfflat_bit_support"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."ivfflat_bit_support"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."ivfflat_bit_support"("internal") TO "service_role";



GRANT ALL ON FUNCTION "public"."ivfflat_halfvec_support"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."ivfflat_halfvec_support"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."ivfflat_halfvec_support"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."ivfflat_halfvec_support"("internal") TO "service_role";



GRANT ALL ON FUNCTION "public"."ivfflathandler"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."ivfflathandler"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."ivfflathandler"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."ivfflathandler"("internal") TO "service_role";



GRANT ALL ON FUNCTION "public"."jaccard_distance"(bit, bit) TO "postgres";
GRANT ALL ON FUNCTION "public"."jaccard_distance"(bit, bit) TO "anon";
GRANT ALL ON FUNCTION "public"."jaccard_distance"(bit, bit) TO "authenticated";
GRANT ALL ON FUNCTION "public"."jaccard_distance"(bit, bit) TO "service_role";



GRANT ALL ON FUNCTION "public"."l1_distance"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."l1_distance"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."l1_distance"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."l2_distance"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."l2_distance"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."l2_distance"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."l2_norm"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_norm"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_norm"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_norm"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."l2_norm"("public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_norm"("public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_norm"("public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_norm"("public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."set_deductions_payment_id"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_deductions_payment_id"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_deductions_payment_id"() TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_cmp"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_cmp"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_cmp"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_cmp"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_eq"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_eq"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_eq"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_eq"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_ge"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_ge"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_ge"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_ge"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_gt"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_gt"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_gt"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_gt"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_l2_squared_distance"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_l2_squared_distance"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_l2_squared_distance"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_l2_squared_distance"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_le"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_le"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_le"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_le"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_lt"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_lt"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_lt"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_lt"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_ne"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_ne"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_ne"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_ne"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_negative_inner_product"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_negative_inner_product"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_negative_inner_product"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_negative_inner_product"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."subvector"("public"."halfvec", integer, integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."subvector"("public"."halfvec", integer, integer) TO "anon";
GRANT ALL ON FUNCTION "public"."subvector"("public"."halfvec", integer, integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."subvector"("public"."halfvec", integer, integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."subvector"("public"."vector", integer, integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."subvector"("public"."vector", integer, integer) TO "anon";
GRANT ALL ON FUNCTION "public"."subvector"("public"."vector", integer, integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."subvector"("public"."vector", integer, integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."update_custom_id"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_custom_id"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_custom_id"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_delivery_record_payment_id"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_delivery_record_payment_id"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_delivery_record_payment_id"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_haulblaze_info"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_haulblaze_info"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_haulblaze_info"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_payment_record"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_payment_record"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_payment_record"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_payment_time"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_payment_time"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_payment_time"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_timestamp"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_timestamp"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_timestamp"() TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_accum"(double precision[], "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_accum"(double precision[], "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_accum"(double precision[], "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_accum"(double precision[], "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_add"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_add"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_add"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_add"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_avg"(double precision[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_avg"(double precision[]) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_avg"(double precision[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_avg"(double precision[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_cmp"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_cmp"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_cmp"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_cmp"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_combine"(double precision[], double precision[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_combine"(double precision[], double precision[]) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_combine"(double precision[], double precision[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_combine"(double precision[], double precision[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_concat"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_concat"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_concat"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_concat"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_dims"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_dims"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_dims"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_dims"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_dims"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_dims"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_dims"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_dims"("public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_eq"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_eq"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_eq"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_eq"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_ge"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_ge"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_ge"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_ge"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_gt"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_gt"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_gt"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_gt"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_l2_squared_distance"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_l2_squared_distance"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_l2_squared_distance"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_l2_squared_distance"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_le"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_le"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_le"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_le"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_lt"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_lt"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_lt"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_lt"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_mul"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_mul"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_mul"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_mul"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_ne"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_ne"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_ne"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_ne"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_negative_inner_product"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_negative_inner_product"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_negative_inner_product"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_negative_inner_product"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_norm"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_norm"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_norm"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_norm"("public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_spherical_distance"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_spherical_distance"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_spherical_distance"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_spherical_distance"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_sub"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_sub"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_sub"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_sub"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."avg"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."avg"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."avg"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."avg"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."avg"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."avg"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."avg"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."avg"("public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."sum"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sum"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."sum"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sum"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sum"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."sum"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."sum"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sum"("public"."vector") TO "service_role";
























GRANT ALL ON TABLE "public"."__retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_ac8c_1" TO "anon";
GRANT ALL ON TABLE "public"."__retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_ac8c_1" TO "authenticated";
GRANT ALL ON TABLE "public"."__retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_ac8c_1" TO "service_role";



GRANT ALL ON SEQUENCE "public"."__retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."__retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."__retool_vector__demo__retool_ai_docs_7fdbd3b3_88f7_43f5_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."__retool_vector__demo__vector___zemin_lu_78996ac3_f54e_48c4_b0f" TO "anon";
GRANT ALL ON TABLE "public"."__retool_vector__demo__vector___zemin_lu_78996ac3_f54e_48c4_b0f" TO "authenticated";
GRANT ALL ON TABLE "public"."__retool_vector__demo__vector___zemin_lu_78996ac3_f54e_48c4_b0f" TO "service_role";



GRANT ALL ON SEQUENCE "public"."__retool_vector__demo__vector___zemin_lu_78996ac3_f54e_4_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."__retool_vector__demo__vector___zemin_lu_78996ac3_f54e_4_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."__retool_vector__demo__vector___zemin_lu_78996ac3_f54e_4_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."__retool_vector_deduction_table_struct_cda06ff5_b4bd_49f2_af8b_" TO "anon";
GRANT ALL ON TABLE "public"."__retool_vector_deduction_table_struct_cda06ff5_b4bd_49f2_af8b_" TO "authenticated";
GRANT ALL ON TABLE "public"."__retool_vector_deduction_table_struct_cda06ff5_b4bd_49f2_af8b_" TO "service_role";



GRANT ALL ON SEQUENCE "public"."__retool_vector_deduction_table_struct_cda06ff5_b4bd_49f_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."__retool_vector_deduction_table_struct_cda06ff5_b4bd_49f_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."__retool_vector_deduction_table_struct_cda06ff5_b4bd_49f_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."payment_record" TO "anon";
GRANT ALL ON TABLE "public"."payment_record" TO "authenticated";
GRANT ALL ON TABLE "public"."payment_record" TO "service_role";



GRANT ALL ON TABLE "public"."best_drivers" TO "anon";
GRANT ALL ON TABLE "public"."best_drivers" TO "authenticated";
GRANT ALL ON TABLE "public"."best_drivers" TO "service_role";



GRANT ALL ON TABLE "public"."buildings" TO "anon";
GRANT ALL ON TABLE "public"."buildings" TO "authenticated";
GRANT ALL ON TABLE "public"."buildings" TO "service_role";



GRANT ALL ON TABLE "public"."customers" TO "anon";
GRANT ALL ON TABLE "public"."customers" TO "authenticated";
GRANT ALL ON TABLE "public"."customers" TO "service_role";



GRANT ALL ON SEQUENCE "public"."customers_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."customers_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."customers_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."deductions" TO "anon";
GRANT ALL ON TABLE "public"."deductions" TO "authenticated";
GRANT ALL ON TABLE "public"."deductions" TO "service_role";



GRANT ALL ON SEQUENCE "public"."deduction_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."deduction_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."deduction_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."haulblaze_contact" TO "anon";
GRANT ALL ON TABLE "public"."haulblaze_contact" TO "authenticated";
GRANT ALL ON TABLE "public"."haulblaze_contact" TO "service_role";



GRANT ALL ON TABLE "public"."deduction_with_driver" TO "anon";
GRANT ALL ON TABLE "public"."deduction_with_driver" TO "authenticated";
GRANT ALL ON TABLE "public"."deduction_with_driver" TO "service_role";



GRANT ALL ON TABLE "public"."delivery_import_records" TO "anon";
GRANT ALL ON TABLE "public"."delivery_import_records" TO "authenticated";
GRANT ALL ON TABLE "public"."delivery_import_records" TO "service_role";



GRANT ALL ON SEQUENCE "public"."delivery_import_records_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."delivery_import_records_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."delivery_import_records_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."delivery_record" TO "anon";
GRANT ALL ON TABLE "public"."delivery_record" TO "authenticated";
GRANT ALL ON TABLE "public"."delivery_record" TO "service_role";



GRANT ALL ON SEQUENCE "public"."delivery_records_record_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."delivery_records_record_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."delivery_records_record_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."delivery_report" TO "anon";
GRANT ALL ON TABLE "public"."delivery_report" TO "authenticated";
GRANT ALL ON TABLE "public"."delivery_report" TO "service_role";



GRANT ALL ON SEQUENCE "public"."delivery_report_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."delivery_report_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."delivery_report_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."delivery_summary" TO "anon";
GRANT ALL ON TABLE "public"."delivery_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."delivery_summary" TO "service_role";



GRANT ALL ON TABLE "public"."id_record" TO "anon";
GRANT ALL ON TABLE "public"."id_record" TO "authenticated";
GRANT ALL ON TABLE "public"."id_record" TO "service_role";



GRANT ALL ON SEQUENCE "public"."driver_id_record_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."driver_id_record_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."driver_id_record_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."driver_summary" TO "anon";
GRANT ALL ON TABLE "public"."driver_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."driver_summary" TO "service_role";



GRANT ALL ON TABLE "public"."driver_uid_summary" TO "anon";
GRANT ALL ON TABLE "public"."driver_uid_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."driver_uid_summary" TO "service_role";



GRANT ALL ON TABLE "public"."financial_record" TO "anon";
GRANT ALL ON TABLE "public"."financial_record" TO "authenticated";
GRANT ALL ON TABLE "public"."financial_record" TO "service_role";



GRANT ALL ON SEQUENCE "public"."financial_record_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."financial_record_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."financial_record_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."haulblaze_contact_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."haulblaze_contact_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."haulblaze_contact_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."inspections" TO "anon";
GRANT ALL ON TABLE "public"."inspections" TO "authenticated";
GRANT ALL ON TABLE "public"."inspections" TO "service_role";



GRANT ALL ON TABLE "public"."invoice_items" TO "anon";
GRANT ALL ON TABLE "public"."invoice_items" TO "authenticated";
GRANT ALL ON TABLE "public"."invoice_items" TO "service_role";



GRANT ALL ON SEQUENCE "public"."invoice_items_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."invoice_items_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."invoice_items_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."invoice_view" TO "anon";
GRANT ALL ON TABLE "public"."invoice_view" TO "authenticated";
GRANT ALL ON TABLE "public"."invoice_view" TO "service_role";



GRANT ALL ON TABLE "public"."invoices" TO "anon";
GRANT ALL ON TABLE "public"."invoices" TO "authenticated";
GRANT ALL ON TABLE "public"."invoices" TO "service_role";



GRANT ALL ON SEQUENCE "public"."invoices_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."invoices_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."invoices_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."mobile_app_sample_data" TO "anon";
GRANT ALL ON TABLE "public"."mobile_app_sample_data" TO "authenticated";
GRANT ALL ON TABLE "public"."mobile_app_sample_data" TO "service_role";



GRANT ALL ON TABLE "public"."pay_cycle_summary" TO "anon";
GRANT ALL ON TABLE "public"."pay_cycle_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."pay_cycle_summary" TO "service_role";



GRANT ALL ON TABLE "public"."pay_method_stat" TO "anon";
GRANT ALL ON TABLE "public"."pay_method_stat" TO "authenticated";
GRANT ALL ON TABLE "public"."pay_method_stat" TO "service_role";



GRANT ALL ON TABLE "public"."pay_method_summary" TO "anon";
GRANT ALL ON TABLE "public"."pay_method_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."pay_method_summary" TO "service_role";



GRANT ALL ON TABLE "public"."payment_agg" TO "anon";
GRANT ALL ON TABLE "public"."payment_agg" TO "authenticated";
GRANT ALL ON TABLE "public"."payment_agg" TO "service_role";



GRANT ALL ON TABLE "public"."payment_record_driver_summary" TO "anon";
GRANT ALL ON TABLE "public"."payment_record_driver_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."payment_record_driver_summary" TO "service_role";



GRANT ALL ON TABLE "public"."payment_record_monthly_summary" TO "anon";
GRANT ALL ON TABLE "public"."payment_record_monthly_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."payment_record_monthly_summary" TO "service_role";



GRANT ALL ON TABLE "public"."payment_record_yearly_summary" TO "anon";
GRANT ALL ON TABLE "public"."payment_record_yearly_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."payment_record_yearly_summary" TO "service_role";



GRANT ALL ON SEQUENCE "public"."phx payment@0220-0226_summary_vercel_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."phx payment@0220-0226_summary_vercel_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."phx payment@0220-0226_summary_vercel_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."sample_transactions" TO "anon";
GRANT ALL ON TABLE "public"."sample_transactions" TO "authenticated";
GRANT ALL ON TABLE "public"."sample_transactions" TO "service_role";



GRANT ALL ON SEQUENCE "public"."sample_transactions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."sample_transactions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."sample_transactions_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."sample_users" TO "anon";
GRANT ALL ON TABLE "public"."sample_users" TO "authenticated";
GRANT ALL ON TABLE "public"."sample_users" TO "service_role";



GRANT ALL ON SEQUENCE "public"."sample_users_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."sample_users_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."sample_users_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."units" TO "anon";
GRANT ALL ON TABLE "public"."units" TO "authenticated";
GRANT ALL ON TABLE "public"."units" TO "service_role";



GRANT ALL ON TABLE "public"."update_log" TO "anon";
GRANT ALL ON TABLE "public"."update_log" TO "authenticated";
GRANT ALL ON TABLE "public"."update_log" TO "service_role";



GRANT ALL ON SEQUENCE "public"."update_log_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."update_log_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."update_log_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."zion_enum" TO "anon";
GRANT ALL ON TABLE "public"."zion_enum" TO "authenticated";
GRANT ALL ON TABLE "public"."zion_enum" TO "service_role";



GRANT ALL ON SEQUENCE "public"."zion_enum_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."zion_enum_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."zion_enum_id_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
