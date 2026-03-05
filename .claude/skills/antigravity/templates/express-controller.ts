import { Request, Response } from 'express';
import { {{ServiceName}} } from '../services/{{ServiceName}}';

export class {{ControllerName}} {
  private service: {{ServiceName}};

  constructor() {
    this.service = new {{ServiceName}}();
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const data = await this.service.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const data = await this.service.getById(req.params.id);
      if (!data) {
        return res.status(404).json({ error: 'Not found' });
      }
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const data = await this.service.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const data = await this.service.update(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.service.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
}
