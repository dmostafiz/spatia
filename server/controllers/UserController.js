exports.signup = async (request, reply) => {

    const token = request.app.jwt.sign({
        id: '13',
        username: 'Ullash',
        email: 'ullash@gmail.com'
    })

    reply.send({ token })

}

exports.getUser = async (request, reply) => {
    reply.send({ user: request?.user || 'Fastify - No authentication' })
}

exports.protected = async (request, reply) => {
    reply.send({status: 'This is a protected route'})
}
