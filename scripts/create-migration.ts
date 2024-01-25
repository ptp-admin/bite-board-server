import * as readlineSync from 'readline-sync';
import { execSync } from 'child_process';

const migrationName = process.argv[2] || readlineSync.question('Enter migration name: ');

if (!migrationName) {
  console.error('Error: Migration name is required.');
  process.exit(1);
}

const command = `supabase db diff --use-migra -f ${migrationName}`;
execSync(command, { stdio: 'inherit' });

