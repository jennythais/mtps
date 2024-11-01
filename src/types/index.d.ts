export namespace AppTypes {
     export type Status = 'Public' | 'Private';
     export type Point = 3 | 5 | 7 | 10;
     export type Category = "Academic" | "Volunteer" | "Mental Physical";

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
          category: Category;
          point: Point;
          stdJoin?: StdJoin[];
          testId?: string;
          semester: string;
          yearStart: number;
          yearEnd: number;
     }
     export type PointDetail = {
          name: string;
          point: number;
     }
     export interface PointCategory{
          studentId: string;
          academic: PointDetail[];
          volunteer: PointDetail[];
          mentalPhysical: PointDetail[];
          discipline: PointDetail[];
          reward: PointDetail[];
          pioneering: PointDetail[];
          totalPoints: number;
     }
     export interface User {
          id: string;
          email: string;
          name: string;
          role: string;
          facultyName: string;
          trainingPoint: PointCategory
          activities: string[];
     }
}