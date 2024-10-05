declare module 'pretender' {
    interface Request {
        method: string;
        url: string;
        async: boolean;
        username?: string;
        password?: string;
        withCredentials?: boolean;
        timeout?: number;
        responseType?: string;
        requestHeaders: Record<string, string>;
        params: Record<string, string>;
        queryParams: Record<string, string>;
        respond(status: number, headers: Record<string, string>, body: string): void;
    }

    type Handler = (request: Request) => [number, Record<string, string>, string | object];

    class Pretender {
        constructor();

        get(path: string, handler: Handler, async?: boolean): void;
        post(path: string, handler: Handler, async?: boolean): void;
        put(path: string, handler: Handler, async?: boolean): void;
        delete(path: string, handler: Handler, async?: boolean): void;
        patch(path: string, handler: Handler, async?: boolean): void;
        head(path: string, handler: Handler, async?: boolean): void;

        passthrough: symbol;
        handledRequests: Request[];
        unhandledRequests: Request[];
        passthroughRequests: Request[];

        prepareBody(body: any): string;
        prepareHeaders(headers: Record<string, string>): Record<string, string>;

        handledRequest(verb: string, path: string, request: Request): void;
        passthroughRequest(verb: string, path: string, request: Request): void;
        unhandledRequest(verb: string, path: string, request: Request): void;
        erroredRequest(verb: string, path: string, request: Request, error: Error): void;

        shutdown(): void;
    }

    export = Pretender;
}