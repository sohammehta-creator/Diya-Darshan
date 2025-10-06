
export enum CrowdLevel {
  Low = "Low",
  Moderate = "Moderate",
  High = "High",
  Critical = "Critical",
}

export interface Temple {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  crowdLevel: CrowdLevel;
  waitTime: number; // in minutes
  parkingSlots: number;
}

export interface ChatMessage {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}
