
import { getAllRiskData, getRiskDataById, RiskData } from './mockData';

// In the future, these functions would use the client.ts to fetch from actual API
export async function fetchAllRiskData(): Promise<RiskData[]> {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(getAllRiskData()), 500);
  });
}

export async function fetchRiskDataById(id: string): Promise<RiskData | undefined> {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(getRiskDataById(id)), 300);
  });
}
