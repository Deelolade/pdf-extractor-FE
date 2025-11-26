import React from 'react'
import { Document } from '../../FolderList';
import { Check, FileText } from 'lucide-react';
import { UploadedDocument } from '@/app/types/document';

type selectedFolder = {
    _id: string,
    name:string,

}

interface CreateFolderModalProps {
    selectedFolder: selectedFolder | null;
    availableDocuments: UploadedDocument[];
    toggleDocSelection: (docId: number) => void;
    selectedDocs: number[];
    setShowAddDocModal: (value: boolean) => void;
    addDocumentsToFolder: () => void;
}

const AddDocumentModal = ({selectedFolder,availableDocuments, toggleDocSelection, selectedDocs, setShowAddDocModal, addDocumentsToFolder}:CreateFolderModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              {`Add Documents to "${selectedFolder?.name}"`}
            </h2>
            <div className="space-y-2 mb-6">
              {availableDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleDocSelection(doc._id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedDocs.includes(doc._id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <FileText className="w-5 h-5 text-slate-400" />
                      <div>
                        <h4 className="font-medium text-slate-800">{doc.fileName}</h4>
                        <p className="text-sm text-slate-500">{doc.wordCount.toLocaleString()} words</p>
                      </div>
                    </div>
                    {selectedDocs.includes(doc._id) && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddDocModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addDocumentsToFolder}
                disabled={selectedDocs.length === 0}
                className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                Add {selectedDocs.length} Document{selectedDocs.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
  )
}

export default AddDocumentModal
