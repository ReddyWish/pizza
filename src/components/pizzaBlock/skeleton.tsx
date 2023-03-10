import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="125" cy="115" r="113" />
    <rect x="0" y="259" rx="0" ry="0" width="213" height="0" />
    <rect x="4" y="255" rx="10" ry="10" width="262" height="32" />
    <rect x="5" y="300" rx="11" ry="11" width="265" height="90" />
    <rect x="8" y="405" rx="10" ry="10" width="103" height="44" />
    <rect x="128" y="405" rx="10" ry="10" width="141" height="46" />
  </ContentLoader>
)

export default Skeleton