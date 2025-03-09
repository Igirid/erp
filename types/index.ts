export interface TopListItem {
  name: string;
  value: number;
  percentage: number;
}

export interface Supplier extends TopListItem {
  // Additional supplier-specific properties can be added here
}

export interface Product extends TopListItem {
  // Additional product-specific properties can be added here
}

export interface MetricData {
  value: number | string;
  change: number;
  trend: "up" | "down" | "none";
}
