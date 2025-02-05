import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

/**
 * Chuyển đổi về Date với timezone Hà Nội
 */
export const formatDate = (date: dayjs.Dayjs): Date => {
  return date
    .utc()
    .tz('Asia/Ho_Chi_Minh')
    .startOf('day') // Đặt giờ về 00:00:00
    .toDate();
};

/**
 * Chuyển đổi time về Date với timezone Hà Nội, chỉ giữ lại giờ/phút/giây
 */
export const formatTime = (time: dayjs.Dayjs): Date => {
  return dayjs()
    .utc()
    .tz('Asia/Ho_Chi_Minh')
    .hour(time.hour()) 
    .minute(time.minute()) 
    .second(time.second()) 
    .millisecond(0) 
    .toDate();
};
export const formatTimeString = (time?: Date | dayjs.Dayjs | null): string => {
  if (!time) return '--:--:--'; // Handle null/undefined safely

  const dayjsTime = dayjs(time); // Convert Date to Dayjs if needed
  return dayjsTime.utc().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');
};



/**
 * Chuyển đổi date-time về string với timezone Hà Nội
 */
export const formatDateTime = (date: Date | dayjs.Dayjs, time: Date | dayjs.Dayjs): string => {
  const dayjsDate = dayjs(date); // Ensure it's a Dayjs object
  const dayjsTime = dayjs(time);
  
  return dayjsDate.utc().tz('Asia/Ho_Chi_Minh').format('MMM DD YYYY') + 
         ' ' + 
         dayjsTime.utc().tz('Asia/Ho_Chi_Minh').format('HH:mm');
};