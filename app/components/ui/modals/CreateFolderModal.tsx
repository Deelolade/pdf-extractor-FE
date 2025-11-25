import React from 'react'

interface CreateFolderModalProps {
    newFolderName: string;
    setNewFolderName: (name: string) => void;
    colors: { name: string; class: string }[];
    setShowCreateModal: (value: boolean) => void;
    setSelectedColor: (name: string) => void;
    selectedColor: string;
    createFolder: () => void;
}
const CreateFolderModal = ({ newFolderName, setNewFolderName, colors, setShowCreateModal, setSelectedColor, selectedColor, createFolder }: CreateFolderModalProps) => {
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

                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Choose Color</label>
                    <div className="flex gap-2">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => setSelectedColor(color.name)}
                                className={`w-10 h-10 rounded-lg ${color.class} ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-slate-800' : ''
                                    }`}
                            />
                        ))}
                    </div>
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
