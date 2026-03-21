export const generateSlots = (intervalMinutes) => {
  const slots = [];
  let start = new Date();
  start.setHours(8, 0, 0, 0); // Start at 0800

  const end = new Date();
  end.setDate(end.getDate() + 1);
  end.setHours(6, 0, 0, 0); // End at 0600 next day

  while (start < end) {
    const timeA = start.toTimeString().substring(0, 5);
    start.setMinutes(start.getMinutes() + intervalMinutes);
    const timeB = start.toTimeString().substring(0, 5);
    slots.push(`${timeA} - ${timeB}`);
  }
  return slots;
};

export const validateName = (name, currentSlot, allAssignments) => {
  // Allow repeats for Standby and Day rows
  if (currentSlot.includes("STANDBY") || currentSlot.includes("DAY")) return true;
  
  // Check if name is already in another standard slot
  const isDuplicate = Object.entries(allAssignments).some(
    ([slot, assignedName]) => assignedName === name && slot !== currentSlot
  );
  
  return !isDuplicate;
};