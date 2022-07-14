
exports.getCategories = async (req, reply) => {

    const categories = await req.prisma.category.findMany({
        orderBy: [
            {
                createdAt: 'asc'
            }
        ],

        include: {
            discussions: true
        }
    })

    return reply.send(categories)
}


exports.getOneCategory = async (req, reply) => {

    const category = await req.prisma.category.findFirst({
        where: {
            slug: req.params.slug
        },
        include: {
            discussions: {
                orderBy: {id: 'desc'},
                include: {
                    author: true
                }
            }
        }
    })

    return reply.send(category)
}