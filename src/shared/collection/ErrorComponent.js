const ErrorComponent = ({ message }) => {
    return (
        <div className="flex flex-col h-full w-full items-center justify-center text-2xl">
            <div >
                {message}
            </div>
            <div className="absolute bottom-0 py-2">
                PLURALFORMS
            </div>
        </div>
    )
}
export default ErrorComponent