export default function Temperature({
  degreesF,
}: {
  degreesF: string | number
}) {
  return (
    <div className="text-xs">
      Temperature:{" "}
      <span className="text-3xl font-semibold tracking-tighter text-black">
        {degreesF} °F
      </span>
    </div>
  )
}
