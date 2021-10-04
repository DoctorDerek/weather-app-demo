const classNames = (...args: string[]) => args.filter(Boolean).join(" ")

export default function Card({
  children,
  heading,
}: {
  children?: React.ReactNode
  heading: string
}) {
  const useSmallFont = heading.length >= 12
  // large font: "MEMPHIS" and "LOS ANGELES"; small font: "PUERTO MORELOS"
  return (
    <div className="flex flex-col items-center justify-center">
      {/* take advantage of flex-shrink to generate auto-width <Card> */}
      <div className="flex flex-col items-center justify-center p-3 mt-4 text-gray-400 bg-white rounded-lg shadow-md dark:text-gray-300 dark:bg-black sm:mt-10 drop-shadow-md">
        <h2
          className={classNames(
            useSmallFont ? "text-base" : "text-xl",
            "font-bold text-gray-600 uppercase dark:text-white"
          )}
        >
          {heading}
        </h2>
        {children && children}
      </div>
    </div>
  )
}
