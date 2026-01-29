export interface Message {
  id: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessagesResponse {
  success: boolean;
  data: Message[];
  count: number;
}

export interface MessageResponse {
  success: boolean;
  data: Message;
}

export interface DeleteResponse {
  success: boolean;
  data: { id: number };
}

export interface CreateMessageRequest {
  message: string;
}

export interface UpdateMessageRequest {
  id: number;
  message: string;
}
