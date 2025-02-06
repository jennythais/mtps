import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

/**
 * Chuyển đổi date-time về string với timezone Hà Nội
 */
export const formatDateTime = (datetime: number): string => {
  const format = dayjs(datetime); // Ensure it's a Dayjs object
  
  return format.utc().tz('Asia/Ho_Chi_Minh').format('MMM DD YYYY HH:mm') 
};