const getRelativeTime = (
  timeDifference: number,
  unit: 'best fit' | 'year' | 'quarter' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'
) => {
  return getValuesForTimeDifference(timeDifference, unit)
}

type TimeUnit = 'year' | 'quarter' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';

const getValuesForTimeDifference = (
    timeDifference: number,
    unit: 'best fit' | TimeUnit
  ): { value: number, unit: TimeUnit } => {
    switch (unit) {
      case 'year':
        return { value: timeDifference / (1000 * 60 * 60 * 24 * 365), unit: 'year' };
      case 'quarter':
        return { value: timeDifference / (1000 * 60 * 60 * 24 * 91.25), unit: 'quarter' };
      case 'month':
        return { value: timeDifference / (1000 * 60 * 60 * 24 * 30.44), unit: 'month' };
      case 'week':
        return { value: timeDifference / (1000 * 60 * 60 * 24 * 7), unit: 'week' };
      case 'day':
        return { value: timeDifference / (1000 * 60 * 60 * 24), unit: 'day' };
      case 'hour':
        return { value: timeDifference / (1000 * 60 * 60), unit: 'hour' };
      case 'minute':
        return { value: timeDifference / (1000 * 60), unit: 'minute' };
      case 'second':
        return { value: timeDifference / 1000, unit: 'second' };
      case 'best fit':
        let bestUnit: TimeUnit = findBestFitUnit(timeDifference); // Ensure findBestFitUnit returns a TimeUnit
        return getValuesForTimeDifference(timeDifference, bestUnit);
    }
  };

const findBestFitUnit = (
  timeDifference: number
): 'year' | 'quarter' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' => {
  const seconds = timeDifference / 1000
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24
  const weeks = days / 7
  const months = days / 30.44
  const years = days / 365

  if (years >= 1) {
    return 'year'
  } else if (months >= 1) {
    return 'month'
  } else if (weeks >= 1) {
    return 'week'
  } else if (days >= 1) {
    return 'day'
  } else if (hours >= 1) {
    return 'hour'
  } else if (minutes >= 1) {
    return 'minute'
  } else {
    return 'second'
  }
}

export default getRelativeTime
