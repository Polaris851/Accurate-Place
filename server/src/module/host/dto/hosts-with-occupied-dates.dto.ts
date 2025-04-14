
export class HostWithOccupiedDatesDto {
  name: string;
  type: string;
  description?: string;
  hourly_price: number;
  min_time: number;
  max_time: number;
  occupied_dates: string[];
}
