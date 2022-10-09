export function checkEnvVariable(env: string): string {
  const variable = process.env[env];
  if (!variable) {
    throw new Error(`${env} env variable not defined`);
  } else {
    return variable;
  }
}

export function requiredEnvVariable(listOfEnv: string[]) {
  const result: string[] = [];
  listOfEnv.forEach((env) => {
    const variable = process.env[env];
    if (!variable) {
      result.push(`--- ${env}`);
    }
  });
  if (result.length > 0) {
    result.push("\n")
    throw new Error("\n--- This env variables is required but not defined:" + result.join('\n'));
  }
}
