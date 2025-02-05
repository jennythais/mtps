const getAvailableSemesters = (currentDate: Date) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0 - 11 (January is 0)

  let availableSemesters: string[] = [];

  // Determine current and next semesters based on the current month
  if (month >= 8 || month <= 0) { // September to January (Semester 1)
    availableSemesters.push(`Semester 1 - ${year}`);
    availableSemesters.push(`Semester Summer - ${year}`);
    availableSemesters.push(`Semester 2 - ${year + 1}`);
  } else if (month >= 1 && month <= 5) { // February to June (Semester 2)
    availableSemesters.push(`Semester 2 - ${year}`);
    availableSemesters.push(`Semester Summer - ${year}`);
    availableSemesters.push(`Semester 1 - ${year + 1}`);
  }

  return availableSemesters;
};

export default getAvailableSemesters;