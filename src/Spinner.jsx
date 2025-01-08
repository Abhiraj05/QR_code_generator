function Spinner() {
    return (
      <>
        <div id="spinner">
          <div className="fixed inset-0  bg-gray-700 bg-opacity-80 flex justify-center items-center">
            <div className="h-16 w-16 border-4 border-gray-300 border-t-blue-400 rounded-full animate-spin"></div>
          </div>
        </div>
      </>
    );
  }
  
  export default Spinner