import { Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const DateTimeDisplay = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit'
  };

  const formattedDate = dateTime.toLocaleDateString('fr-FR', dateOptions);
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex items-center gap-1.5">
        <Calendar className="w-4 h-4 text-primary" />
        <span className="font-medium text-foreground">
          {capitalizedDate}
        </span>
      </div>
      <div className="h-4 w-px bg-border" />
      <div className="flex items-center gap-1.5">
        <Clock className="w-4 h-4 text-primary" />
        <span className="font-medium text-foreground">
          {dateTime.toLocaleTimeString('fr-FR', timeOptions)}
        </span>
      </div>
    </div>
  );
};

export default DateTimeDisplay;
