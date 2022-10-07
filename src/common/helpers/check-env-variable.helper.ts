export function checkEnvVariable(env: string): string {
  const variable = process.env[env];
  if (!variable) {
    throw new Error(`${env} env variable not defined`);
  } else {
    return variable;
  }
}
