const pipeline = (context, middleware, idx) => {
    const nextMiddleware = middleware[idx];

    if (!nextMiddleware) {
        return context.next;
    }

    return () => {
        const nextPipeline = pipeline(context, middleware, ++idx);

        nextMiddleware({ ...context, nextMiddleware: nextPipeline })
    }
}

export { pipeline };