import mybatisMapper from 'mybatis-mapper';
import { getConnection } from '../db/connection';
import { User, UserListItem } from '../types';

// MyBatis 매퍼 로드
mybatisMapper.createMapper(['./mappers/UserMapper.xml']);

export class UserService {
  private userData: Partial<User> = {};

  // VB6 Property Get/Let → getter/setter
  get userId(): string {
    return this.userData.userId || '';
  }

  set userId(value: string) {
    this.userData.userId = value;
  }

  get userName(): string {
    return this.userData.userName || '';
  }

  set userName(value: string) {
    this.userData.userName = value;
  }

  get email(): string {
    return this.userData.email || '';
  }

  set email(value: string) {
    this.userData.email = value;
  }

  // ValidateUser → with transaction for update
  async validateUser(userId: string, password: string): Promise<boolean> {
    const conn = await getConnection();

    try {
      // SELECT * FROM T_USER WHERE USER_ID = ...
      const query = mybatisMapper.getStatement('UserMapper', 'validateUser', {
        userId,
        password
      });

      const result = await conn.execute(query);
      const rows = result.rows as any[];

      if (rows && rows.length > 0) {
        // VB6: rs!USER_ID → rows[0].USER_ID
        this.userData = {
          userId: rows[0].USER_ID,
          userName: rows[0].USER_NAME,
          email: rows[0].EMAIL,
          lastLogin: rows[0].LAST_LOGIN,
        };

        // 마지막 로그인 시간 업데이트 (UpdateLastLogin)
        await this.updateLastLogin(userId, conn);
        await conn.commit();

        return true;
      }

      return false;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      await conn.close();
    }
  }

  // UpdateLastLogin → private method
  private async updateLastLogin(userId: string, conn: any): Promise<void> {
    // UPDATE T_USER SET LAST_LOGIN = SYSDATE WHERE USER_ID = ...
    const query = mybatisMapper.getStatement('UserMapper', 'updateLastLogin', {
      userId
    });
    await conn.execute(query);
  }

  // GetUserList → with JOIN
  async getUserList(deptCode: string): Promise<UserListItem[]> {
    const conn = await getConnection();

    try {
      // SELECT with INNER JOIN T_DEPT
      const query = mybatisMapper.getStatement('UserMapper', 'selectUserList', {
        deptCode
      });

      const result = await conn.execute(query);
      return (result.rows || []) as UserListItem[];
    } finally {
      await conn.close();
    }
  }

  // GetUserCount → with optional parameter
  async getUserCount(deptCode: string, includeInactive: boolean = false): Promise<number> {
    const conn = await getConnection();

    try {
      // SELECT COUNT(*) with conditional WHERE
      const query = mybatisMapper.getStatement('UserMapper', 'countUser', {
        deptCode,
        includeInactive
      });

      const result = await conn.execute(query);
      const rows = result.rows as any[];
      return rows?.[0]?.[0] || 0;
    } finally {
      await conn.close();
    }
  }
}
