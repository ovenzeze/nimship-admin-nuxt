import type { HaulblazeContact } from '~/types'

export const columns = [
    { key: 'team_name', label: 'Team', class: 'w-[100px] min-w-[100px] max-w-[200px]', sortable: false },
    { key: 'first_name', label: 'Name', class: 'w-[100px] min-w-[100px] max-w-[200px]', sortable: false },
    { key: 'warehouse', label: 'Warehouse', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'driver_id', label: 'Driver ID', class: 'w-[100px] min-w-[100px] max-w-[150px]', sortable: false },
    { key: 'enroll_time', label: 'Enroll Time', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'driver_license_no', label: 'DL No.', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'dl_expired_time', label: 'Expired Time', class: 'w-[100px] min-w-[120px] max-w-[150px]', sortable: false },
    { key: 'social_security_no', label: 'SSN', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'date_of_birth', label: 'DOB', class: 'w-[120px] min-w-[120px] max-w-[150px]', sortable: false },
    { key: 'phone', label: 'Phone', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'email', label: 'Email', class: 'w-[150px] min-w-[150px] max-w-[250px]', sortable: false },
    { key: 'account_number', label: 'Account No.', class: 'w-[120px] min-w-[180px] max-w-[200px]', sortable: false },
    { key: 'routing_number', label: 'Routing No.', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'zelle', label: 'Zelle', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'commisson_rate', label: 'Rate', class: 'w-[100px] min-w-[100px] max-w-[150px]', sortable: false },
    { key: 'driver_type', label: 'Driver Type', class: 'w-[100px] min-w-[120px] max-w-[150px]', sortable: false },
    { key: 'has_notification', label: 'Notifications', class: 'w-[100px] min-w-[100px] max-w-[150px]', sortable: false },
    { key: 'last_update', label: 'Last Update', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'mail_street', label: 'Address', class: 'w-[150px] min-w-[150px] max-w-[250px]', sortable: false },
    { key: 'status', label: 'Status', class: 'w-[120px] min-w-[120px] max-w-[150px]', sortable: false },
    { key: 'actions', label: 'Actions', class: 'w-[80px] min-w-[60px] max-w-[120px] sticky right-0 top-0 bg-background border-l border-border', sortable: false },
]

export const tableStyle = {
    wrapper: 'overscroll-none',
    base: 'min-w-full table-fixed flex-1 overscroll-none',
    divide: 'divide-y divide-border-border',
    thead: '',
    tbody: 'w-full h-full overscroll-none',
    tr: {
        base: 'transition-colors z-20 px-3 py-4',
        selected: 'bg-gray-50',
    },
    th: {
        base: 'z-20 text-center text-sm uppercase bg-muted/50 backdrop-blur-sm',
        padding: 'px-3 py-2',
        color: '',
        font: '',
    },
    td: {
        base: 'h-10 md:h-12 px-4 w-[120px] text-center content-center align-middle [&:has([role=checkbox])]:pr-0 whitespace-nowrap text-ellipsis',
        padding: 'px-2 md:px-4 py-3 md:py-3',
        color: 'text-primary',
        font: '',
        size: 'text-sm',
    },
    checkbox: {
        padding: 'ps-4',
    },
    loadingState: {
        wrapper: 'flex flex-col items-center justify-center h-24 p-4',
        label: 'text-sm text-center text-muted-foreground',
        icon: 'w-6 h-6 mx-auto text-muted-foreground animate-spin',
    },
    emptyState: {
        wrapper: 'flex flex-col items-center justify-center h-24 p-4',
        label: 'text-sm text-center text-muted-foreground',
        icon: 'w-6 h-6 mx-auto text-muted-foreground mb-2',
    },
    expand: {
        icon: 'transition-transform duration-200',
    },
    progress: {
        wrapper: 'absolute inset-x-0 bottom-0 h-1',
    },
    default: {
        sortAscIcon: 'i-ph-arrow-up-thin text-xs w-4 h-4',
        sortDescIcon: 'i-ph-arrow-down-thin text-xs',
        sortButton: {
            icon: 'i-heroicons-arrows-up-down-12-solid',
            trailing: true,
            square: true,
            color: 'gray' as const,
            variant: 'ghost' as const,
            class: '-m-1 h-4 w-4 p-0',
        },
        expandButton: {
            icon: 'i-ph-caret-down-thin text-xs',
            color: 'gray' as const,
            variant: 'ghost' as const,
            size: 'xs' as const,
            class: '-my-1 h-6 w-6 p-0',
        },
        checkbox: {
            color: 'primary' as const,
        },
        progress: {
            color: 'primary' as const,
            animation: 'carousel' as const,
        },
        loadingState: {
            icon: 'i-ph-circle-notch',
            label: 'Loading...',
        },
        emptyState: {
            icon: 'i-ph-stack',
            label: 'No items.',
        },
    },
}

export const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'active':
            return 'emerald'
        case 'inactive':
            return 'orange'
        default:
            return 'gray'
    }
}

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
}
