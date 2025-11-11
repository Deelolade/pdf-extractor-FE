import React from 'react'

const ChangeFileName = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Change File Name
        </h3>

        <p className="text-sm text-gray-600 mb-3">
          Enter a new name for your document:
        </p>

        <input
          type="text"
        //   value={fileName}
        //   onChange={(e) => setFileName(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter new file name"
        />

        <div className="flex justify-end gap-3">
          <button
            // onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-md bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            // onClick={() => {
            //   onConfirm(fileName.trim());
            //   onClose();
            // }}
            // disabled={!fileName.trim()}
            className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    )
}

export default ChangeFileName
