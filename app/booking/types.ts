export interface Hall {
  hall_id: number;
  name: string;
  description: string;
  name_kannada: string;
  description_kannada: string;
  HallImages: HallImage[];
  images: string[];
}

export interface HallImage {
  id: number;
  hall_id: number;
  image_id: number;
  Images: {
    image_id: number;
    alt_text: string;
    file_path: string;
    public_url: string;
  };
}

export interface HallsResponse {
  statusCode: number;
  message: string;
  data: Hall[];
}

export interface Booking {
  hall_id: number;
  date: string; // ISO date string
}
