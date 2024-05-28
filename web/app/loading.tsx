import React from 'react'

const Loading = () => {
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-800">
            <div className="mx-auto max-w-md text-center">
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <div className="flex items-center space-x-4">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-900 border-t-transparent dark:border-gray-50" />
                        <p className="text-gray-900 dark:text-gray-50">Loading...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading