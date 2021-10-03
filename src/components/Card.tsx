const classNames = (...args: string[]) => args.filter(Boolean).join(" ")

export default function Card({
  children,
  heading,
}: {
  children?: React.ReactNode
  heading: string
}) {
  const useSmallFont = heading.length >= 10 // "MEMPHIS" vs "PUERTO MORELOS"
  return (
    <div className="flex flex-col items-center justify-center w-48 p-4 mx-auto text-gray-400 bg-white rounded-lg shadow-md drop-shadow-md">
      <h2
        className={classNames(
          useSmallFont ? "text-base" : "text-2xl",
          "font-bold text-gray-600 uppercase"
        )}
      >
        {heading}
      </h2>
      {children && children}
    </div>
  )
}
