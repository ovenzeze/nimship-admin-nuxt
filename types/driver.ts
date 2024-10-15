

export type driverTypes = {
    TableSort: {
        column: string;
        direction: string;
    },
    DriverFilters: {
        [x: string]: any;
        warehouse: string | null;
        cycle_start: string | null;
        team: string | null;
        driver_id: string | null;
    },
    TableColumn: {
        key: string;
        label: string;
        class?: string;
        sortable?: boolean;
    },
    pagination: {
        page: number;
        size?: number;
        total?: number;
        count?: number;
    }
}