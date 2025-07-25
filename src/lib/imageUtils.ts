// Image utility functions for robust loading
export const tryLoadImage = (basePath: string, extensions: string[] = ['png', 'jpg', 'jpeg', 'svg']): Promise<string> => {
  return new Promise((resolve) => {
    let currentIndex = 0
    
    const tryNext = () => {
      if (currentIndex >= extensions.length) {
        // All extensions failed, return SVG fallback
        resolve('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiM0NzQ3NTEiLz48dGV4dCB4PSI2MCIgeT0iNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNkMWQ1ZGIiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=')
        return
      }
      
      const ext = extensions[currentIndex]
      const urlWithExt = basePath.replace(/\.[^.]+$/, `.${ext}`)
      
      const img = new Image()
      img.onload = () => resolve(urlWithExt)
      img.onerror = () => {
        currentIndex++
        tryNext()
      }
      img.src = urlWithExt
    }
    
    tryNext()
  })
}

export const getImageSrc = (originalUrl: string): string => {
  // Extract base path without extension
  const basePath = originalUrl.replace(/\.[^.]+$/, '')
  return originalUrl // Return original first, fallback will be handled by onError
}
