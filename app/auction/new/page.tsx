import './styles.css'

export default function NewAuction() {
  return (
    <div className='login-form'>
      <div className='pb-4'>
        <h1 className='text-2xl font-semibold'>Create Auction Item</h1>
      </div>
      <form>
        <div className='mt-5'>
          <p className='text-sm font-semibold mb-2 text-gray-500'>Name</p>
          <input
            type='text'
            className='container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'
            name='name'
            placeholder='Auction Name'
          />
        </div>

        <div className='mt-5'>
          <p className='text-sm font-semibold mb-2 text-gray-500'>
            Start Price
          </p>
          <input
            type='number'
            step='0.25'
            className='container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'
            placeholder='$0.00'
            name='startPrice'
          />
        </div>

        <div className='mt-5'>
          <p className='text-sm font-semibold mb-2 text-gray-500'>
            Time Window
          </p>
          <div className='flex gap-4'>
            <div className='flex flex-col flex-1'>
              <label className='text-sm font-semibold mb-2 text-gray-500'>
                Days
              </label>
              <input
                type='number'
                min='0'
                max='365'
                placeholder='0'
                className='container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='flex flex-col flex-1'>
              <label className='text-sm font-semibold mb-2 text-gray-500'>
                Hours
              </label>
              <input
                type='number'
                min='0'
                max='23'
                placeholder='0'
                className='container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='flex flex-col flex-1'>
              <label className='text-sm font-semibold mb-2 text-gray-500'>
                Minutes
              </label>
              <input
                type='number'
                min='0'
                max='59'
                placeholder='0'
                className='container mt-0 mb-2 h-14 py-4 box-border px-5 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'
              />
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <button className='btn btn-primary w-full mt-8 rounded-md py-4 button outline outline-2 outline-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 font-semibold'>
            Back
          </button>

          <button
            className='btn btn-primary w-full mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded-md py-4 button ml-5 font-semibold'
            type='submit'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
