import { auth } from "@/auth";

export const fetchClient = async (url:string, options:any) => {
  const session = await auth();

  const accessToken = session?.accessToken;

  console.log(`From the fetchClient ${JSON.stringify(accessToken)}`);

  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
};
