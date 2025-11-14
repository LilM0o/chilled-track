interface TemperatureReading {
  equipmentName: string;
  temperature: string;
  timestamp: number;
  date: string;
  time: string;
}

interface TemperatureStatus {
  isOk: boolean;
  overdueCount: number;
  lastReadingText: string;
  statusText: string;
}

interface CleaningStatus {
  pendingCount: number;
  statusText: string;
}

interface Task {
  name: string;
  frequency: string;
  status: "done" | "pending";
  time?: string;
  person?: string;
  category: string;
  completedTimestamp?: number;
}

const resetExpiredTasks = (tasks: Task[]): Task[] => {
  const now = new Date();
  
  return tasks.map(task => {
    if (task.status === 'done' && task.completedTimestamp) {
      const completedDate = new Date(task.completedTimestamp);
      const daysSince = Math.floor((now.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Reset logic based on frequency
      if (task.frequency === 'Quotidien' && daysSince >= 1) {
        return { ...task, status: 'pending', time: undefined, person: undefined, completedTimestamp: undefined };
      }
      if (task.frequency === 'Hebdomadaire' && daysSince >= 7) {
        return { ...task, status: 'pending', time: undefined, person: undefined, completedTimestamp: undefined };
      }
      if (task.frequency === 'Mensuel' && daysSince >= 30) {
        return { ...task, status: 'pending', time: undefined, person: undefined, completedTimestamp: undefined };
      }
    }
    return task;
  });
};

export const getTemperatureStatus = (): TemperatureStatus => {
  // Load all temperature readings
  const readingsStr = localStorage.getItem('temperatureReadings');
  const readings: TemperatureReading[] = readingsStr ? JSON.parse(readingsStr) : [];
  
  // Load equipment list
  const equipmentsStr = localStorage.getItem('equipments');
  let equipments: string[] = [];
  
  if (equipmentsStr) {
    try {
      const parsedEquipments = JSON.parse(equipmentsStr);
      equipments = parsedEquipments.map((eq: any) => eq.name);
    } catch (e) {
      equipments = [];
    }
  }
  
  if (equipments.length === 0) {
    return {
      isOk: true,
      overdueCount: 0,
      lastReadingText: "Aucun équipement configuré",
      statusText: "Configuration requise"
    };
  }
  
  // Check last reading for each equipment
  const now = Date.now();
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
  let overdueCount = 0;
  let mostRecentReading: TemperatureReading | null = null;
  
  equipments.forEach(equipmentName => {
    // Find most recent reading for this equipment
    const equipmentReadings = readings
      .filter(r => r.equipmentName === equipmentName)
      .sort((a, b) => b.timestamp - a.timestamp);
    
    const lastReading = equipmentReadings[0];
    
    if (!lastReading || (now - lastReading.timestamp) > sevenDaysMs) {
      overdueCount++;
    }
    
    // Track the most recent reading overall
    if (lastReading && (!mostRecentReading || lastReading.timestamp > mostRecentReading.timestamp)) {
      mostRecentReading = lastReading;
    }
  });
  
  // Calculate time since last reading
  let lastReadingText = "Aucun relevé enregistré";
  if (mostRecentReading) {
    const minutesAgo = Math.floor((now - mostRecentReading.timestamp) / (60 * 1000));
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    
    if (minutesAgo < 60) {
      lastReadingText = `Dernier relevé il y a ${minutesAgo} min`;
    } else if (hoursAgo < 24) {
      lastReadingText = `Dernier relevé il y a ${hoursAgo}h`;
    } else {
      lastReadingText = `Dernier relevé il y a ${daysAgo} jour${daysAgo > 1 ? 's' : ''}`;
    }
  }
  
  const isOk = overdueCount === 0;
  const statusText = isOk ? "OK" : `${overdueCount} relevé${overdueCount > 1 ? 's' : ''} en retard`;
  
  return {
    isOk,
    overdueCount,
    lastReadingText,
    statusText
  };
};

export const getCleaningStatus = (): CleaningStatus => {
  // Load tasks from localStorage
  const tasksStr = localStorage.getItem('cleaningTasks');
  let tasks: Task[] = [];
  
  if (tasksStr) {
    try {
      tasks = JSON.parse(tasksStr);
      // Reset expired tasks
      const resetTasks = resetExpiredTasks(tasks);
      
      // Save back if any tasks were reset
      if (JSON.stringify(tasks) !== JSON.stringify(resetTasks)) {
        localStorage.setItem('cleaningTasks', JSON.stringify(resetTasks));
        window.dispatchEvent(new Event('tasksUpdated'));
        tasks = resetTasks;
      }
    } catch (e) {
      tasks = [];
    }
  }
  
  const pendingCount = tasks.filter(t => t.status === "pending").length;
  const statusText = pendingCount > 0 
    ? `${pendingCount} tâche${pendingCount > 1 ? 's' : ''} en attente`
    : "Toutes les tâches complétées";
  
  return {
    pendingCount,
    statusText
  };
};
