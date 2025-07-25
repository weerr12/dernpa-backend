export class ParkResponseDto {
  id: number;
  park_name: string;
  park_type: string;
  location_province: string;
  location_district?: string;
  location_subdistrict?: string;
  description?: string;
  latitude: string;
  longitude: string;
  emergency_contact?: string;
  opening_hours?: string;
  created_at: Date;
}

export class ParksListResponseDto {
  message: string;
  parks: ParkResponseDto[];
  total: number;
}
