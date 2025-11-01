import * as migration_20251031_162941 from './20251031_162941';
import * as migration_20251031_205719 from './20251031_205719';
import * as migration_20251031_224707 from './20251031_224707';
import * as migration_20251101_091426 from './20251101_091426';

export const migrations = [
  {
    up: migration_20251031_162941.up,
    down: migration_20251031_162941.down,
    name: '20251031_162941',
  },
  {
    up: migration_20251031_205719.up,
    down: migration_20251031_205719.down,
    name: '20251031_205719',
  },
  {
    up: migration_20251031_224707.up,
    down: migration_20251031_224707.down,
    name: '20251031_224707',
  },
  {
    up: migration_20251101_091426.up,
    down: migration_20251101_091426.down,
    name: '20251101_091426'
  },
];
