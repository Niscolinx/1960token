import React from 'react'
import { AnimationOnScroll } from 'react-animation-on-scroll'

function FAQ() {
    return (
        <div className='grid justify-center mt-2 gap-5 pb-10 px-4 md:mx-20'>
            <AnimationOnScroll
                animateOnce={true}
                initiallyVisible={true}
                animateIn='animate__slideInDown'
            >
                <h1 className='text-center px-2 py-5 text-3xl font-semibold mb-5 uppercase '>
                    Question and Answers
                </h1>
            </AnimationOnScroll>
            <div className='grid gap-4'>
                <AnimationOnScroll
                    animateOnce={true}
                    animateIn='animate__slideInDown'
                >
                    <h2 className='text-center font-semibold text-2xl grad p-2 uppercase'>
                        General
                    </h2>
                </AnimationOnScroll>
                <div className='grid'>
                    <AnimationOnScroll
                        animateOnce={true}
                        animateIn='animate__slideInDown'
                    >
                        <h4 className='font-semibold text-xl capitalize'>
                            1. Can I change the time zone on your website?
                        </h4>
                        <p>
                            No, it can't be changed. However, your local time is
                            shown when you hover over the time on our website:{' '}
                        </p>
                    </AnimationOnScroll>
                </div>
                <div className='grid'>
                    <AnimationOnScroll
                        animateOnce={true}
                        animateIn='animate__slideInDown'
                    >
                        <h4 className='font-semibold text-xl capitalize'>
                            2. Can I change my email address?
                        </h4>
                        <p>No, Message us via our contact form, to know more</p>
                    </AnimationOnScroll>
                </div>
                <div className='grid'>
                    <AnimationOnScroll
                        animateOnce={true}
                        animateIn='animate__slideInDown'
                    >
                        <h4 className='font-semibold text-xl capitalize'>
                            3. Can I open more than one account?
                        </h4>
                        <p>
                            You can open one account (in the fiat currency of
                            your choice) with your email address or via your
                            Apple, or Google logins. You can also add
                            cryptocurrencies to your profile.
                        </p>
                    </AnimationOnScroll>
                </div>
            </div>
            <div className='grid gap-4'>
                <AnimationOnScroll
                    animateOnce={true}
                    animateIn='animate__slideInDown'
                >
                    <h2 className='text-center font-semibold text-2xl grad p-2 uppercase'>
                        Account
                    </h2>
                </AnimationOnScroll>
                <div className='grid'>
                    <AnimationOnScroll
                        animateOnce={true}
                        animateIn='animate__slideInDown'
                    >
                        <h4 className='font-semibold text-xl capitalize'>
                            1. How can I change my personal details?
                        </h4>
                        <p>
                            You can do so at the Personal Profile page. If that
                            doesn't work, please message us using the contact us
                            page, you may need you to send us some documents for
                            verification.
                        </p>
                    </AnimationOnScroll>
                </div>
                <div className='grid'>
                    <AnimationOnScroll
                        animateOnce={true}
                        animateIn='animate__slideInDown'
                    >
                        <h4 className='font-semibold text-xl capitalize'>
                            2. How can I check my login details?
                        </h4>
                        <p>Kindly refer to your account’s Profile </p>
                    </AnimationOnScroll>
                </div>
                <div className='grid'>
                    <AnimationOnScroll
                        animateOnce={true}
                        animateIn='animate__slideInDown'
                    >
                        <h4 className='font-semibold text-xl capitalize'>
                            3. forgot my password. What should I do?
                        </h4>
                        <p>
                            You can reset both your 1960token.com login password
                            and your App password by clicking on the Re-set
                            Password. Then follow the instruction.
                        </p>
                    </AnimationOnScroll>
                </div>
            </div>
            <div className='grid gap-4'>
                <AnimationOnScroll
                    animateOnce={true}
                    animateIn='animate__slideInDown'
                >
                    <h2 className='text-center font-semibold text-2xl grad p-2 uppercase'>
                        Deposit and Withdrawal
                    </h2>
                </AnimationOnScroll>
                <div className='grid'>
                    <AnimationOnScroll
                        animateOnce={true}
                        animateIn='animate__slideInDown'
                    >
                        <h4 className='font-semibold text-xl capitalize'>
                            1. What is the minimum deposit or withdrawal amount?
                        </h4>
                        <p>
                            You can deposit or withdraw a minimum of USD 20
                            using USDT e-wallet.
                        </p>
                    </AnimationOnScroll>
                </div>
                <div className='grid'>
                    <AnimationOnScroll
                        animateOnce={true}
                        animateIn='animate__slideInDown'
                    >
                        <h4 className='font-semibold text-xl capitalize'>
                            2. How long does it take for my deposits and
                            withdrawals to be processed?
                        </h4>
                        <p>
                            We process deposits instantly and withdrawals within
                            1 business day. However, it may take longer for your
                            funds to reach your account due to the different
                            processing times by banks and payment service
                            providers.
                        </p>
                    </AnimationOnScroll>
                </div>
                <div className='grid'>
                    <AnimationOnScroll
                        animateOnce={true}
                        animateIn='animate__slideInDown'
                    >
                        <h4 className='font-semibold text-xl capitalize'>
                            3. How long does it take to process deposits and
                            withdrawals?
                        </h4>
                        <p>
                            The deposits and withdrawals will be processed
                            within 1 day. However, your bank or money transfer
                            service may require additional time to process your
                            request.
                        </p>
                    </AnimationOnScroll>
                </div>
                <div className='grid'>
                    <AnimationOnScroll
                        animateOnce={true}
                        animateIn='animate__slideInDown'
                    >
                        <h4 className='font-semibold text-xl capitalize'>
                            4. My withdrawal verification link has expired. What
                            do I do?
                        </h4>
                        <p>
                            You can get a new link on the Cashier page. Click
                            Withdraw and we'll email you a new link; please
                            remember to use it within 1 hour.
                        </p>
                    </AnimationOnScroll>
                </div>
                <div className='grid'>
                    <AnimationOnScroll
                        animateOnce={true}
                        animateIn='animate__slideInDown'
                    >
                        <h4 className='font-semibold text-xl capitalize'>
                            5. How can I cancel my withdrawal?
                        </h4>
                        <p>
                            Here you can cancel your withdrawal, By not
                            accepting the email confirmation sent to your Email
                        </p>
                    </AnimationOnScroll>
                </div>
            </div>
            <div className='grid gap-4'>
                <AnimationOnScroll
                    animateOnce={true}
                    animateIn='animate__slideInDown'
                >
                    <h2 className='text-center font-semibold text-2xl grad p-2 uppercase'>
                        CryptoCurrency
                    </h2>
                </AnimationOnScroll>
                <div className='grid'>
                    <AnimationOnScroll
                        animateOnce={true}
                        animateIn='animate__slideInDown'
                    >
                        <h4 className='font-semibold text-xl capitalize'>
                            1. How do I create a cryptocurrency account?{' '}
                        </h4>
                        <p>
                            Follow the steps in this VIDEO to create a
                            cryptocurrency account. It uses USDT as an example,
                            but the process is the same for all cryptocurrency
                            accounts.
                        </p>
                    </AnimationOnScroll>
                </div>
                <div className='grid'>
                    <AnimationOnScroll
                        animateOnce={true}
                        animateIn='animate__slideInDown'
                    >
                        <h4 className='font-semibold text-xl capitalize'>
                            2.What is a blockchain?
                        </h4>
                        <p>
                            It's a public ledger that records all the
                            transactions taking place on a cryptocurrency
                            network. A transaction that is performed on the
                            cryptocurrency network is considered to be secured
                            and irreversible once the blockchain processes and
                            confirms the transaction.{' '}
                        </p>
                    </AnimationOnScroll>
                </div>
            </div>
            <div className='grid gap-4'>
                <AnimationOnScroll
                    animateOnce={true}
                    animateIn='animate__slideInDown'
                >
                    <h2 className='text-center font-semibold text-2xl grad p-2 uppercase'>
                        Affiliate Program{' '}
                    </h2>
                </AnimationOnScroll>
                <div className='grid'>
                    <AnimationOnScroll
                        animateOnce={true}
                        animateIn='animate__slideInDown'
                    >
                        <p className='text-xm'>When you join our affiliate programme</p>
                        <ul className='list-decimal list-inside mt-5 grid gap-4'>
                            <li>
                                You'll have multiple income opportunities by
                                joining other partnership programmes that we
                                offer.
                            </li>
                            <li>
                                You'll have access to various marketing tools to
                                help promote our products and services to your
                                clients.
                            </li>
                            <li>
                                You'll be able to take advantage of our
                                multilingual platforms and reach clients
                                wherever they are
                            </li>
                        </ul>
                    </AnimationOnScroll>
                </div>
            </div>
        </div>
    )
}

export default FAQ
