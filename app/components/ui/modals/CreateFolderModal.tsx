import React from 'react'

interface CreateFolderModalProps {
    newFolderName: string;
    setNewFolderName: (name: string) => void;
    setShowCreateModal: (value: boolean) => void;
    createFolder: () => void;
}
const CreateFolderModal = ({ newFolderName, setNewFolderName, setShowCreateModal, createFolder }: CreateFolderModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Create New Folder</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Folder Name</label>
                    <input
                        type="text"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder="Enter folder name..."
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                    />
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowCreateModal(false)}
                        className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={createFolder}
                        disabled={!newFolderName.trim()}
                        className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateFolderModal
