function format_index(number: number): string {
    return '#' + number.toString().padStart(3, '0');
}

function format_name(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export { format_index, format_name };
