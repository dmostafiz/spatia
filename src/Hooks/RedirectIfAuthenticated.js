import Cookies from 'js-cookie';

const RedirectIfAuthenticated = async (ctx) => {

  console.log('checkAuth step 1')

  const authoriseToken = ctx.req ? ctx.req.cookies.authUser : Cookies.get('_token')
  
  // Redirected to Login page for no authUser found in the cookie
  console.log('authoriseToken: ',authoriseToken)


  if(authoriseToken)
  {
    // const authInfo =  JSON.parse(authUserCookie)

    const response = await fetch(`${process.env.API}/authorize`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: authoriseToken
        },
    })
    
    const data = await response.json() 

    // console.log('response: ',authInfo)


    if(data.id){

        if(ctx.req){

            ctx.res.writeHead(302, { 
              Location: `/`
            })

            return ctx.res.end()
        }
        
        else{

            return window.location.href = `/`
            
        }
    }

    return data

  } 
  
  return null
}

export default RedirectIfAuthenticated