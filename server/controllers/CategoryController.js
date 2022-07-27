
exports.getCategories = async (req, reply) => {

    try {
        const categories = await req.prisma.category.findMany({
            orderBy: [
                {
                    createdAt: 'asc'
                }
            ],
    
            include: {
                discussions: true,
                subCategories: true
            }
        })
    
        return reply.send(categories)

    } catch (error) {
        console.log('Category Error ############## ', error.message)
        reply.send({status: 'error', msg: error.message})
    }

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


exports.getOneSubCategory = async (req, reply) => {



    try {
        const subCategory = await req.prisma.subCategory.findFirst({
            where: {
                id: req.params.id
            },
            include: {
                discussions: {
                    orderBy: { id: 'desc' },
                    // take: 1,
                    include: {
                        author: true
                    }
                },
                category: true
            }
        })

        // console.log('Category ################################# ', category)
        return reply.send(subCategory)

    } catch (error) {
        console.log('Category Discussions Error ################################# ', error.message)
        return reply.send({ status: 'error', msg: error.message })

    }
}

// exports.storeSubCategories = async (req, reply) => {
//     try {

//         const category = await req.prisma.category.findMany({
//             where:{},
//             include: {
//                 subCategories: true
//             }
//         })
        

//         reply.send(category)

//     } catch (error) {
//         console.log('Sub Category Error ########################### ', error.message)
//     }
// }
