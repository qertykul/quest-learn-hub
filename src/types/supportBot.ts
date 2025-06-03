
export interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  intent?: string;
}

export interface BotResponse {
  text: string;
  intent: string;
  followUp?: string[];
}
