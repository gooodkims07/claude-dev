import express from 'express';
import { UserController } from '../controllers/UserController';

const router = express.Router();
const controller = new UserController();

// VB6 기능에 매핑된 라우트
router.get('/', controller.getUserList);           // GetUserList
router.get('/count', controller.getUserCount);     // GetUserCount
router.post('/validate', controller.validateUser); // ValidateUser

export default router;
