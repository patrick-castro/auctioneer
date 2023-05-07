import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div className='w-full'>
        <Image
          src='/images/add-cart.jpeg'
          alt='Add to cart image'
          priority={true}
          fill={true}
          className='image-brightness-wrapper'
        />

        <div className='z-10 absolute top-80 left-20 gap-20'>
          <h1 className='text-5xl font-semibold pb-2 text-white text-shadow'>
            Winning is just a bid away.
          </h1>

          <p className='text-2xl pl-1 font-normal pb-2 text-white text-shadow-sm'>
            Experience the thrill of Auctioneer.
          </p>
          <div className='flex gap-5 mt-4'>
            <button className='w-40 py-5 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold text-white shadow-lg'>
              Login
            </button>
            <button className='w-40 py-5 bg-white outline outline-2 outline-indigo-500 rounded-lg font-bold text-indigo-600 hover:text-white hover:bg-indigo-500 shadow-lg'>
              Register
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
