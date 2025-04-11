import { Controller, Get } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Controller('init-db')
export class InitDbController {
  @Get()
  async initDB(): Promise<any> {
    try {
      const { stdout, stderr } = await execAsync('npx prisma migrate deploy');
      return {
        message: 'Migration executed successfully!',
        stdout,
        stderr,
      };
    } catch (error) {
      return {
        message: 'Migration failed!',
        error: error.message,
        stderr: error.stderr,
      };
    }
  }
}
