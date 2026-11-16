function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

function isPalindrome(string) {
  const normalized = string.replaceAll(' ', '').toLowerCase();
  let reversed = '';
  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }

  return normalized === reversed;
}

function extractDigits(data) {
  const stringData = data.toString();
  let digitsString = '';
  for (let i = 0; i < stringData.length; i++) {
    const char = stringData[i];
    if (!Number.isNaN(parseInt(char, 10))) {
      digitsString += char;
    }
  }

  return parseInt(digitsString, 10);
}

checkStringLength('проверяемая строка', 20);
isPalindrome('топот');
extractDigits('2023 год');

function timeToMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);

  return (hours * 60) + minutes;
}

function isMeetingOnTime(workStart, workEnd, meetingStart, meetingDuration) {
  const startDay = timeToMinutes(workStart);
  const endDay = timeToMinutes(workEnd);

  const startMeeting = timeToMinutes(meetingStart);

  const endMeeting = startMeeting + meetingDuration;

  return startMeeting >= startDay && endMeeting <= endDay;
}

isMeetingOnTime('08:00', '17:30', '14:00', 90);
