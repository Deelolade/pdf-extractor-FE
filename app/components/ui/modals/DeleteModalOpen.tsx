import React from 'react'

interface DeleteModal {
  setIsDeleteModalOpen: ( isOpen: boolean)=>  void,
  handleDeleteDocument: (id:string)=> void,
  selectedDocumentId : string
}
const DeleteModal = ({selectedDocumentId, setIsDeleteModalOpen, handleDeleteDocument}: DeleteModal) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Confirm Delete
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete this document? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 text-sm font-medium rounded-md bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
                handleDeleteDocument(selectedDocumentId || '');
                setIsDeleteModalOpen(false);
            }}
            className="px-4 py-2 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal;
