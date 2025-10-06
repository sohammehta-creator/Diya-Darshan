// Fix: Create full content for types.ts
export type Page = 'home' | 'dashboard' | 'feedback' | 'admin' | 'scanner';

export type Role = 'user' | 'admin';

export interface User {
  email: string;
  role: Role;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export type Language = 'en' | 'gu' | 'hi';

export enum CrowdLevel {
  Low = 'Low',
  Moderate = 'Moderate',
  High = 'High',
  Critical = 'Critical',
}

export interface Temple {
  id: string;
  location: string;
  descriptionKey: string;
  imageUrl: string;
  mapCoords: {
    x: string;
    y: string;
  };
  crowdLevel: CrowdLevel;
  waitTime: number;
  parkingSlots: number;
  significance: string;
  architecture: string;
}