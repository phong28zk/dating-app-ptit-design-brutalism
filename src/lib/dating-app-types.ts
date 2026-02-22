export interface ProfileTag {
  icon: string;
  label: string;
  value: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  photos: string[];
  bio: string;
  verified: boolean;
  school?: string;
  location?: string;
  distance?: string;
  tags: ProfileTag[];
}

export interface Match {
  id: string;
  profile: Profile;
  matchedAt: string;
  isNew: boolean;
}

export interface Message {
  id: string;
  content: string;
  time: string;
  isSent: boolean;
  type: "text" | "image";
}

export interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  online: boolean;
  messages: Message[];
  profile: Profile;
}
