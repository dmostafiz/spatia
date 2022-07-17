
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



    try {
        const category = await req.prisma.category.findFirst({
            where: {
                slug: req.params.slug
            },
            include: {
                discussions: {
                    orderBy: { id: 'desc' },
                    // take: 1,
                    include: {
                        author: true
                    }
                }
            }
        })

        // console.log('Category ################################# ', category)
        return reply.send(category)

    } catch (error) {
        console.log('Category Discussions Error ################################# ', error.message)
        return reply.send({ status: 'error', msg: error.message })

    }
}


