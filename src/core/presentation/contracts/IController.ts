import { Request, Response } from 'express';

export interface IController {
  run(request: Request, response: Response): Promise<Response>;
}
