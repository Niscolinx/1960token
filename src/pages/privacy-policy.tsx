import React from 'react'
import { AnimationOnScroll } from 'react-animation-on-scroll'

function PrivacyPolicy() {
    return (
        <div className='grid justify-center mt-10 gap-5 pb-10 px-4'>
            <AnimationOnScroll
                animateOnce={true}
                animateIn='animate__slideInDown'
            >
                <h1 className='text-center px-2 py-5 text-3xl font-semibold mb-5 uppercase '>
                    Privacy Policy
                </h1>
            </AnimationOnScroll>
            <div className='grid'>
                <AnimationOnScroll
                    animateOnce={true}
                    animateIn='animate__slideInDown'
                >
                    <h2 className='text-center font-semibold text-2xl grad p-2 uppercase uppercase'>
                        Security and privacy
                    </h2>
                </AnimationOnScroll>
                <p className='text-justify'>
                    The Company recognises the importance of protecting the
                    client's personal and financial information. All the
                    information that the Company obtains about the client
                    assists the Company in servicing the client and the client's
                    account. The Company knows that the client may be concerned
                    about what the Company does with this information
                </p>
            </div>

            <div className='grid'>
                <AnimationOnScroll
                    animateOnce={true}
                    animateIn='animate__slideInDown'
                >
                    <h2 className='text-center font-semibold text-2xl grad p-2 uppercase'>
                        Cookies{' '}
                    </h2>
                </AnimationOnScroll>
                <p className='text-justify'>
                    Cookies are small text files stored on computer drives and
                    are widely used in order to make websites work and to
                    improve the user experience. All recent versions of browsers
                    give the client a level of control over cookies. The client
                    can delete all cookies that are already on the client's
                    computer, and the browser can be set to prevent them from
                    being placed. However, if the client chooses not to receive
                    the Company's cookies, the full usability of the Company's
                    website may be adversely affected.
                </p>
                <p className='text-justify'>
                    The client should note that the Company's website generates
                    log files that record the IP addresses of accesses to the
                    client's account, login attempts, and device information
                    such as the manufacturer, model, operating system, and
                    browser. This information is gathered for the sole purpose
                    of providing assistance with investigating a client's
                    account in the unlikely event that the account is accessed
                    by unauthorised users. Information supplied by some cookies
                    also helps the Company understand how visitors use the
                    website, so that the Company can improve how it presents its
                    content.
                </p>
                <p className='text-justify'>
                    The Company's cookies are not deemed dangerous and cannot
                    access any other information on the client's computer.
                </p>
                <p className='text-justify'>
                    To provide the client with a better experience, some of the
                    services offered by Binary.com may require permission to
                    access the client's cloud storage services, such as Google
                    Drive. In such instances
                </p>
                <ul className='list-decimal list-inside'>
                    <li>
                        The Company does not store any data related to the
                        client's cloud storage service on any of the Company's
                        servers. All files are downloaded on the client's local
                        machines.{' '}
                    </li>
                    <li>
                        The Company does not share any data related to the
                        client's cloud storage service with anyone
                    </li>
                    <li>
                        The Company only accesses the client's cloud storage
                        when the client's action initiates it. Clients can
                        disconnect their storage service at any time
                    </li>
                </ul>
            </div>

            <div className='grid'>
                <AnimationOnScroll
                    animateOnce={true}
                    animateIn='animate__slideInDown'
                >
                    <h2 className='text-center font-semibold text-2xl grad p-2'>
                        Notification of Changes
                    </h2>
                </AnimationOnScroll>
                <AnimationOnScroll
                    animateOnce={true}
                    animateIn='animate__zoomInLeft'
                >
                    <>
                    
                    <p className='text-justify'>
                        Any changes in the Company's privacy policy or security
                        statement will be posted on this website. For any
                        material changes that directly affect the economic use
                        of the client's personal information, the Company will
                        request the client's prior authorisation in writing
                        before effecting such changes on the client's account.
                    </p>
                    <p className='text-justify'>
                       The client also has the right to request that the Company inform the client about the personal data that the Company processes about the client and to provide its correction where necessary. 
                    </p>
                    </>
                </AnimationOnScroll>
            </div>
        </div>
    )
}
              
    


export default PrivacyPolicy
