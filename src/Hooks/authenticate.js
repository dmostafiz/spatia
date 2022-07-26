import Cookies from 'js-cookie';

const authenticate = async (ctx) => {

    console.log('checkAuth step 1')

    const _token = ctx.req ? ctx.req.cookies._token : Cookies.get('_token')

    // Redirected to Login page for no authUser found in the cookie
    if (!_token) {
        console.log('checkAuth step 2')

        // for server routing
        if (ctx.req) {
            ctx.res.writeHead(302, {
                Location: '/signin'
            })
            return ctx.res.end()
        }

        // for client (SPA) routing 
        return window.location.href = '/signin'

    }


    // console.log('checkAuth step 4')
    //   const authInfo =  JSON.parse(_token)

    // console.log('checkAuth step 5')

    // Authorising the user token from the authUser cookie 
    const response = await fetch(`/api/authorize`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: _token
        },
    })

    const data = await response.json()

    if (data.id) {

        //User tried to enter un-authentic dashboard and redirect him to his exact dahsboard 
        if (ctx.req) {
            // Redirecting authenticated user server side
            ctx.res.writeHead(302, {
                Location: `/`
            })

            return ctx.res.end()
        }

        else {
            //redirecting  authenticated user Clientside 
            return window.location.href = `/`
        }
    }

    else {
        // Performed server routing but the user is not authorised
        // Redirect to the Login page
        if (ctx.req) {
            ctx.res.writeHead(302, {
                Location: '/signin'
            })
            return ctx.res.end()
        }

        // Performed client (SPA) routing but the user is not authorised
        // Redirect to the Login page
        return window.location.href = `/signin`
    }

    // console.log('checkAuth step 6')

    // Get the exact dashboard namespace from the URL 
    //   const pathName = ctx.pathname.split("/")
    //   const dashboardPath = pathName[1]

    // console.log('checkAuth step 7: ', dashboardPath)

    // Comparing the dashboard URL with the real dashboard of the user
    // if its false then redirect the user to his own dashboard



    return data

}

export default RedirectIfNotAuthenticated