import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-timezone';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(isoTime: string): string {
    const originalTimestamp = moment.utc(isoTime);
    const istTimestamp = originalTimestamp.tz('Asia/Kolkata');

    // Calculate the difference in minutes between the current time and the provided time
    const minutesDifference = moment().diff(istTimestamp, 'minutes');

    if (minutesDifference < 1) {
      return 'Just now';
    } else if (minutesDifference < 60) {
      return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
    } else if (minutesDifference < 24 * 60) { // Less than a day
      return `${Math.floor(minutesDifference / 60)} hour${Math.floor(minutesDifference / 60) > 1 ? 's' : ''} ago`;
    } else if (minutesDifference < 30 * 24 * 60) { // Less than a month
      return `${Math.floor(minutesDifference / (24 * 60))} day${Math.floor(minutesDifference / (24 * 60)) > 1 ? 's' : ''} ago`;
    } else if (minutesDifference < 12 * 30 * 24 * 60) { // Less than a year
      return `${Math.floor(minutesDifference / (30 * 24 * 60))} month${Math.floor(minutesDifference / (30 * 24 * 60)) > 1 ? 's' : ''} ago`;
    } else {
      return `${Math.floor(minutesDifference / (12 * 30 * 24 * 60))} year${Math.floor(minutesDifference / (12 * 30 * 24 * 60)) > 1 ? 's' : ''} ago`;
    }
  }
}