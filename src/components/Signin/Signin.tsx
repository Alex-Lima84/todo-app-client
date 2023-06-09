import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './styles.scss'

const Signin = () => {

    const [email, setEmail] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()

        if (!email || !firstName || !lastName || !password || !confirmPassword) {
            setError('Please fill all the required info')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords are not equal')
            return
        }

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/signin`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email, firstName, lastName, password })
        })

        const data = await response.json()

        if (data.detail) {
            if (data.detail.includes('already exists.')) {
                setError("This email is already taken")
                return
            } else {
                setError(data.detail)
                return
            }
        }

        navigate('/login');
    }

    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <form>
                    <h2>Please sign in</h2>
                    <input
                        type='email'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='First name'
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Last name'
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type='Password'
                        placeholder='confirm password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <input
                        type='submit'
                        className='create'
                        onClick={(e) => handleSubmit(e)}
                    />
                    {error && <p className='error-message'>{error}</p>}
                </form>
                <div className='auth-options'>
                    <Link to='/login'>Log in</Link>
                    <Link to='/'>Home</Link>
                </div>
            </div>

        </div>
    );
}

export default Signin;