export const getLabelColor = (category) => {
    switch (category) {
        case 'fitness':
            return 'teal'
        case 'errand':
            return 'yellow'
        case 'recreation':
            return 'orange'
        case 'work':
            return 'red'
        case 'learning':
            return 'olive'
        case 'social':
            return 'pink'
        default:
            return 'grey'
    }
}