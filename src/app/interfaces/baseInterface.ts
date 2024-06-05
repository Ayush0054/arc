export interface Profile {
  id: string;
  userId: string;
  name: string;
  email: string;
  pfp: string;
  currentStatus: string;
  createdAt: Date;
  arcs?: Arc[];
}

export interface Arc {
  id: string;
  title: string;
  description: string;
  type: string;
  image: string;
  completiontime: Date;
  status: string;
  profileId: string;
  profile?: Partial<Profile>;
  createdAt: Date;
  todo?: ArcTodo[];
  isCompleted: boolean;
  Notes?: Note[];
}

export interface ArcTodo {
  id: string;
  dateTime: Date;
  todo: string;
  arcId: string;
  arc?: Partial<Arc>;
  isChecked: boolean;
  IsCheckedTime?: Date;
  isReminder: boolean;
  Reminder?: Date;
}

export interface Note {
  id: string;
  content: any; // JSON type
  arcId: string;
  arc?: Partial<Arc>;
}
