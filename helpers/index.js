import cookie from 'cookie'
import { useRouter } from 'next/router'


export function parseCookies(req){
    return cookie.parse(req ? req.headers.cookie || '' : '')
}

export function isUserLoggedIn(user,id,router){
    if(!user || user.id != id){
        router.replace('/')
    }else{
        return
    }
}