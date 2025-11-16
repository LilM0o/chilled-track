export interface HistoryActivity {
  type: "Traçabilité" | "Températures" | "Nettoyage" | "Réception";
  action: string;
  value?: string;
  time: string;
  date: string;
  person: string;
  details?: string;
}

export const addToHistory = (activity: HistoryActivity) => {
  const saved = localStorage.getItem('activities');
  const activities = saved ? JSON.parse(saved) : [];
  activities.unshift(activity); // Ajouter au début
  localStorage.setItem('activities', JSON.stringify(activities));
  window.dispatchEvent(new Event('activitiesUpdated'));
};
