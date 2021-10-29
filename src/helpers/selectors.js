export function getAppointmentsForDay(state, day) {
  // check if days data is empty,
  if (state.days.length < 1) {
    return [];
  }
  // Find day in state
  const foundDay = state.days.find((stateDay) => stateDay.name === day);

  // check if day not found
  if (!foundDay) {
    return [];
  }

  const result = foundDay.appointments.map((id) => state.appointments[id]);
  return result;
}
