import React, { useEffect } from 'react'

const DemoVideo = () => {
  useEffect(() => {
    window.location.replace('https://drive.google.com/file/d/1eEUTntA78fd-GpdE7eXzkkaP5j5AA1x2/view')
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-2">Redirecting to Demo Video...</h1>
      <p className="text-gray-600">If you are not redirected, <a className="text-primary-600 underline" href="https://drive.google.com/file/d/1eEUTntA78fd-GpdE7eXzkkaP5j5AA1x2/view" target="_blank" rel="noreferrer">click here</a>.</p>
    </div>
  )
}

export default DemoVideo


