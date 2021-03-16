db.createUser({
    user: 'sse',
    pwd: 'sse',
    roles: [
        {
            role: 'readWrite',
            db: 'sse'
        }
    ]
});