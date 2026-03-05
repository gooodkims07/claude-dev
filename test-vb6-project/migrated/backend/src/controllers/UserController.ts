import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  // POST /api/users/validate
  validateUser = async (req: Request, res: Response) => {
    try {
      const { userId, password } = req.body;

      if (!userId || !password) {
        return res.status(400).json({ error: 'userId and password are required' });
      }

      const isValid = await this.service.validateUser(userId, password);

      res.json({ isValid });
    } catch (error) {
      console.error('Validate user error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // GET /api/users
  getUserList = async (req: Request, res: Response) => {
    try {
      const { deptCode } = req.query;

      if (!deptCode) {
        return res.status(400).json({ error: 'deptCode is required' });
      }

      const users = await this.service.getUserList(deptCode as string);
      res.json(users);
    } catch (error) {
      console.error('Get user list error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // GET /api/users/count
  getUserCount = async (req: Request, res: Response) => {
    try {
      const { deptCode, includeInactive } = req.query;

      if (!deptCode) {
        return res.status(400).json({ error: 'deptCode is required' });
      }

      const count = await this.service.getUserCount(
        deptCode as string,
        includeInactive === 'true'
      );

      res.json({ count });
    } catch (error) {
      console.error('Get user count error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
