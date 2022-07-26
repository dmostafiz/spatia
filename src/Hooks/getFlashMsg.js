import Cookies from 'js-cookie'

export default function getFlashMsg() {
   
        const cookieMsg = Cookies.get('flash')

        if(cookieMsg){

            const msg = JSON.parse(cookieMsg)
            Cookies.remove('flash')
            
            return msg
        }
   

    return null
}
