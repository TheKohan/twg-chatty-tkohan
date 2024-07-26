const getEnv = () => {
  const requiredEnvVars = [
    'EXPO_PUBLIC_API_TOKEN',
    'EXPO_PUBLIC_API_HTTP_URL',
    'EXPO_PUBLIC_API_WS_URL',
    'EXPO_PUBLIC_NODE_ENV',
  ] as const;

  const env: Record<string, string> = {};

  for (const varName of requiredEnvVars) {
    const value = process.env[varName];
    if (!value) {
      throw new Error(`Missing or empty environment variable: ${varName}`);
    }
    env[varName] = value;
  }

  return {
    authToken: env.EXPO_PUBLIC_API_TOKEN,
    apiUrl: env.EXPO_PUBLIC_API_HTTP_URL,
    wsUrl: env.EXPO_PUBLIC_API_WS_URL,
    nodeEnv: env.EXPO_PUBLIC_NODE_ENV,
  } as const;
};

export const env = getEnv();
