import React from 'react'
import useScript from '../Hooks/useScript'
// import Script from 'next/script'

export default function MasterLayout({ children }) {

    // useScript('/js/hs-ui.bundle.js')

    return (
        <>
            {children}

            {/* <Script
                src="./js/hs-ui.bundle.js"
                strategy="beforeInteractive"
                // onLoad={(sd) => {
                //     window.uim = sd
                // }}
            /> */}
        </>
    )
}
