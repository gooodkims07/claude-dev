import express from 'express';
import { {{ControllerName}} } from '../controllers/{{ControllerName}}';

const router = express.Router();
const controller = new {{ControllerName}}();

// Routes mapped from VB6 functionality
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
