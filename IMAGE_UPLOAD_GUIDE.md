# Image Upload Guide for CLAH Ecosystem

Your images are now stored in **Supabase Storage**, which provides reliable, permanent storage for your website images.

## Quick Start

### 1. Access the Admin Upload Page

To upload your images, you need to navigate to the admin page. You can do this by:

**Option A: Direct URL Access**
- Simply add `?view=admin` to your website URL
- Example: `https://your-website.com/?view=admin`

**Option B: Manual Navigation in Browser Console**
- Open your website in a browser
- Press F12 to open Developer Console
- Type in the console: `window.location.hash = '#admin'` (if using hash routing)
- Or modify the App component to add a temporary button

**Option C: Temporary Admin Button (Recommended for initial setup)**
Add this temporary code to your Navbar component:
```tsx
<button onClick={() => onNavigate('admin')}>Admin Upload</button>
```

### 2. Upload Your Images

Once on the admin page, you'll see a list of all images that need to be uploaded, organized by category:

- **Logos**: Company and brand logos
- **Custom Home**: Construction and home building images
- **NCA Designs**: Interior design and architecture images
- **Design Your Rooms**: Furniture and custom decor images
- **NCM Cafe**: Cafe and coworking space images

For each image:
1. Click "Choose File"
2. Select the corresponding image from your computer
3. The image will automatically upload to Supabase Storage
4. Status will change from "Pending" to "Success" with a green checkmark

### 3. Monitor Upload Progress

The admin panel shows real-time statistics:
- **Pending**: Images waiting to be uploaded
- **Uploading**: Images currently being uploaded
- **Success**: Successfully uploaded images
- **Errors**: Any failed uploads (with error messages)

## Image Requirements

- **Supported formats**: JPG, JPEG, PNG, GIF, WebP, TIFF
- **Maximum file size**: 10MB per image
- **Naming**: Use the exact filenames shown in the admin panel

## Image List

### Logos (5 images)
- `clah.png` - Main CLAH logo
- `customhomelogo.png` - Custom Home logo
- `ncadesignslogo.png` - NCA Designs logo
- `designyourrooms.png` - Design Your Rooms logo
- `ncmcafelogo.png` - NCM Cafe logo

### Custom Home (6 images)
- `customhome.jpg` - Main featured image
- `customhome1.jpg` through `customhome5.jpg` - Gallery images

### NCA Designs (8 images)
- `ncadesigns.jpg` - Main featured image
- `ncadesigns1.jpg` through `ncadesigns7.jpg` - Gallery images
- Note: Accepts both .jpg and .png formats

### Design Your Rooms (6 images)
- `designyourroom.jpg` - Main featured image
- `designyourroom1.jpg` through `designyourroom5.jpg` - Gallery images

### NCM Cafe (7 images)
- `ncmcafe.jpeg` - Main featured image
- `ncmcafe1.jpeg` through `ncmcafe5.jpg` - Gallery images
- `ncm_4.jpg` - Additional cafe image

**Total: 32 images**

## Technical Details

### Storage Structure

Images are organized in Supabase Storage with the following structure:
```
clah-images/
├── logos/
│   ├── clah.png
│   ├── customhome.png
│   └── ...
└── services/
    ├── customhome/
    │   ├── main.jpg
    │   ├── 1.jpg
    │   └── ...
    ├── ncadesigns/
    ├── designyourrooms/
    └── ncmcafe/
```

### Public URLs

After uploading, images are accessible via public URLs:
```
https://[your-project].supabase.co/storage/v1/object/public/clah-images/[path]
```

### Fallback Images

If an image fails to load, the system automatically uses a fallback image from Unsplash to ensure your website never shows broken images.

## Troubleshooting

### "Invalid file type" error
- Make sure you're uploading an image file (JPG, PNG, etc.)
- Check that the file extension matches what's expected

### "File size exceeds limit" error
- Compress your image to be under 10MB
- Use tools like TinyPNG or ImageOptim to reduce file size

### Image not displaying after upload
- Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
- Check the browser console for any errors
- Verify the image uploaded successfully (green checkmark)

### Upload stuck at "Uploading..."
- Check your internet connection
- Try uploading the image again
- Clear browser cache and retry

## Security

- Image uploads require authentication (you may need to implement auth)
- All images are publicly readable once uploaded
- Images are cached for optimal performance
- Storage bucket has a 10MB file size limit

## Next Steps

After uploading all images:
1. Verify all images display correctly on your website
2. Test the website on different devices and browsers
3. Consider removing the admin route from production or protecting it with authentication
4. Set up regular backups of your Supabase Storage

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Supabase Storage bucket is properly configured
3. Ensure the storage policies allow public read access
4. Check that your .env file has the correct Supabase credentials
