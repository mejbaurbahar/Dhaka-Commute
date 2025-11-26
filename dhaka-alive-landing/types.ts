export interface Landmark {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}