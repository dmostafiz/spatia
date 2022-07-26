import Cookies from "js-cookie";

export default function setFlashMsg(type, message) {
  Cookies.set('flash', JSON.stringify({type, message}))
}
