const ICONS = {
    arrowAngledDown: "M8 21.5H37.5V46.5934L49.7596 34.7052L53.2404 38.2948L34.973 56.0085L17.2322 38.2678L20.7678 34.7322L32.5 46.4645V26.5H8V21.5Z",
    darkMode: "M54.0002 42.5059C52.5665 42.7652 51.0864 42.9009 49.5729 42.9009C36.6213 42.9009 26.1221 32.9628 26.1221 20.7034C26.1221 16.8224 27.1743 13.1741 29.0235 10C18.1887 11.9595 10 20.9758 10 31.8024C10 44.0618 20.4993 53.9999 33.4508 53.9999C42.3022 53.9999 50.0082 49.3581 54.0002 42.5059Z",
};

function Icon({ name, size, color }) {
    return ( 
    <svg 
        width={size}
        height={size}
        viewBox='0 0 64 64'
        fill-rule="evenodd" 
        clip-rule="evenodd" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path 
            d={ICONS[name]} 
            fill={color}
        />
    </svg>

     );
}

export default Icon;