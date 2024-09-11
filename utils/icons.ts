export function getStatusIcon(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
      return 'ph:check-circle'
    case 'inactive':
      return 'ph:x-circle'
    case 'pending':
      return 'ph:clock'
    default:
      return 'ph:question'
  }
}

export function getWarehouseIcon(warehouse: string): string {
  switch (warehouse.toLowerCase()) {
    case 'dfw1':
      return 'ph:warehouse'
    case 'dfw2':
      return 'ph:factory'
    case 'dfw3':
      return 'ph:buildings'
    default:
      return 'ph:house'
  }
}
