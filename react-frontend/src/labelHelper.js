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
        case 'todo':
            return 'grey'
        case 'complete':
            return 'green'  
        case 'in progress':
            return 'orange'  
        default:
            return 'grey'
    }
}