import { useEffect } from "react"
// import $script from 'scriptjs';

const useScript = (url, selector = 'body', async = true) => {

  useEffect(() => {
    const el = document.querySelector('body');
    const script = document.createElement('script');
    script.src = url;
    script.async = async;

    el.appendChild(script);

    return () => {
      el.removeChild(script)
    }

  }, [url])
}

export default useScript

