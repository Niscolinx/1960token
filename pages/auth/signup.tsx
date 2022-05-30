import {signIn} from 'next-auth/react'

export default function(){


    const onFormSubmit = async (e) => {
        e.preventDefault()
        //Getting value from useRef()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        //Validation
        if (!email || !email.includes('@') || !password) {
            alert('Invalid details')
            return
        }
        //POST form values
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        //Await for data for any desirable next steps
        const data = await res.json()
        console.log(data)
    }
    return (
        <div>
            <form>
                <input type='email'/>
                <input type={'password'} />
            </form>
        </div>
    )
}