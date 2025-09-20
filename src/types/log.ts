export interface LogEntry {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  tags: string[];
  type: 'announcement' | 'milestone' | 'event' | 'update';
}

export type LogEntryType = LogEntry['type'];
