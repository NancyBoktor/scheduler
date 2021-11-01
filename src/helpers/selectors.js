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

export function getInterview(state, interview) {
  return interview
    ? {
        ...interview,
        interviewer: state.interviewers[interview.interviewer],
      }
    : null;
}
export function getInterviewersForDay(state, day) {
  const output = [];
  const matchedDay = state.days.find((value) => value.name === day);
  const interviewArr = matchedDay ? matchedDay.interviewers : [];
  for (const id of interviewArr) {
    let interview = state.interviewers[id];
    if (interview) {
      output.push(interview);
    }
  }
  return output;
}
