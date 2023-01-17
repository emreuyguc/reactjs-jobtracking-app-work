const fastify = require('fastify')({ logger: true })

fastify.register(require('@fastify/cors'))

fastify.get('/priority', async (request, reply) => {
    return [
        {
            id:0,
            title: 'Trivial',
            color: 'blue'
        },
        {
            id:1,
            title: 'Regular',
            color: 'yellow'
        },
        {
            id:2,
            title: 'Urgent',
            color: 'red'
        }
    ]
})

const start = async () => {
    try {
        await fastify.listen({ port: 8080 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()