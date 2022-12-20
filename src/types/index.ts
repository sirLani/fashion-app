import { Request } from 'express';
export interface IGetUserAuthInfoRequest extends Request {
   auth?: {
      _id: String;
   }; // or any other type
}
