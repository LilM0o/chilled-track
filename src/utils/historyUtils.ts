import { storage } from './storage';

export interface HistoryActivity {
  type: "Traçabilité" | "Températures" | "Nettoyage" | "Réception";
  action: string;
  value?: string;
  time: string;
  date: string;
  person: string;
  details?: string;
}

export const addToHistory = async (activity: HistoryActivity) => {
  const saved = await storage.getItem('activities');
  const activities = saved ? JSON.parse(saved) : [];
  activities.unshift(activity); // Ajouter au début
  await storage.setItem('activities', JSON.stringify(activities));
  window.dispatchEvent(new Event('activitiesUpdated'));
};
