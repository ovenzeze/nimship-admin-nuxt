import type { IconTypes } from '@/types'

export const getStatusIcon = (status: string): string => {
  switch (status.toUpperCase()) {
    case "ALL": return "ph:bank";
    case "PENDING": return "ph:clock";
    case "HOLD": return "ph:pause-circle";
    case "PAID": return "ph:check-circle";
    default: return "ph:question";
  }
};

export const getWarehouseIcon = (warehouse: string): string => {
  switch (warehouse.toUpperCase()) {
    case "ALL": return "ph:buildings";
    case "SAN": return "ph:tree-palm";
    case "PHX": return "ph:sun";
    case "LAX": return "ph:film-slate";
    case "LAS": return "ph:cigarette-slash";
    case "SEA": return "ph:coffee";
    default: return "ph:map-pin-bold";
  }
};

export const getEmploymentStatusIcon = (employmentStatus: string): string => {
  switch (employmentStatus.toUpperCase()) {
    case "Employed": return "ph:check-circle";
    case "ONBOARDING": return "ph:x-circle";
    case "QUIT": return "ph:pause-circle";
    case "TERMINATED": return "ph:user-circle-minus";
    default: return "ph:question";
  }
};
