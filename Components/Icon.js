const ICONS = {
    arrowAngledDown: "M8 21.5H37.5V46.5934L49.7596 34.7052L53.2404 38.2948L34.973 56.0085L17.2322 38.2678L20.7678 34.7322L32.5 46.4645V26.5H8V21.5Z",
    darkMode: "M24.0001 17.7306C23.2181 17.872 22.4109 17.946 21.5854 17.946C14.5209 17.946 8.79407 12.5252 8.79407 5.83827C8.79407 3.72135 9.36802 1.73132 10.3767 0C4.46669 1.06872 0 5.98676 0 11.8923C0 18.5792 5.72688 24 12.7913 24C17.6194 24 21.8226 21.4681 24.0001 17.7306Z",
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