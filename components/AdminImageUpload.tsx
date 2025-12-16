import React, { useState } from 'react';
import { Upload, Check, X, AlertCircle } from 'lucide-react';
import { uploadImage, IMAGE_MAPPINGS } from '../services/imageUploadService';

interface ImageStatus {
  fileName: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  url?: string;
  error?: string;
}

const AdminImageUpload: React.FC = () => {
  const [images, setImages] = useState<Record<string, ImageStatus>>(
    Object.keys(IMAGE_MAPPINGS).reduce((acc, fileName) => {
      acc[fileName] = { fileName, status: 'pending' };
      return acc;
    }, {} as Record<string, ImageStatus>)
  );
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (fileName: string, file: File) => {
    const targetPath = IMAGE_MAPPINGS[fileName as keyof typeof IMAGE_MAPPINGS];

    setImages(prev => ({
      ...prev,
      [fileName]: { ...prev[fileName], status: 'uploading' }
    }));

    const result = await uploadImage(file, targetPath);

    if (result.success && result.url) {
      setImages(prev => ({
        ...prev,
        [fileName]: { ...prev[fileName], status: 'success', url: result.url }
      }));
    } else {
      setImages(prev => ({
        ...prev,
        [fileName]: { ...prev[fileName], status: 'error', error: result.error }
      }));
    }
  };

  const getStatusIcon = (status: ImageStatus['status']) => {
    switch (status) {
      case 'success':
        return <Check className="text-green-500" size={20} />;
      case 'error':
        return <X className="text-red-500" size={20} />;
      case 'uploading':
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />;
      default:
        return <AlertCircle className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: ImageStatus['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'uploading':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const groupedImages = Object.entries(images).reduce((acc, [fileName, status]) => {
    let category = 'Other';
    if (fileName.includes('logo')) category = 'Logos';
    else if (fileName.includes('customhome')) category = 'Custom Home';
    else if (fileName.includes('ncadesign')) category = 'NCA Designs';
    else if (fileName.includes('designyourroom')) category = 'Design Your Rooms';
    else if (fileName.includes('ncmcafe') || fileName.includes('ncm_')) category = 'NCM Cafe';

    if (!acc[category]) acc[category] = [];
    acc[category].push({ fileName, ...status });
    return acc;
  }, {} as Record<string, (ImageStatus & { fileName: string })[]>);

  const stats = Object.values(images).reduce((acc, img) => {
    acc[img.status]++;
    return acc;
  }, { pending: 0, uploading: 0, success: 0, error: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Upload className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Image Upload Center</h1>
              <p className="text-slate-600">Upload your images to Supabase Storage</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.pending}</div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
            <div className="bg-blue-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.uploading}</div>
              <div className="text-sm text-blue-500">Uploading</div>
            </div>
            <div className="bg-green-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.success}</div>
              <div className="text-sm text-green-500">Success</div>
            </div>
            <div className="bg-red-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.error}</div>
              <div className="text-sm text-red-500">Errors</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
            <AlertCircle size={20} />
            Instructions
          </h2>
          <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
            <li>Click "Choose File" next to each image name</li>
            <li>Select the corresponding image file from your computer</li>
            <li>The image will automatically upload to Supabase Storage</li>
            <li>Once all images are uploaded successfully, the website will display them properly</li>
          </ol>
        </div>

        {/* Upload Grid by Category */}
        {Object.entries(groupedImages).map(([category, categoryImages]) => (
          <div key={category} className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              {category}
            </h2>
            <div className="space-y-3">
              {categoryImages.map((image) => (
                <div
                  key={image.fileName}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${getStatusColor(image.status)}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    {getStatusIcon(image.status)}
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{image.fileName}</div>
                      {image.error && (
                        <div className="text-sm text-red-600 mt-1">{image.error}</div>
                      )}
                      {image.url && (
                        <div className="text-xs text-green-600 mt-1 truncate max-w-md">
                          {image.url}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <input
                      type="file"
                      id={`file-${image.fileName}`}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(image.fileName, file);
                      }}
                      disabled={image.status === 'uploading'}
                    />
                    <label
                      htmlFor={`file-${image.fileName}`}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer transition-colors ${
                        image.status === 'uploading'
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : image.status === 'success'
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {image.status === 'uploading' ? 'Uploading...' :
                       image.status === 'success' ? 'Replace' : 'Choose File'}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer Note */}
        <div className="bg-slate-100 rounded-xl p-6 text-center">
          <p className="text-slate-600">
            Total: {Object.keys(images).length} images •
            Completed: {stats.success}/{Object.keys(images).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminImageUpload;
