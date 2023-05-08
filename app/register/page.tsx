import Link from 'next/link'

export default function Register() {
  return (
    <div className='login-form'>
      <div className='pb-4'>
        <h1 className='text-2xl font-semibold mb-2'>Register to Auctioneer</h1>
        <p>Winning is just a bid away!</p>
      </div>
      <form>
        <div className='mt-5'>
          <p className='text-sm font-semibold mb-2 text-gray-500'>
            Email Address<span className='text-red-500 text-sm'>*</span>
          </p>
          <input
            type='email'
            className='container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
            name='email'
          />
        </div>

        <div className='mt-5'>
          <p className='text-sm font-semibold mb-2 text-gray-500'>
            Password<span className='text-red-500 text-sm'>*</span>
          </p>
          <input
            type='password'
            className='container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
            name='password'
          />
        </div>

        <button
          className='btn btn-primary w-full mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded-md py-4'
          type='submit'
        >
          Register
        </button>
      </form>

      <div>
        <p className='text-center pt-8'>
          Already have an account?{' '}
          <Link href='/login' className='text-blue-700'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
