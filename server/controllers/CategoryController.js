
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


exports.getCategoryDiscussions = async (req, reply) => {

    try {

        console.log('Category Discussions query string ################################# ', req.query.cursor)


        const whereQuery = req.params.slug == 'all' 

        ? {}

        : {
            category: {
                slug: req.params.slug
            }
        }


        const limit = 2
        const cursor = typeof req.query.cursor === 'undefined' ? 0 : parseInt(req.query.cursor)
        
        const discussions = await req.prisma.discussion.findMany({
            where: {
                ...whereQuery
            },
            skip: cursor,
            take: limit,
            // cursor: cursorObj,
            orderBy: { id: 'desc' },
            include: {
                category: true
            }
        })


        // const nextCursor = discussions.length == limit? discussions[limit - 1].id : null

        // console.log('Category Discussions end ################################# ', discussions)
        // console.log('Discussion Cursor last ################################# ',nextCursor)
        
        return reply.send(discussions)

    } catch (error) {
        console.log('Category Discussions Error ################################# ', error.message)
        return reply.send({ status: 'error', msg: error.message })

    }
}