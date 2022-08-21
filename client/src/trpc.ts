import { createReactQueryHooks } from '@trpc/react';
import { AppRouter } from '../../src/index';

export const trpc = createReactQueryHooks<AppRouter>();