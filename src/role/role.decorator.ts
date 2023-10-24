import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// export const Role = (args: string[]) => SetMetadata('role', args);
export const Role = Reflector.createDecorator<string[]>();
