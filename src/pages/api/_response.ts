class JsonResponse extends Response {
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

class BadRequestResponse extends Response {
  constructor(reason: string, init?: ResponseInit) {
    super(reason, {
      status: 400,
      ...init,
    });
  }
}

export { JsonResponse, BadRequestResponse };
