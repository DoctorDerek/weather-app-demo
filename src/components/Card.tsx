export default function Card({
  children,
  heading,
}: {
  children: React.ReactNode
  heading: string
}) {
  return (
    <div className="flex flex-col items-center justify-center w-64 p-4 mx-auto text-gray-400 bg-white rounded-lg shadow-md drop-shadow-md">
      <h2 className="font-bold text-gray-600 uppercase">{heading}</h2>
      {children}
    </div>
  )
}
