export namespace AppTypes {
     export type Status = 'Public' | 'Private';
     export type Point = 3 | 5 | 7 | 10;
     export type PointCategory = "Academic" | "Volunteer" | "Mental Physical";

     export interface LoginRequest {
          email: string;
          password: string;
     }
     export interface EmailRequest {
          email: string;
     }
     export interface ChangePasswordRequest {
          id: string;
          password: string;
          newPassword: string;
     }
     export interface ResetPasswordRequest{
          token: string;
          password: string;
     }
     export interface StdJoin {
          id: string;
     }
     export interface Post {
          id: string;
          name: string;
          desc: string;
          status: Status;
          startTime: string;
          startDate: string;
          endDate: string;
          endTime: string;
          location: string;
          numberParticipants: number;
          facultyName: string;
          category: PointCategory;
          point: Point;
          stdJoin?: StdJoin[];
          testId?: string;
          semester: string;
          yearStart: number;
          yearEnd: number;
     }
}