import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const connectionString =
      process.env['DATABASE_URL'] ??
      `postgresql://${process.env['DB_USER']}:${process.env['DB_PASSWORD']}@${process.env['DB_HOST']}:${process.env['DB_PORT']}/${process.env['DB_NAME']}`;
    const adapter = new PrismaPg({ connectionString });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
