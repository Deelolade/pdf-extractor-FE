'use client'
import React, { useState } from 'react';
import { Folder, FolderOpen, Plus, Search, MoreVertical, Trash2, FileText, X, Check, Calendar, FilePlus } from 'lucide-react';
import CreateFolderModal from './ui/modals/CreateFolderModal';
import AddDocumentModal from './ui/modals/AddDocumentModal';
import { useCreateFolder, useDeleteFolder, useFetchUserFolders } from '../hooks/useFolders';

export interface Document {
  id: number;
  name: string;
  wordCount: number;
}

export interface FolderType {
  _id: string;
  name: string;
  // documentIds: number[];
  updatedAt: string;
  color: string;
  documents: Document[];
}

interface ColorOption {
  name: string;
  class: string;
}

const FoldersPage: React.FC = () => {
  // const [folders, setFolders] = useState<FolderType[]>([
  //   {
  //     id: 1,
  //     name: "Academic Papers",
  //     documentIds: [],
  //     updatedAt: "2025-10-15",
  //     color: "blue",
  //     documents: [
  //       { id: 1, name: "Differences of Opinion Amongst the Scholars", wordCount: 10862 },
  //       { id: 2, name: "Research Methodology", wordCount: 8543 }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: "Project Documentation",
  //     documentIds: [],
  //     updatedAt: "2025-10-15",
  //     color: "green",
  //     documents: [
  //       { id: 3, name: "Project Python", wordCount: 25 },
  //       { id: 4, name: "API Documentation", wordCount: 3421 }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     name: "Personal",
  //     documentIds: [],
  //     updatedAt: "2025-10-15",
  //     color: "purple",
  //     documents: [
  //       { id: 5, name: "Resume0", wordCount: 416 }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     name: "Travel & Tourism",
  //     documentIds: [],
  //     updatedAt: "2025-10-15",
  //     color: "orange",
  //     documents: [
  //       { id: 6, name: "VoyagePro", wordCount: 746 }
  //     ]
  //   }
  // ]);

  const [availableDocuments] = useState<Document[]>([
    { id: 7, name: "Marketing Strategy 2024", wordCount: 5421 },
    // { id: 8, name: "Financial Report Q3", wordCount: 6789 },
    // { id: 9, name: "Team Meeting Notes", wordCount: 1234 },
    // { id: 10, name: "Product Roadmap", wordCount: 3456 }
  ]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showAddDocModal, setShowAddDocModal] = useState<boolean>(false);
  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);
  const [expandedFolder, setExpandedFolder] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("blue");
  const [selectedDocs, setSelectedDocs] = useState<number[]>([]);
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const createNewFolder = useCreateFolder()
  const deleteOldFolder = useDeleteFolder()
  const colors: ColorOption[] = [
    { name: "blue", class: "bg-blue-500" },
    { name: "green", class: "bg-green-500" },
    { name: "purple", class: "bg-purple-500" },
    { name: "orange", class: "bg-orange-500" },
    { name: "pink", class: "bg-pink-500" },
    { name: "red", class: "bg-red-500" }
  ];

  const createFolder = (): void => {
    createNewFolder.mutate(newFolderName)
    
    if (newFolderName.trim()) {
      // const newFolder: FolderType = {
      //   id: Date.now(),
      //   name: newFolderName,
      //   color: selectedColor,
      //   documents: []
      // };
      // setFolders([...folders, newFolder]);
      setNewFolderName("");
      setShowCreateModal(false);
    }
  };

  const deleteFolder = (folderId: string): void => {
    deleteOldFolder.mutate(folderId)
    
  };

  const toggleExpandFolder = (folderId: string): void => {
    setExpandedFolder(expandedFolder === folderId ? null : folderId);
  };

  const openAddDocModal = (folder: FolderType): void => {
    setSelectedFolder(folder);
    setSelectedDocs([]);
    setShowAddDocModal(true);
  };

  const toggleDocSelection = (docId: number): void => {
    setSelectedDocs(prev =>
      prev.includes(docId)
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const addDocumentsToFolder = (): void => {
    // if (selectedFolder && selectedDocs.length > 0) {
    //   const docsToAdd = availableDocuments.filter(doc => selectedDocs.includes(doc.id));
    //   setFolders(folders.map(folder =>
    //     folder.id === selectedFolder.id
    //       ? {
    //           ...folder,
    //           documents: [...folder.documents, ...docsToAdd],
    //         }
    //       : folder
    //   ));
    //   setShowAddDocModal(false);
    //   setSelectedDocs([]);
    // }
  };

  // const removeDocFromFolder = (folderId: number, docId: number): void => {
  //   setFolders(folders.map(folder =>
  //     folder.id === folderId
  //       ? {
  //           ...folder,
  //           documents: folder.documents.filter(doc => doc.id !== docId),
  //           documentCount: folder.documentIds.length - 1
  //         }
  //       : folder``
  //   ));
  // };

  const { data: userFolders = [] } = useFetchUserFolders();
  const filteredFolders = userFolders?.filter(folder =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  )  ?? [];
  
  console.log(filteredFolders)

  return (
    <div className="flex-1 min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Folders</h1>
            <p className="text-slate-600">Organize your documents into folders</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Create Folder
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Folders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFolders.map((folder: FolderType, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all"
            >
              {/* Folder Header */}
              <div className={`bg-green-400 p-4`}>
                <div className="flex items-start justify-between mb-2">
                  <div
                    className="cursor-pointer flex-1"
                    onClick={() => toggleExpandFolder(folder._id)}
                  >
                    {expandedFolder === folder._id ? (
                      <FolderOpen className="w-8 h-8 text-white" />
                    ) : (
                      <Folder className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setEditingFolder(editingFolder === folder._id ? null : folder._id)}
                      className="text-white hover:bg-white hover:text-black hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    
                    {editingFolder === folder._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-10">
                        <button
                          onClick={() => {
                            openAddDocModal(folder);
                            setEditingFolder(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <FilePlus className="w-4 h-4" />
                          Add Documents
                        </button>
                        <button
                          onClick={() => {
                            deleteFolder(folder._id);
                            setEditingFolder(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Folder
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{folder.name}</h3>
                <p className="text-white text-opacity-90 text-sm">
                  {folder.documents.length} document{folder.documents.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Folder Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>Created {new Date(folder.updatedAt).toDateString()}</span>
                </div>

                {/* Expanded View - Show Documents */}
                {expandedFolder === folder._id && (
                  <div className="mt-4 space-y-2">
                    {folder.documents.length > 0 ? (
                      folder.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="text-sm text-slate-700 truncate">{doc.name}</span>
                          </div>
                          <button
                            // onClick={() => removeDocFromFolder(folder.id, doc.id)}
                            className="text-red-500 hover:text-red-600 ml-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400 text-center py-4">No documents yet</p>
                    )}
                    
                    <button
                      onClick={() => openAddDocModal(folder)}
                      className="w-full mt-2 py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
                    >
                      + Add Documents
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFolders.length === 0 && (
          <div className="text-center py-16">
            <Folder className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No folders found</h3>
            <p className="text-slate-500">Create a folder to organize your documents</p>
          </div>
        )}
      </div>

      {/* Create Folder Modal */}
      {showCreateModal && (
        <CreateFolderModal 
        colors={colors}
        newFolderName={newFolderName}
        selectedColor={selectedColor}
         setNewFolderName={setNewFolderName}
         setShowCreateModal={setShowCreateModal}
         setSelectedColor={setSelectedColor}
         createFolder={createFolder}
         />
      )}

      {/* Add Documents Modal */}
      {showAddDocModal && (
        <AddDocumentModal
        selectedFolder={selectedFolder}
        availableDocuments={availableDocuments}
        toggleDocSelection={toggleDocSelection}
        selectedDocs={selectedDocs}
        addDocumentsToFolder={addDocumentsToFolder}
        setShowAddDocModal={setShowAddDocModal}
        />
      )}
    </div>
  );
};

export default FoldersPage;