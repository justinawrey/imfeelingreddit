export class JsonResponse extends Response {
  constructor(data: any, init?: ResponseInit) {
    super(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
      ...init,
    });
  }
}
