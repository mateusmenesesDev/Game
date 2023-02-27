const BugReportPage = () => {
  return (
    <form
      action='https://formspree.io/f/xgebyvlk'
      method='POST'
      className='max-w-3xl text-base-content bg-base-300 p-6 rounded-lg shadow-md flex flex-col w-5/6 m-auto'
    >
      <h1 className='text-2xl font-medium mb-4'>Bug Report</h1>
      <label className='block mb-4' htmlFor='bugDescription'>
        <span className='font-medium'>Bug description:</span>
        <textarea
          name='bugDescription'
          className='textarea mt-1 block w-full'
          id='bugDescription'
        />
      </label>
      <label className='block mb-4' htmlFor='bugSeverity'>
        <span className=' font-medium'>Severity:</span>
        <select
          className='select mt-1 block w-full'
          name='bugSeverity'
          id='bugSeverity'
        >
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </select>
      </label>
      <button
        className='bg-primary text-white py-2 px-4 rounded hover:bg-primary-focus'
        type='submit'
      >
        Send Report
      </button>
    </form>
  );
};

export default BugReportPage;
