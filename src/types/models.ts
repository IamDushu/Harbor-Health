export type Visit = {
  user_id?: string;
  provider_id?: string;
  provider_firstName?: string;
  provider_lastName?: string;
  provider_credentials?: string;
  provider_img?: string;
  location_id?: string;
  location_addr?: string;
  date?: string;
  start_time?: string;
  notes?: string;
};

export type VisitInfo = {
  visit_id?: string;
  location_phone?: string;
  latitude?: string;
  longitude?: string;
  location_name?: string;
  location_address?: string;
  location_image?: {
    String?: string;
    Valid?: string;
  };
  provider_image?: {
    String?: string;
    Valid?: string;
  };
  provider_name?: string;
  provider_credentials?: string;
  visit_time?: string;
};

export type UpcomingVisit = {
  visit_id?: string;
  scheduled_at?: string;
  provider_image_url?: {
    String?: string;
    Valid?: string;
  };
  provider_firstname?: string;
  provider_lastname?: string;
  provider_credentials?: string;
};

export type Provider = {
  provider_id?: string;
  first_name?: string;
  last_name?: string;
  image_url?: {
    String: string;
    Valid: boolean;
  };
  credentials?: string;
  specialization?: string;
};

export type Location = {
  location_id: string;
  name: string;
  phone: string;
  address: string;
  latitude: string;
  longitude: string;
};

export type AvailableSlot = {
  day_of_week: number;
  end_time: string;
  start_time: string;
};
