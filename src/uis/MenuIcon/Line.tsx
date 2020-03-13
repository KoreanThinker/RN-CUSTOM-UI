import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg width={20} height={2} fill='#000' viewBox="0 0 20 2" {...props}>
            <Path fill="none" stroke="#000" d="M0 0h200v1H0z" />
        </Svg>
    )
}

export default SvgComponent
