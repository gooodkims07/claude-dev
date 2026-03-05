import mybatisMapper from 'mybatis-mapper';
import { getConnection } from '../db/connection';
import { {{EntityName}} } from '../types';

// Load MyBatis mappers
mybatisMapper.createMapper(['./mappers/{{EntityName}}Mapper.xml']);

export class {{ServiceName}} {
  async getAll(): Promise<{{EntityName}}[]> {
    const conn = await getConnection();
    try {
      const query = mybatisMapper.getStatement('{{EntityName}}Mapper', 'selectAll');
      const result = await conn.execute(query);
      return result.rows as {{EntityName}}[];
    } finally {
      await conn.close();
    }
  }

  async getById(id: string): Promise<{{EntityName}} | null> {
    const conn = await getConnection();
    try {
      const query = mybatisMapper.getStatement('{{EntityName}}Mapper', 'selectById', { id });
      const result = await conn.execute(query);
      return result.rows?.[0] as {{EntityName}} || null;
    } finally {
      await conn.close();
    }
  }

  async create(data: Partial<{{EntityName}}>): Promise<{{EntityName}}> {
    const conn = await getConnection();
    try {
      const query = mybatisMapper.getStatement('{{EntityName}}Mapper', 'insert', data);
      await conn.execute(query);
      await conn.commit();
      return data as {{EntityName}};
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      await conn.close();
    }
  }

  async update(id: string, data: Partial<{{EntityName}}>): Promise<{{EntityName}}> {
    const conn = await getConnection();
    try {
      const query = mybatisMapper.getStatement('{{EntityName}}Mapper', 'update', { ...data, id });
      await conn.execute(query);
      await conn.commit();
      return { ...data, id } as {{EntityName}};
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      await conn.close();
    }
  }

  async delete(id: string): Promise<void> {
    const conn = await getConnection();
    try {
      const query = mybatisMapper.getStatement('{{EntityName}}Mapper', 'delete', { id });
      await conn.execute(query);
      await conn.commit();
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      await conn.close();
    }
  }
}
