export function randomColor() {
    let chars = '0123456789ABCDEF'.split('');
    let result = [];

    for (let i = 0; i < 6; i++) {
        result[ i ] = chars[ 0 | Math.random() * chars.length ];
    }

    return '#' + result.join('');
}