const alpineTemplate = ({onclick,myRef}) => {
  return (
    <div>
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="my-modal"
      ></div>
      <div 
        className="fixed text-gray-600 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0">
        <div
          className="text-center bg-white rounded-xl shadow-2xl p-6 sm:w-8/12 mx-10">

          <span className="font-bold block text-xl mb-3">Test</span>
          <div ref={myRef}/>
          <div className="text-right space-x-5 mt-5">
            <button onClick={onclick} className="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo">Schließen</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default alpineTemplate;